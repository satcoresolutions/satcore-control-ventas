"use client";

import type { Sale } from "@/lib/types";
import { fmtLong } from "@/lib/dates";
import { formatCOP, formatNumber } from "@/lib/format";
import { saleTotal } from "@/lib/stats";
import { ui } from "@/lib/ui";

interface Props {
  sales: Sale[];
  onEdit: (s: Sale) => void;
  onDelete: (s: Sale) => void;
}

export default function SalesTable({ sales, onEdit, onDelete }: Props) {
  const sorted = [...sales].sort((a, b) =>
    a.date === b.date
      ? b.createdAt - a.createdAt
      : a.date < b.date
        ? 1
        : -1
  );

  const groups: { date: string; items: Sale[]; total: number }[] = [];

  for (const s of sorted) {
    const last = groups[groups.length - 1];

    if (last && last.date === s.date) {
      last.items.push(s);
      last.total += saleTotal(s);
    } else {
      groups.push({
        date: s.date,
        items: [s],
        total: saleTotal(s),
      });
    }
  }

  if (groups.length === 0) {
    return (
      <p className={`${ui.muted} py-6 text-center text-sm`}>
        No hay ventas en este periodo.
      </p>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-lg border border-border">
      <table className="w-full min-w-[760px] border-collapse text-left text-sm">
        <thead className="bg-surface-secondary text-text-muted">
          <tr>
            <th scope="col" className="px-4 py-3 font-semibold">
              Producto
            </th>
            <th scope="col" className="px-4 py-3 text-right font-semibold">
              Cant.
            </th>
            <th scope="col" className="px-4 py-3 text-right font-semibold">
              Precio unit.
            </th>
            <th scope="col" className="px-4 py-3 text-right font-semibold">
              Total
            </th>
            <th scope="col" className="px-4 py-3 font-semibold">
              Pago
            </th>
            <th scope="col" className="px-4 py-3 text-right font-semibold">
              Acciones
            </th>
          </tr>
        </thead>

        {groups.map((g) => (
          <tbody key={g.date} className="divide-y divide-border">
            <tr className="bg-surface-secondary/70">
              <td colSpan={3} className="px-4 py-3 font-semibold text-foreground">
                {fmtLong(g.date)} · {g.items.length}{" "}
                {g.items.length === 1 ? "venta" : "ventas"}
              </td>

              <td
                colSpan={3}
                className="px-4 py-3 text-right font-bold tabular-nums text-foreground"
              >
                {formatCOP(g.total)}
              </td>
            </tr>

            {g.items.map((s) => (
              <tr
                key={s.id}
                className="transition-colors hover:bg-surface-secondary/60"
              >
                <td className="max-w-64 px-4 py-3 align-top">
                  <p className="break-words font-medium text-foreground">
                    {s.product}
                  </p>

                  {s.customer || s.note ? (
                    <p className="mt-1 break-words text-xs text-text-muted">
                      {[s.customer, s.note].filter(Boolean).join(" · ")}
                    </p>
                  ) : null}
                </td>

                <td className="whitespace-nowrap px-4 py-3 text-right tabular-nums text-foreground">
                  {formatNumber(s.quantity)}
                </td>

                <td className="whitespace-nowrap px-4 py-3 text-right tabular-nums text-foreground">
                  {formatCOP(s.unitPrice)}
                </td>

                <td className="whitespace-nowrap px-4 py-3 text-right font-semibold tabular-nums text-foreground">
                  {formatCOP(saleTotal(s))}
                </td>

                <td className="whitespace-nowrap px-4 py-3 text-foreground">
                  {s.payment}
                </td>

                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-3">
                    <button
                      type="button"
                      className={ui.link}
                      onClick={() => onEdit(s)}
                      aria-label={`Editar venta de ${s.product}`}
                    >
                      Editar
                    </button>

                    <button
                      type="button"
                      className={ui.linkDanger}
                      onClick={() => onDelete(s)}
                      aria-label={`Borrar venta de ${s.product}`}
                    >
                      Borrar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        ))}
      </table>
    </div>
  );
}