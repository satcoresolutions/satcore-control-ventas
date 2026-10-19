"use client";

import { useMemo, useRef, useState } from "react";
import type { Payment, Sale } from "@/lib/types";
import { PAYMENTS } from "@/lib/types";
import { todayISO } from "@/lib/dates";
import { formatCOP } from "@/lib/format";

type SaleData = Omit<Sale, "id" | "createdAt">;

interface Props {
  editing: Sale | null;
  sales: Sale[];
  onSave: (data: SaleData, id?: string) => void;
  onCancel: () => void;
}

export default function SaleForm({ editing, sales, onSave, onCancel }: Props) {
  const [date, setDate] = useState(editing?.date ?? todayISO());
  const [product, setProduct] = useState(editing?.product ?? "");
  const [quantity, setQuantity] = useState(editing?.quantity ?? 1);
  const [unitPrice, setUnitPrice] = useState(editing?.unitPrice ?? 0);
  const [payment, setPayment] = useState<Payment>(editing?.payment ?? "Efectivo");
  const [customer, setCustomer] = useState(editing?.customer ?? "");
  const [note, setNote] = useState(editing?.note ?? "");
  const [error, setError] = useState("");
  const productRef = useRef<HTMLInputElement>(null);

  // Productos ya vendidos (más recientes primero) para autocompletar nombre y precio
  const known = useMemo(() => {
    const map = new Map<string, { name: string; price: number }>();
    for (const s of [...sales].sort((a, b) => b.createdAt - a.createdAt)) {
      const key = s.product.trim().toLowerCase();
      if (key && !map.has(key)) map.set(key, { name: s.product.trim(), price: s.unitPrice });
    }
    return map;
  }, [sales]);

  const onProductChange = (value: string) => {
    setProduct(value);
    const match = known.get(value.trim().toLowerCase());
    if (match && unitPrice === 0) setUnitPrice(match.price);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!product.trim()) return setError("Escribe el producto o servicio vendido.");
    if (!(quantity > 0)) return setError("La cantidad debe ser mayor que 0.");
    if (!(unitPrice >= 0)) return setError("El precio no puede ser negativo.");
    if (!date) return setError("Elige la fecha de la venta.");
    setError("");

    onSave(
      { date, product: product.trim(), quantity, unitPrice, payment, customer: customer.trim(), note: note.trim() },
      editing?.id
    );

    if (!editing) {
      // Se conserva fecha y medio de pago para registrar varias ventas seguidas
      setProduct("");
      setQuantity(1);
      setUnitPrice(0);
      setCustomer("");
      setNote("");
      productRef.current?.focus();
    }
  };

  return (
    <form className="panel" onSubmit={submit}>
      <h2>{editing ? "Editar venta" : "Registrar venta"}</h2>

      <div className="form-stack">
        <label>
          Fecha
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </label>

        <label>
          Producto o servicio
          <input
            ref={productRef}
            list="productos-vendidos"
            placeholder="Ej. Camiseta básica"
            value={product}
            onChange={(e) => onProductChange(e.target.value)}
            autoFocus
          />
          <datalist id="productos-vendidos">
            {[...known.values()].slice(0, 50).map((p) => (
              <option key={p.name} value={p.name} />
            ))}
          </datalist>
        </label>

        <div className="grid grid-2">
          <label>
            Cantidad
            <input
              type="number"
              min={0}
              step="any"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value) || 0)}
            />
          </label>
          <label>
            Precio unitario ($)
            <input
              type="number"
              min={0}
              value={unitPrice}
              onChange={(e) => setUnitPrice(Math.max(0, Number(e.target.value) || 0))}
            />
          </label>
        </div>

        <label>
          Medio de pago
          <select value={payment} onChange={(e) => setPayment(e.target.value as Payment)}>
            {PAYMENTS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </label>

        <label>
          Cliente (opcional)
          <input value={customer} onChange={(e) => setCustomer(e.target.value)} />
        </label>

        <label>
          Nota (opcional)
          <input value={note} onChange={(e) => setNote(e.target.value)} />
        </label>
      </div>

      <div className="total-box">
        <span>Total de la venta</span>
        <strong>{formatCOP(quantity * unitPrice)}</strong>
      </div>

      {error ? <p className="alert">{error}</p> : null}

      <button type="submit" className="btn btn-primary btn-block">
        {editing ? "Guardar cambios" : "Registrar venta"}
      </button>
      {editing ? (
        <button type="button" className="btn btn-block" onClick={onCancel}>
          Cancelar edición
        </button>
      ) : null}
    </form>
  );
}
