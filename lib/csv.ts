import type { Sale } from "./types";
import { saleTotal } from "./stats";

function cell(value: string | number): string {
  const text = String(value);
  return /[",\n;]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

export function salesToCSV(sales: Sale[]): string {
  const header = ["Fecha", "Producto", "Cantidad", "Precio unitario", "Total", "Pago", "Cliente", "Nota"];
  const rows = sales.map((s) =>
    [s.date, s.product, s.quantity, s.unitPrice, saleTotal(s), s.payment, s.customer, s.note]
      .map(cell)
      .join(",")
  );
  // BOM para que Excel respete las tildes
  return "﻿" + [header.join(","), ...rows].join("\n");
}

export function downloadCSV(filename: string, content: string) {
  const blob = new Blob([content], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
