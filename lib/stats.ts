import type { Payment, Sale } from "./types";
import { PAYMENTS } from "./types";
import { addDays, diffDays, fmtMonthKey, fmtShort, startOfMonth, toDate, todayISO } from "./dates";

export type RangeId = "today" | "7d" | "30d" | "month" | "all" | "custom";

export interface Range {
  from: string;
  to: string;
}

export interface ResolvedRange {
  range: Range;
  prev: Range | null;
}

export const saleTotal = (s: Sale): number => (Number(s.quantity) || 0) * (Number(s.unitPrice) || 0);

export function resolveRange(id: RangeId, sales: Sale[], custom: Range): ResolvedRange {
  const today = todayISO();
  let range: Range;

  switch (id) {
    case "today":
      range = { from: today, to: today };
      break;
    case "7d":
      range = { from: addDays(today, -6), to: today };
      break;
    case "30d":
      range = { from: addDays(today, -29), to: today };
      break;
    case "month":
      range = { from: startOfMonth(today), to: today };
      break;
    case "custom": {
      const a = custom.from || today;
      const b = custom.to || today;
      range = a <= b ? { from: a, to: b } : { from: b, to: a };
      break;
    }
    default: {
      const dates = sales.map((s) => s.date).sort();
      const first = dates[0] ?? today;
      const last = dates[dates.length - 1] ?? today;
      range = { from: first, to: last > today ? last : today };
    }
  }

  if (id === "all") return { range, prev: null };

  const len = diffDays(range.from, range.to) + 1;
  const prevTo = addDays(range.from, -1);
  const prevFrom = addDays(prevTo, -(len - 1));
  return { range, prev: { from: prevFrom, to: prevTo } };
}

export function inRange(sales: Sale[], range: Range): Sale[] {
  return sales.filter((s) => s.date >= range.from && s.date <= range.to);
}

export interface Summary {
  total: number;
  count: number;
  units: number;
  avgTicket: number;
  days: number;
  avgPerDay: number;
  best: { date: string; total: number } | null;
}

export function summarize(sales: Sale[], range: Range): Summary {
  let total = 0;
  let units = 0;
  const perDay = new Map<string, number>();

  for (const s of sales) {
    const t = saleTotal(s);
    total += t;
    units += Number(s.quantity) || 0;
    perDay.set(s.date, (perDay.get(s.date) ?? 0) + t);
  }

  let best: Summary["best"] = null;
  for (const [date, t] of perDay) {
    if (!best || t > best.total) best = { date, total: t };
  }

  const days = Math.max(1, diffDays(range.from, range.to) + 1);
  return {
    total,
    count: sales.length,
    units,
    avgTicket: sales.length ? total / sales.length : 0,
    days,
    avgPerDay: total / days,
    best,
  };
}

export function pctChange(current: number, previous: number): number | null {
  if (!(previous > 0)) return null;
  return ((current - previous) / previous) * 100;
}

export interface Bucket {
  key: string;
  label: string;
  total: number;
  count: number;
}

/** Ventas por día (rangos de hasta 62 días) o por mes (rangos más largos). */
export function buckets(sales: Sale[], range: Range): { unit: "day" | "month"; items: Bucket[] } {
  const span = diffDays(range.from, range.to) + 1;

  if (span <= 62) {
    const map = new Map<string, Bucket>();
    for (let i = 0; i < span; i++) {
      const key = addDays(range.from, i);
      map.set(key, { key, label: fmtShort(key), total: 0, count: 0 });
    }
    for (const s of sales) {
      const b = map.get(s.date);
      if (b) {
        b.total += saleTotal(s);
        b.count += 1;
      }
    }
    return { unit: "day", items: [...map.values()] };
  }

  const map = new Map<string, Bucket>();
  let cursor = range.from.slice(0, 7);
  const last = range.to.slice(0, 7);
  while (cursor <= last) {
    map.set(cursor, { key: cursor, label: fmtMonthKey(cursor), total: 0, count: 0 });
    const [y, m] = cursor.split("-").map(Number);
    cursor = m === 12 ? `${y + 1}-01` : `${y}-${String(m + 1).padStart(2, "0")}`;
  }
  for (const s of sales) {
    const b = map.get(s.date.slice(0, 7));
    if (b) {
      b.total += saleTotal(s);
      b.count += 1;
    }
  }
  return { unit: "month", items: [...map.values()] };
}

export interface ProductStat {
  name: string;
  total: number;
  units: number;
}

export function topProducts(sales: Sale[], limit = 5): ProductStat[] {
  const map = new Map<string, ProductStat>();
  for (const s of sales) {
    const key = s.product.trim().toLowerCase();
    const cur = map.get(key) ?? { name: s.product.trim(), total: 0, units: 0 };
    cur.total += saleTotal(s);
    cur.units += Number(s.quantity) || 0;
    map.set(key, cur);
  }
  return [...map.values()].sort((a, b) => b.total - a.total).slice(0, limit);
}

export function byPayment(sales: Sale[]): { method: Payment; total: number; count: number }[] {
  return PAYMENTS.map((method) => {
    const subset = sales.filter((s) => s.payment === method);
    return { method, total: subset.reduce((acc, s) => acc + saleTotal(s), 0), count: subset.length };
  }).filter((p) => p.count > 0);
}

const WEEKDAYS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

export function byWeekday(sales: Sale[]): { day: string; total: number }[] {
  const totals = new Array(7).fill(0) as number[];
  for (const s of sales) {
    const idx = (toDate(s.date).getDay() + 6) % 7; // lunes = 0
    totals[idx] += saleTotal(s);
  }
  return WEEKDAYS.map((day, i) => ({ day, total: totals[i] }));
}
