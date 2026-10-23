"use client";

import { useEffect, useMemo, useState } from "react";
import type { Sale } from "@/lib/types";
import { addDays, todayISO } from "@/lib/dates";
import { formatCOP, uid } from "@/lib/format";
import { inRange, resolveRange, saleTotal, type Range, type RangeId } from "@/lib/stats";
import { downloadCSV, salesToCSV } from "@/lib/csv";
import { demoSales } from "@/lib/demo";
import { ui } from "@/lib/ui";
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
      [s.product, s.customer, s.note, s.payment].some((v) =>
        v.toLowerCase().includes(q)
      )
    );
  }, [inPeriod, query]);

  if (sales === null) {
    return (
      <div className={ui.panel}>
        <p className={ui.muted}>Cargando…</p>
      </div>
    );
  }

  const periodTotal = visible.reduce((acc, s) => acc + saleTotal(s), 0);

  const saveSale = (data: Omit<Sale, "id" | "createdAt">, id?: string) => {
    if (id) {
      setSales((list) =>
        (list ?? []).map((s) => (s.id === id ? { ...s, ...data } : s))
      );
      setEditing(null);
      setMessage("Venta actualizada.");
    } else {
      setSales((list) => [
        { ...data, id: uid(), createdAt: Date.now() },
        ...(list ?? []),
      ]);
      setMessage("Venta registrada.");
    }

    // Si la venta cae fuera del periodo visible, se amplía el filtro para que el usuario la vea.
    if (rangeId !== "all" && rangeId !== "custom") {
      if (data.date < resolved.range.from || data.date > resolved.range.to) {
        setRangeId("all");
      }
    }
  };

  const removeSale = (s: Sale) => {
    if (
      !window.confirm(
        `¿Borrar la venta de "${s.product}" por ${formatCOP(saleTotal(s))}?`
      )
    ) {
      return;
    }

    setSales((list) => (list ?? []).filter((x) => x.id !== s.id));
    if (editing?.id === s.id) setEditing(null);
  };

  const exportCSV = () => {
    downloadCSV(
      `ventas-${resolved.range.from}_a_${resolved.range.to}.csv`,
      salesToCSV(visible)
    );
  };

  const clearAll = () => {
    if (
      !window.confirm(
        "¿Borrar TODAS las ventas registradas? Esta acción no se puede deshacer."
      )
    ) {
      return;
    }

    setSales([]);
    setEditing(null);
  };

  const startEdit = (s: Sale) => {
    setEditing(s);
    setTab("ventas");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={ui.stack}>
      {/* Filtros de periodo */}
      <div className={`${ui.panel} grid gap-3`}>
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Periodo">
          {RANGES.map((r) => (
            <button
              key={r.id}
              type="button"
              aria-pressed={rangeId === r.id}
              className={
                rangeId === r.id
                  ? ui.btnPrimary
                  : ui.btn
              }
              onClick={() => setRangeId(r.id)}
            >
              {r.label}
            </button>
          ))}
        </div>

        {rangeId === "custom" ? (
          <div className="grid grid-cols-1 items-center gap-3 sm:grid-cols-[1fr_auto_1fr]">
            <label className={ui.label}>
              Desde
              <input
                type="date"
                aria-label="Desde"
                className={ui.input}
                value={custom.from}
                onChange={(e) =>
                  setCustom((c) => ({ ...c, from: e.target.value }))
                }
              />
            </label>

            <span className={`${ui.muted} text-sm sm:pt-5`}>a</span>

            <label className={ui.label}>
              Hasta
              <input
                type="date"
                aria-label="Hasta"
                className={ui.input}
                value={custom.to}
                onChange={(e) =>
                  setCustom((c) => ({ ...c, to: e.target.value }))
                }
              />
            </label>
          </div>
        ) : null}
      </div>

      {/* Pestañas */}
      <div className="flex gap-2 border-b border-border" role="tablist" aria-label="Secciones">
        <button
          type="button"
          role="tab"
          aria-selected={tab === "ventas"}
          className={`border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${
            tab === "ventas"
              ? "border-primary text-text-primary"
              : "border-transparent text-text-muted hover:text-foreground"
          }`}
          onClick={() => setTab("ventas")}
        >
          Ventas
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={tab === "stats"}
          className={`border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${
            tab === "stats"
              ? "border-primary text-text-primary"
              : "border-transparent text-text-muted hover:text-foreground"
          }`}
          onClick={() => setTab("stats")}
        >
          Estadísticas
        </button>
      </div>

      {tab === "ventas" ? (
        <div className="grid items-start gap-4 lg:grid-cols-[minmax(280px,0.8fr)_minmax(0,1.7fr)]">
          {/* Formulario */}
          <aside className="grid min-w-0 gap-4">
            <SaleForm
              key={editing?.id ?? "nueva"}
              editing={editing}
              sales={sales}
              onSave={saveSale}
              onCancel={() => setEditing(null)}
            />

            {message ? (
              <p className={ui.toast} role="status" aria-live="polite">
                {message}
              </p>
            ) : null}
          </aside>

          {/* Tabla de ventas */}
          <section className={`${ui.panel} min-w-0`}>
            <div className={`${ui.panelHead} items-start`}>
              <div>
                <h2 className={ui.title}>Ventas del periodo</h2>
                <p className="mt-1 text-sm text-text-muted">
                  {visible.length}{" "}
                  {visible.length === 1 ? "venta" : "ventas"} ·{" "}
                  <strong className="font-bold text-foreground">
                    {formatCOP(periodTotal)}
                  </strong>
                </p>
              </div>

              <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
                <input
                  type="search"
                  className={`${ui.input} min-w-0 sm:w-56`}
                  placeholder="Buscar producto, cliente…"
                  aria-label="Buscar ventas"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />

                <button
                  type="button"
                  className={ui.btn}
                  onClick={exportCSV}
                  disabled={visible.length === 0}
                >
                  Exportar CSV
                </button>
              </div>
            </div>

            {sales.length === 0 ? (
              <div className="grid justify-items-center gap-3 py-8 text-center">
                <span className="text-3xl" aria-hidden="true">
                  🧾
                </span>

                <p className={`${ui.muted} max-w-md text-sm`}>
                  Aún no has registrado ventas. Usa el formulario o carga datos
                  de ejemplo para explorar la app.
                </p>

                <button
                  type="button"
                  className={ui.btn}
                  onClick={() => setSales(demoSales())}
                >
                  Cargar datos de ejemplo
                </button>
              </div>
            ) : (
              <SalesTable
                sales={visible}
                onEdit={startEdit}
                onDelete={removeSale}
              />
            )}

            {sales.length > 0 ? (
              <p className={`${ui.hint} mt-4 border-t border-border pt-3`}>
                Las ventas se guardan solo en este navegador.{" "}
                <button
                  type="button"
                  className={ui.linkDanger}
                  onClick={clearAll}
                >
                  Borrar todo
                </button>
              </p>
            ) : null}
          </section>
        </div>
      ) : (
        <Stats
          sales={sales}
          current={inPeriod}
          range={resolved.range}
          prev={resolved.prev}
        />
      )}
    </div>
  );
}
