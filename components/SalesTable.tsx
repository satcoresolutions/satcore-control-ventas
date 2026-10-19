"use client";

import type { Sale } from "@/lib/types";
import { fmtLong } from "@/lib/dates";
import { formatCOP, formatNumber } from "@/lib/format";
import { saleTotal } from "@/lib/stats";

interface Props {
  sales: Sale[];
  onEdit: (s: Sale) => void;
  onDelete: (s: Sale) => void;
}

export default function SalesTable({ sales, onEdit, onDelete }: Props) {
  const sorted = [...sales].sort((a, b) =>
    a.date === b.date ? b.createdAt - a.createdAt : a.date < b.date ? 1 : -1
  );

  const groups: { date: string; items: Sale[]; total: number }[] = [];
  for (const s of sorted) {
    const last = groups[groups.length - 1];
    if (last && last.date === s.date) {
      last.items.push(s);
      last.total += saleTotal(s);
    } else {
      groups.push({ date: s.date, items: [s], total: saleTotal(s) });
    }
  }

  if (groups.length === 0) {
    return <p className="muted">No hay ventas en este periodo.</p>;
  }

  return (
    <div className="table-wrap">
      <table className="sales">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cant.</th>
            <th>Precio unit.</th>
            <th>Total</th>
            <th>Pago</th>
            <th />
          </tr>
        </thead>
        {groups.map((g) => (
          <tbody key={g.date}>
            <tr className="day-row">
              <td colSpan={3}>
                {fmtLong(g.date)} · {g.items.length} {g.items.length === 1 ? "venta" : "ventas"}
              </td>
              <td colSpan={3}>{formatCOP(g.total)}</td>
            </tr>
            {g.items.map((s) => (
              <tr key={s.id}>
                <td className="left">
                  {s.product}
                  {s.customer || s.note ? (
                    <div className="muted small">{[s.customer, s.note].filter(Boolean).join(" · ")}</div>
                  ) : null}
                </td>
                <td>{formatNumber(s.quantity)}</td>
                <td>{formatCOP(s.unitPrice)}</td>
                <td>
                  <strong>{formatCOP(saleTotal(s))}</strong>
                </td>
                <td>{s.payment}</td>
                <td className="row-actions">
                  <button type="button" className="link" onClick={() => onEdit(s)}>
                    Editar
                  </button>
                  <button type="button" className="link danger" onClick={() => onDelete(s)}>
                    Borrar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        ))}
      </table>
    </div>
  );
}
