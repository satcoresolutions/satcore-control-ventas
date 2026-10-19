export type Payment = "Efectivo" | "Transferencia" | "Tarjeta" | "Otro";

export const PAYMENTS: Payment[] = ["Efectivo", "Transferencia", "Tarjeta", "Otro"];

export interface Sale {
  id: string;
  createdAt: number;
  date: string; // YYYY-MM-DD
  product: string;
  quantity: number;
  unitPrice: number;
  payment: Payment;
  customer: string;
  note: string;
}
