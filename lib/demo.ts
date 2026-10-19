import type { Payment, Sale } from "./types";
import { PAYMENTS } from "./types";
import { addDays, toDate, todayISO } from "./dates";
import { uid } from "./format";

const PRODUCTS: { name: string; price: number }[] = [
  { name: "Camiseta básica", price: 35000 },
  { name: "Gorra", price: 25000 },
  { name: "Jean clásico", price: 90000 },
  { name: "Zapatillas", price: 120000 },
  { name: "Medias (par)", price: 8000 },
  { name: "Cinturón de cuero", price: 30000 },
];

/** Genera ~45 días de ventas de ejemplo (determinista) para explorar las estadísticas. */
export function demoSales(): Sale[] {
  let seed = 7;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };

  const today = todayISO();
  const sales: Sale[] = [];
  const now = Date.now();

  for (let back = 44; back >= 0; back--) {
    const date = addDays(today, -back);
    const dow = toDate(date).getDay();
    const base = dow === 5 || dow === 6 ? 5 : 3; // más ventas viernes y sábado
    const n = Math.floor(rand() * base) + (dow === 0 ? 0 : 1);

    for (let i = 0; i < n; i++) {
      const p = PRODUCTS[Math.floor(rand() * PRODUCTS.length)];
      const payment: Payment = PAYMENTS[Math.floor(rand() * 3)];
      sales.push({
        id: uid(),
        createdAt: now - back * 86_400_000 + i,
        date,
        product: p.name,
        quantity: Math.floor(rand() * 3) + 1,
        unitPrice: p.price,
        payment,
        customer: "",
        note: "",
      });
    }
  }
  return sales;
}
