"use client";

import { useEffect, useMemo, useState } from "react";
import type { Sale } from "@/lib/types";
import { addDays, todayISO } from "@/lib/dates";
import { formatCOP, uid } from "@/lib/format";
import { inRange, resolveRange, saleTotal, type Range, type RangeId } from "@/lib/stats";
import { downloadCSV, salesToCSV } from "@/lib/csv";
import { demoSales } from "@/lib/demo";
import SaleForm from "./SaleForm";
import SalesTable from "./SalesTable";
import Stats from "./Stats";

const KEY = "ventas:registros";

const RANGES: { id: RangeId; label: string }[] = [
  { id: "today", label: "Hoy" },
  { id: "7d", label: "7 días" },
  { id: "30d", label: "30 días" },
  { id: "month", label: "Este mes" },
  { id: "all", label: "Todo" },
  { id: "custom", label: "Rango" },
];

function load(): Sale[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Sale[]) : [];
  } catch {
    return [];
  }
}

export default function SalesApp() {
  const [sales, setSales] = useState<Sale[] | null>(null);
  const [tab, setTab] = useState<"ventas" | "stats">("ventas");
  const [rangeId, setRangeId] = useState<RangeId>("7d");
  const [custom, setCustom] = useState<Range>({ from: "", to: "" });
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<Sale | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const today = todayISO();
    setCustom({ from: addDays(today, -29), to: today });
    setSales(load());
  }, []);

  useEffect(() => {
    if (sales === null) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(sales));
    } catch {
      /* almacenamiento lleno o bloqueado: se ignora */
    }
  }, [sales]);

  useEffect(() => {
    if (!message) return;
    const t = setTimeout(() => setMessage(""), 2500);
    return () => clearTimeout(t);
  }, [message]);

  const resolved = useMemo(
    () => resolveRange(rangeId, sales ?? [], custom),
    [rangeId, sales, custom]
  );

  const inPeriod = useMemo(
    () => (sales ? inRange(sales, resolved.range) : []),
    [sales, resolved]
  );

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return inPeriod;
    return inPeriod.filter((s) =>
      [s.product, s.customer, s.note, s.payment].some((v) => v.toLowerCase().includes(q))
    );
  }, [inPeriod, query]);

  if (sales === null) return <p className="muted">Cargando…</p>;

  const periodTotal = visible.reduce((acc, s) => acc + saleTotal(s), 0);

  const saveSale = (data: Omit<Sale, "id" | "createdAt">, id?: string) => {
    if (id) {
      setSales((list) => (list ?? []).map((s) => (s.id === id ? { ...s, ...data } : s)));
      setEditing(null);
      setMessage("Venta actualizada.");
    } else {
      setSales((list) => [{ ...data, id: uid(), createdAt: Date.now() }, ...(list ?? [])]);
      setMessage("Venta registrada.");
    }
    // Si la venta cae fuera del periodo visible, se amplía el filtro para que el usuario la vea
    if (rangeId !== "all" && rangeId !== "custom") {
      if (data.date < resolved.range.from || data.date > resolved.range.to) setRangeId("all");
    }
  };

  const removeSale = (s: Sale) => {
    if (!window.confirm(`¿Borrar la venta de "${s.product}" por ${formatCOP(saleTotal(s))}?`)) return;
    setSales((list) => (list ?? []).filter((x) => x.id !== s.id));
    if (editing?.id === s.id) setEditing(null);
  };

  const exportCSV = () => {
    downloadCSV(`ventas-${resolved.range.from}_a_${resolved.range.to}.csv`, salesToCSV(visible));
  };

  const clearAll = () => {
    if (!window.confirm("¿Borrar TODAS las ventas registradas? Esta acción no se puede deshacer.")) return;
    setSales([]);
    setEditing(null);
  };

  const startEdit = (s: Sale) => {
    setEditing(s);
    setTab("ventas");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="toolbar">
        <div className="pills" role="group" aria-label="Periodo">
          {RANGES.map((r) => (
            <button
              key={r.id}
              type="button"
              className={rangeId === r.id ? "pill active" : "pill"}
              onClick={() => setRangeId(r.id)}
            >
              {r.label}
            </button>
          ))}
        </div>
        {rangeId === "custom" ? (
          <div className="custom-range">
            <input
              type="date"
              aria-label="Desde"
              value={custom.from}
              onChange={(e) => setCustom((c) => ({ ...c, from: e.target.value }))}
            />
            <span className="muted">a</span>
            <input
              type="date"
              aria-label="Hasta"
              value={custom.to}
              onChange={(e) => setCustom((c) => ({ ...c, to: e.target.value }))}
            />
          </div>
        ) : null}
      </div>

      <div className="tabs" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={tab === "ventas"}
          className={tab === "ventas" ? "active" : ""}
          onClick={() => setTab("ventas")}
        >
          Ventas
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === "stats"}
          className={tab === "stats" ? "active" : ""}
          onClick={() => setTab("stats")}
        >
          Estadísticas
        </button>
      </div>

      {tab === "ventas" ? (
        <div className="layout-form">
          <aside className="side">
            <SaleForm
              key={editing?.id ?? "nueva"}
              editing={editing}
              sales={sales}
              onSave={saveSale}
              onCancel={() => setEditing(null)}
            />
            {message ? <p className="toast">{message}</p> : null}
          </aside>

          <section className="panel">
            <div className="panel-head wrap">
              <div>
                <h2>Ventas del periodo</h2>
                <p className="hint" style={{ margin: 0 }}>
                  {visible.length} {visible.length === 1 ? "venta" : "ventas"} · <strong>{formatCOP(periodTotal)}</strong>
                </p>
              </div>
              <div className="head-actions">
                <input
                  type="search"
                  className="search"
                  placeholder="Buscar producto, cliente…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button type="button" className="btn" onClick={exportCSV} disabled={visible.length === 0}>
                  Exportar CSV
                </button>
              </div>
            </div>

            {sales.length === 0 ? (
              <div className="empty">
                <p className="muted">Aún no has registrado ventas. Usa el formulario o carga datos de ejemplo para explorar la app.</p>
                <button type="button" className="btn" onClick={() => setSales(demoSales())}>
                  Cargar datos de ejemplo
                </button>
              </div>
            ) : (
              <SalesTable sales={visible} onEdit={startEdit} onDelete={removeSale} />
            )}

            {sales.length > 0 ? (
              <p className="hint foot">
                Las ventas se guardan solo en este navegador.{" "}
                <button type="button" className="link danger" onClick={clearAll}>
                  Borrar todo
                </button>
              </p>
            ) : null}
          </section>
        </div>
      ) : (
        <Stats sales={sales} current={inPeriod} range={resolved.range} prev={resolved.prev} />
      )}
    </>
  );
}
