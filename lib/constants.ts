
import { PAYMENTS, type Payment } from "./types";

/** Métodos de pago disponibles en el registro de ventas. */
export const PAYMENT_META: Record<Payment, { emoji: string; label: string }> = {
  Efectivo: {
    emoji: "💵",
    label: "Efectivo",
  },
  Transferencia: {
    emoji: "📲",
    label: "Transferencia",
  },
  Tarjeta: {
    emoji: "💳",
    label: "Tarjeta",
  },
  Otro: {
    emoji: "💰",
    label: "Otro",
  },
};

/** Opciones para los selectores de métodos de pago. */
export const PAYMENT_OPTIONS = PAYMENTS.map((id) => ({
  id,
  label: PAYMENT_META[id].label,
  emoji: PAYMENT_META[id].emoji,
}));

/** Clave de almacenamiento local de las ventas. */
export const STORAGE_KEYS = {
  sales: "control-ventas:ventas",
} as const;

/** Clave para guardar la preferencia de tema de la aplicación. */
export const THEME_KEY = "satcore-control-ventas-theme";

/** Métodos de pago disponibles, importados desde los tipos. */
export { PAYMENTS };

/** Clases reutilizables de Tailwind definidas en lib/ui.ts. */
export { ui } from "./ui";
