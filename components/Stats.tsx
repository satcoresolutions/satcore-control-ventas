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
import { ui } from "@/lib/ui";

interface Props {
  sales: Sale[]; // todas las ventas
  current: Sale[]; // ventas del periodo elegido
  range: Range;
  prev: Range | null;
}

function HBars({
  rows,
}: {
  rows: { label: string; value: number; hint?: string }[];
}) {
  const max = Math.max(...rows.map((r) => r.value), 0);

  return (
    <ul className="grid gap-4">
      {rows.map((r) => (
        <li key={r.label} className="grid gap-1.5">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <span className="break-words text-sm text-foreground">
              {r.label}
            </span>
            <strong className="text-right text-sm font-semibold tabular-nums text-foreground">
              {formatCOP(r.value)}
            </strong>
          </div>

          <div
            className="h-2.5 overflow-hidden rounded-full bg-border"
            role="progressbar"
            aria-label={r.label}
            aria-valuemin={0}
            aria-valuemax={max}
            aria-valuenow={r.value}
          >
            <div
              className="h-full rounded-full bg-primary transition-[width] duration-300"
              style={{
                width: `${max > 0 ? (r.value / max) * 100 : 0}%`,
              }}
            />
          </div>

          {r.hint ? (
            <p className={ui.mutedSmall}>{r.hint}</p>
          ) : null}
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
      <section className={ui.panel}>
        <h2 className={ui.title}>Estadísticas</h2>
        <p className={`${ui.muted} mt-2`}>
          No hay ventas en este periodo. Registra ventas o elige otro rango de
          fechas.
        </p>
      </section>
    );
  }

  const change = prevSummary
    ? pctChange(summary.total, prevSummary.total)
    : null;

  const maxBucket = Math.max(...chart.items.map((b) => b.total), 0);
  const labelStep = Math.max(1, Math.ceil(chart.items.length / 8));

  const kpis = [
    {
      label: "Ventas totales",
      value: formatCOP(summary.total),
      detail:
        change === null
          ? prev
            ? "Sin ventas en el periodo anterior para comparar"
            : "Todo el historial"
          : `${change >= 0 ? "▲" : "▼"} ${formatPct(Math.abs(change))} frente al periodo anterior`,
      detailClass:
        change === null
          ? ui.mutedSmall
          : change >= 0
            ? "text-sm text-success"
            : "text-sm text-danger",
      featured: true,
    },
    {
      label: "N.º de ventas",
      value: formatNumber(summary.count),
      detail: `${formatNumber(summary.units)} unidades`,
      detailClass: ui.mutedSmall,
      featured: false,
    },
    {
      label: "Ticket promedio",
      value: formatCOP(summary.avgTicket),
      detail: "por venta",
      detailClass: ui.mutedSmall,
      featured: false,
    },
    {
      label: "Promedio por día",
      value: formatCOP(summary.avgPerDay),
      detail: `${summary.days} ${summary.days === 1 ? "día" : "días"} en el periodo`,
      detailClass: ui.mutedSmall,
      featured: false,
    },
    {
      label: "Mejor día",
      value: summary.best ? formatCOP(summary.best.total) : "—",
      detail: summary.best ? fmtLong(summary.best.date) : "",
      detailClass: ui.mutedSmall,
      featured: false,
    },
  ];

  return (
    <div className={ui.stack}>
      {/* Indicadores principales */}
      <section
        className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3"
        aria-label="Resumen de ventas"
      >
        {kpis.map((kpi) => (
          <article
            key={kpi.label}
            className={`${ui.panel} flex min-w-0 flex-col gap-2 ${
              kpi.featured
                ? "border-primary/40 bg-primary/5"
                : ""
            }`}
          >
            <span className={ui.mutedSmall}>{kpi.label}</span>

            <strong
              className={`break-words text-xl font-bold tabular-nums sm:text-2xl ${
                kpi.featured ? "text-text-primary" : "text-foreground"
              }`}
            >
              {kpi.value}
            </strong>

            <p className={kpi.detailClass}>{kpi.detail}</p>
          </article>
        ))}
      </section>

      {/* Gráfico de ventas */}
      <section className={ui.panel}>
        <div className={ui.panelHead}>
          <h2 className={ui.title}>
            Ventas {chart.unit === "day" ? "por día" : "por mes"}
          </h2>
        </div>

        <div
          className="flex h-56 items-end gap-1 overflow-x-auto border-b border-border px-1 pt-4 sm:gap-2"
          role="img"
          aria-label="Gráfico de ventas"
        >
          {chart.items.map((b) => (
            <div
              className="flex h-full min-w-2 flex-1 flex-col justify-end sm:min-w-3"
              key={b.key}
              title={`${b.label}: ${formatCOP(b.total)} (${b.count} ventas)`}
            >
              <div
                className={`w-full rounded-t-md transition-[height] duration-300 ${
                  b.total > 0 ? "bg-primary" : "bg-border"
                }`}
                style={{
                  height: `${
                    maxBucket > 0
                      ? Math.max(
                          (b.total / maxBucket) * 100,
                          b.total > 0 ? 2 : 0
                        )
                      : 0
                  }%`,
                }}
              />
            </div>
          ))}
        </div>

        <div className="mt-2 flex gap-1 overflow-x-auto sm:gap-2">
          {chart.items.map((b, i) => (
            <span
              key={b.key}
              className="min-w-2 flex-1 text-center text-[0.7rem] text-text-muted sm:min-w-3 sm:text-xs"
            >
              <span className="block truncate">
                {i % labelStep === 0 ? b.label : ""}
              </span>
            </span>
          ))}
        </div>
      </section>

      {/* Productos y medios de pago */}
      <div className="grid min-w-0 grid-cols-1 gap-4 xl:grid-cols-2">
        <section className={ui.panel}>
          <div className={ui.panelHead}>
            <h2 className={ui.title}>Productos más vendidos</h2>
          </div>

          <HBars
            rows={products.map((p) => ({
              label: p.name,
              value: p.total,
              hint: `${formatNumber(p.units)} unidades`,
            }))}
          />
        </section>

        <section className={ui.panel}>
          <div className={ui.panelHead}>
            <h2 className={ui.title}>Medios de pago</h2>
          </div>

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

      {/* Actividad por día de la semana */}
      <section className={ui.panel}>
        <div className={ui.panelHead}>
          <h2 className={ui.title}>Ventas por día de la semana</h2>
        </div>

        <HBars
          rows={weekdays.map((d) => ({
            label: d.day,
            value: d.total,
          }))}
        />
      </section>
    </div>
  );
}