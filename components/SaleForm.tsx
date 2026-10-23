
"use client";

import { useMemo, useRef, useState } from "react";
import type { Payment, Sale } from "@/lib/types";
import { PAYMENTS } from "@/lib/types";
import { todayISO } from "@/lib/dates";
import { formatCOP } from "@/lib/format";
import { ui } from "@/lib/ui";

type SaleData = Omit<Sale, "id" | "createdAt">;

interface Props {
  editing: Sale | null;
  sales: Sale[];
  onSave: (data: SaleData, id?: string) => void;
  onCancel: () => void;
}

export default function SaleForm({
  editing,
  sales,
  onSave,
  onCancel,
}: Props) {
  const [date, setDate] = useState(editing?.date ?? todayISO());
  const [product, setProduct] = useState(editing?.product ?? "");
  const [quantity, setQuantity] = useState(editing?.quantity ?? 1);
  const [unitPrice, setUnitPrice] = useState(editing?.unitPrice ?? 0);
  const [payment, setPayment] = useState<Payment>(
    editing?.payment ?? "Efectivo",
  );
  const [customer, setCustomer] = useState(editing?.customer ?? "");
  const [note, setNote] = useState(editing?.note ?? "");
  const [error, setError] = useState("");

  const productRef = useRef<HTMLInputElement>(null);

  // Productos vendidos anteriormente, del más reciente al más antiguo.
  const known = useMemo(() => {
    const map = new Map<string, { name: string; price: number }>();

    for (const sale of [...sales].sort(
      (a, b) => b.createdAt - a.createdAt,
    )) {
      const key = sale.product.trim().toLowerCase();

      if (key && !map.has(key)) {
        map.set(key, {
          name: sale.product.trim(),
          price: sale.unitPrice,
        });
      }
    }

    return map;
  }, [sales]);

  const onProductChange = (value: string) => {
    setProduct(value);

    const match = known.get(value.trim().toLowerCase());

    if (match && unitPrice === 0) {
      setUnitPrice(match.price);
    }
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!product.trim()) {
      setError("Escribe el producto o servicio vendido.");
      return;
    }

    if (!(quantity > 0)) {
      setError("La cantidad debe ser mayor que 0.");
      return;
    }

    if (!(unitPrice >= 0)) {
      setError("El precio no puede ser negativo.");
      return;
    }

    if (!date) {
      setError("Elige la fecha de la venta.");
      return;
    }

    setError("");

    onSave(
      {
        date,
        product: product.trim(),
        quantity,
        unitPrice,
        payment,
        customer: customer.trim(),
        note: note.trim(),
      },
      editing?.id,
    );

    if (!editing) {
      // Conserva fecha y medio de pago para registrar varias ventas seguidas.
      setProduct("");
      setQuantity(1);
      setUnitPrice(0);
      setCustomer("");
      setNote("");
      productRef.current?.focus();
    }
  };

  return (
    <form className={`${ui.panel} ${ui.stack}`} onSubmit={submit}>
      <header className="flex flex-col gap-1">
        <h2 className={ui.title}>
          {editing ? "Editar venta" : "Registrar venta"}
        </h2>

        <p className={ui.mutedSmall}>
          {editing
            ? "Actualiza la información de esta venta."
            : "Registra los productos o servicios vendidos."}
        </p>
      </header>

      <div className={ui.formStack}>
        <label className={ui.label}>
          Fecha de la venta
          <input
            className={ui.input}
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </label>

        <label className={ui.label}>
          Producto o servicio
          <input
            ref={productRef}
            className={ui.input}
            list="productos-vendidos"
            placeholder="Ej. Camiseta básica"
            value={product}
            onChange={(e) => onProductChange(e.target.value)}
            autoFocus
            autoComplete="off"
            required
          />

          <datalist id="productos-vendidos">
            {[...known.values()].slice(0, 50).map((item) => (
              <option key={item.name} value={item.name} />
            ))}
          </datalist>

          <span className={ui.hint}>
            Puedes seleccionar un producto registrado anteriormente.
          </span>
        </label>

        <div className={ui.grid2}>
          <label className={ui.label}>
            Cantidad
            <input
              className={ui.input}
              type="number"
              min="0"
              step="any"
              value={quantity}
              onChange={(e) =>
                setQuantity(Number(e.target.value) || 0)
              }
              required
            />
          </label>

          <label className={ui.label}>
            Precio unitario
            <span className="text-text-muted">Valor en pesos colombianos</span>
            <input
              className={ui.input}
              type="number"
              min="0"
              step="any"
              value={unitPrice}
              onChange={(e) =>
                setUnitPrice(
                  Math.max(0, Number(e.target.value) || 0),
                )
              }
              required
            />
          </label>
        </div>

        <label className={ui.label}>
          Medio de pago
          <select
            className={ui.input}
            value={payment}
            onChange={(e) => setPayment(e.target.value as Payment)}
          >
            {PAYMENTS.map((method) => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
          </select>
        </label>

        <label className={ui.label}>
          Cliente <span className="inline text-text-muted">(opcional)</span>
          <input
            className={ui.input}
            type="text"
            placeholder="Nombre del cliente"
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
          />
        </label>

        <label className={ui.label}>
          Nota <span className="inline text-text-muted">(opcional)</span>
          <input
            className={ui.input}
            type="text"
            placeholder="Detalles adicionales de la venta"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </label>
      </div>

      <div className="flex flex-col gap-1 rounded-xl border border-border bg-background p-4 sm:flex-row sm:items-center sm:justify-between">
        <span className={ui.totalLabel}>Total de la venta</span>
        <strong className="text-2xl font-bold tabular-nums text-text-primary">
          {formatCOP(quantity * unitPrice)}
        </strong>
      </div>

      {error ? (
        <p className={ui.alert} role="alert">
          {error}
        </p>
      ) : null}

      <div className="flex flex-col gap-2 sm:flex-row">
        <button type="submit" className={`${ui.btnPrimary} flex-1`}>
          {editing ? "Guardar cambios" : "Registrar venta"}
        </button>

        {editing ? (
          <button
            type="button"
            className={ui.btn}
            onClick={onCancel}
          >
            Cancelar edición
          </button>
        ) : null}
      </div>
    </form>
  );
}
