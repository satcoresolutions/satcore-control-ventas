"use client";

import { useMemo } from "react";
import type { Sale } from "@/lib/types";
import { fmtLong } from "@/lib/dates";
import { formatCOP, formatNumber, formatPct } from "@/lib/format";
import {
  buckets,
  byPayment,
  byWeekday,
  inRange,
  pctChange,
  summarize,
  topProducts,
  type Range,
} from "@/lib/stats";

interface Props {
  sales: Sale[]; // todas las ventas
  current: Sale[]; // ventas del periodo elegido
  range: Range;
  prev: Range | null;
}

function HBars({ rows }: { rows: { label: string; value: number; hint?: string }[] }) {
  const max = Math.max(...rows.map((r) => r.value), 0);
  return (
    <ul className="hbars">
      {rows.map((r) => (
        <li key={r.label}>
          <div className="hrow">
            <span>{r.label}</span>
            <strong>{formatCOP(r.value)}</strong>
          </div>
          <div className="track">
            <div className="fill" style={{ width: `${max > 0 ? (r.value / max) * 100 : 0}%` }} />
          </div>
          {r.hint ? <div className="muted small">{r.hint}</div> : null}
        </li>
      ))}
    </ul>
  );
}

export default function Stats({ sales, current, range, prev }: Props) {
  const summary = useMemo(() => summarize(current, range), [current, range]);
  const prevSummary = useMemo(
    () => (prev ? summarize(inRange(sales, prev), prev) : null),
    [sales, prev]
  );
  const chart = useMemo(() => buckets(current, range), [current, range]);
  const products = useMemo(() => topProducts(current, 5), [current]);
  const payments = useMemo(() => byPayment(current), [current]);
  const weekdays = useMemo(() => byWeekday(current), [current]);

  if (current.length === 0) {
    return (
      <section className="panel">
        <h2>Estadísticas</h2>
        <p className="muted">No hay ventas en este periodo. Registra ventas o elige otro rango de fechas.</p>
      </section>
    );
  }

  const change = prevSummary ? pctChange(summary.total, prevSummary.total) : null;
  const maxBucket = Math.max(...chart.items.map((b) => b.total), 0);
  const labelStep = Math.max(1, Math.ceil(chart.items.length / 8));

  return (
    <div className="stack">
      <section className="kpis">
        <div className="kpi kpi-main">
          <span>Ventas totales</span>
          <strong>{formatCOP(summary.total)}</strong>
          <small className={change === null ? "" : change >= 0 ? "up" : "down"}>
            {change === null
              ? prev
                ? "Sin ventas en el periodo anterior para comparar"
                : "Todo el historial"
              : `${change >= 0 ? "▲" : "▼"} ${formatPct(Math.abs(change))} frente al periodo anterior`}
          </small>
        </div>
        <div className="kpi">
          <span>N.º de ventas</span>
          <strong>{summary.count}</strong>
          <small>{formatNumber(summary.units)} unidades</small>
        </div>
        <div className="kpi">
          <span>Ticket promedio</span>
          <strong>{formatCOP(summary.avgTicket)}</strong>
          <small>por venta</small>
        </div>
        <div className="kpi">
          <span>Promedio por día</span>
          <strong>{formatCOP(summary.avgPerDay)}</strong>
          <small>{summary.days} {summary.days === 1 ? "día" : "días"} en el periodo</small>
        </div>
        <div className="kpi">
          <span>Mejor día</span>
          <strong>{summary.best ? formatCOP(summary.best.total) : "—"}</strong>
          <small>{summary.best ? fmtLong(summary.best.date) : ""}</small>
        </div>
      </section>

      <section className="panel">
        <h2>Ventas {chart.unit === "day" ? "por día" : "por mes"}</h2>
        <div className="chart" role="img" aria-label="Gráfico de ventas">
          {chart.items.map((b) => (
            <div className="bar-col" key={b.key} title={`${b.label}: ${formatCOP(b.total)} (${b.count} ventas)`}>
              <div
                className={b.total > 0 ? "bar" : "bar zero"}
                style={{ height: `${maxBucket > 0 ? Math.max((b.total / maxBucket) * 100, b.total > 0 ? 2 : 0) : 0}%` }}
              />
            </div>
          ))}
        </div>
        <div className="chart-labels">
          {chart.items.map((b, i) => (
            <span key={b.key}>
              <em>{i % labelStep === 0 ? b.label : ""}</em>
            </span>
          ))}
        </div>
      </section>

      <div className="grid grid-2 stats-grid">
        <section className="panel">
          <h2>Productos más vendidos</h2>
          <HBars
            rows={products.map((p) => ({
              label: p.name,
              value: p.total,
              hint: `${formatNumber(p.units)} unidades`,
            }))}
          />
        </section>

        <section className="panel">
          <h2>Medios de pago</h2>
          <HBars
            rows={payments.map((p) => ({
              label: p.method,
              value: p.total,
              hint: `${p.count} ${p.count === 1 ? "venta" : "ventas"} · ${formatPct(
                summary.total > 0 ? (p.total / summary.total) * 100 : 0
              )}`,
            }))}
          />
        </section>
      </div>

      <section className="panel">
        <h2>Ventas por día de la semana</h2>
        <HBars rows={weekdays.map((d) => ({ label: d.day, value: d.total }))} />
      </section>
    </div>
  );
}
