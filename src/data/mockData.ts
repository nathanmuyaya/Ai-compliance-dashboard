import type { DailySales, CategorySales, FlaggedRisk, RiskSeverity, RiskStatus } from "../types";

// Simple seeded PRNG so the demo data is stable across re-renders within a session.
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = mulberry32(42);

const CATEGORIES = ["Electronics", "Apparel", "Home & Garden", "Grocery", "Beauty"];

function isoDaysAgo(daysAgo: number): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().slice(0, 10);
}

export const DAILY_SALES: DailySales[] = Array.from({ length: 90 }, (_, i) => {
  const daysAgo = 89 - i;
  const dayOfWeek = new Date(isoDaysAgo(daysAgo)).getDay();
  const weekendBoost = dayOfWeek === 0 || dayOfWeek === 6 ? 1.25 : 1;
  const trend = 1 + (i / 90) * 0.35; // gentle upward trend over the quarter
  const noise = 0.8 + rand() * 0.4;
  const revenue = Math.round(3200 * weekendBoost * trend * noise);
  const orders = Math.round(revenue / (38 + rand() * 12));
  return { date: isoDaysAgo(daysAgo), revenue, orders };
});

export const CATEGORY_SALES: CategorySales[] = CATEGORIES.map((category, i) => {
  const base = [42000, 31000, 24500, 19800, 15200][i];
  return { category, revenue: Math.round(base * (0.9 + rand() * 0.2)) };
});

const RISK_TEMPLATES: Array<{ description: string; category: string; severity: RiskSeverity }> = [
  { description: "Discount applied exceeds manager approval threshold", category: "Pricing", severity: "critical" },
  { description: "Duplicate transaction detected within 2 minutes", category: "Transactions", severity: "serious" },
  { description: "Refund issued without matching original sale", category: "Returns", severity: "critical" },
  { description: "Sale recorded outside registered store hours", category: "Transactions", severity: "warning" },
  { description: "Cash transaction just under reporting threshold", category: "Compliance", severity: "critical" },
  { description: "Repeated returns from same customer this week", category: "Returns", severity: "serious" },
  { description: "Employee discount used on non-employee account", category: "Pricing", severity: "serious" },
  { description: "Inventory count mismatch after sale voided", category: "Inventory", severity: "warning" },
  { description: "High-value sale with no ID verification logged", category: "Compliance", severity: "critical" },
  { description: "Price override applied by unauthorized user role", category: "Pricing", severity: "warning" },
  { description: "Gift card redeemed above balance issued", category: "Transactions", severity: "serious" },
  { description: "Unusual spike in void transactions for one register", category: "Transactions", severity: "warning" },
];

const STATUSES: RiskStatus[] = ["open", "investigating", "resolved"];

export const FLAGGED_RISKS: FlaggedRisk[] = RISK_TEMPLATES.map((tmpl, i) => {
  const daysAgo = Math.floor(rand() * 45);
  const status = STATUSES[Math.floor(rand() * STATUSES.length)];
  const amount = Math.round(80 + rand() * 2400);
  return {
    id: `RSK-${1000 + i}`,
    date: isoDaysAgo(daysAgo),
    description: tmpl.description,
    category: tmpl.category,
    severity: tmpl.severity,
    amount,
    status,
  };
}).sort((a, b) => (a.date < b.date ? 1 : -1));
