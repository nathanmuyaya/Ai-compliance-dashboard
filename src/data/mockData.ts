import type {
  DailySales,
  CategorySales,
  FlaggedRisk,
  RiskSeverity,
  RiskStatus,
} from "../types";

// Simple seeded PRNG so the demo data is stable across re-renders within a session.
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;

    let t = Math.imul(
      seed ^ (seed >>> 15),
      1 | seed
    );

    t =
      (t +
        Math.imul(
          t ^ (t >>> 7),
          61 | t
        )) ^
      t;

    return (
      (t ^ (t >>> 14)) >>> 0
    ) / 4294967296;
  };
}

const rand = mulberry32(42);

const CATEGORIES = [
  "Electronics",
  "Apparel",
  "Home & Garden",
  "Grocery",
  "Beauty",
];

function isoDaysAgo(daysAgo: number): string {
  const d = new Date();

  d.setDate(
    d.getDate() - daysAgo
  );

  return d.toISOString().slice(0, 10);
}

/* =========================================================
   DAILY SALES
========================================================= */

export const DAILY_SALES: DailySales[] =
  Array.from(
    { length: 90 },
    (_, i) => {
      const daysAgo = 89 - i;

      const dayOfWeek = new Date(
        isoDaysAgo(daysAgo)
      ).getDay();

      const weekendBoost =
        dayOfWeek === 0 ||
        dayOfWeek === 6
          ? 1.25
          : 1;

      const trend =
        1 + (i / 90) * 0.35;

      const noise =
        0.8 + rand() * 0.4;

      const revenue = Math.round(
        3200 *
          weekendBoost *
          trend *
          noise
      );

      const orders = Math.round(
        revenue /
          (38 + rand() * 12)
      );

      const date =
        isoDaysAgo(daysAgo);

      return {
        date,
        revenue,
        orders,
        value: revenue,
        label: date,
      };
    }
  );

/* =========================================================
   CATEGORY SALES
========================================================= */

export const CATEGORY_SALES: CategorySales[] =
  CATEGORIES.map(
    (category, i) => {
      const base = [
        42000,
        31000,
        24500,
        19800,
        15200,
      ][i];

      const value = Math.round(
        base *
          (0.9 + rand() * 0.2)
      );

      return {
        category,
        value,
        label: category,
        revenue: value,
      };
    }
  );

/* =========================================================
   FLAGGED RISKS
========================================================= */

const RISK_TEMPLATES: Array<{
  description: string;
  category: string;
  severity: RiskSeverity;
}> = [
  {
    description:
      "Discount applied exceeds manager approval threshold",
    category: "Pricing",
    severity: "critical",
  },
  {
    description:
      "Duplicate transaction detected within 2 minutes",
    category: "Transactions",
    severity: "serious",
  },
  {
    description:
      "Refund issued without matching original sale",
    category: "Returns",
    severity: "critical",
  },
  {
    description:
      "Sale recorded outside registered store hours",
    category: "Transactions",
    severity: "warning",
  },
  {
    description:
      "Cash transaction just under reporting threshold",
    category: "Compliance",
    severity: "critical",
  },
  {
    description:
      "Repeated returns from same customer this week",
    category: "Returns",
    severity: "serious",
  },
  {
    description:
      "Employee discount used on non-employee account",
    category: "Pricing",
    severity: "serious",
  },
  {
    description:
      "Inventory count mismatch after sale voided",
    category: "Inventory",
    severity: "warning",
  },
  {
    description:
      "High-value sale with no ID verification logged",
    category: "Compliance",
    severity: "critical",
  },
  {
    description:
      "Price override applied by unauthorized user role",
    category: "Pricing",
    severity: "warning",
  },
  {
    description:
      "Gift card redeemed above balance issued",
    category: "Transactions",
    severity: "serious",
  },
  {
    description:
      "Unusual spike in void transactions for one register",
    category: "Transactions",
    severity: "warning",
  },
];

const STATUSES: RiskStatus[] = [
  "open",
  "investigating",
  "resolved",
];

export const FLAGGED_RISKS: FlaggedRisk[] =
  RISK_TEMPLATES
    .map((tmpl, i) => {
      const daysAgo =
        Math.floor(
          rand() * 45
        );

      const status =
        STATUSES[
          Math.floor(
            rand() *
              STATUSES.length
          )
        ];

      const amount =
        Math.round(
          80 + rand() * 2400
        );

      return {
        id: `RSK-${1000 + i}`,
        date: isoDaysAgo(
          daysAgo
        ),
        description:
          tmpl.description,
        category:
          tmpl.category,
        severity:
          tmpl.severity,
        amount,
        status,
      };
    })
    .sort((a, b) =>
      a.date < b.date
        ? 1
        : -1
    );

/* =========================================================
   SHARED SALES DATA
========================================================= */

export interface Sale {
  id: string;
  customer: string;
  product: string;
  category: string;
  amount: number;
  status:
    | "Completed"
    | "Pending"
    | "Flagged";
  date: string;
}

export const SALES: Sale[] = [
  {
    id: "SAL-001",
    customer: "Kabwe Trading Ltd",
    product: "Coca-Cola",
    category: "Soft Drinks",
    amount: 120,
    status: "Completed",
    date: "20 Sep 2026",
  },
  {
    id: "SAL-002",
    customer: "Mwamba Stores",
    product: "Fanta",
    category: "Soft Drinks",
    amount: 95,
    status: "Completed",
    date: "20 Sep 2026",
  },
  {
    id: "SAL-003",
    customer: "Zambezi Holdings",
    product: "Pepsi",
    category: "Soft Drinks",
    amount: 110,
    status: "Flagged",
    date: "19 Sep 2026",
  },
  {
    id: "SAL-004",
    customer: "Lusaka Finance",
    product: "Sprite",
    category: "Soft Drinks",
    amount: 85,
    status: "Completed",
    date: "19 Sep 2026",
  },
  {
    id: "SAL-005",
    customer: "Copperbelt Mining",
    product: "Water",
    category: "Water",
    amount: 48,
    status: "Pending",
    date: "18 Sep 2026",
  },
  {
    id: "SAL-006",
    customer: "Central Supplies",
    product: "Coca-Cola",
    category: "Soft Drinks",
    amount: 120,
    status: "Completed",
    date: "18 Sep 2026",
  },
];

/* =========================================================
   PRODUCT SALES
   Derived automatically from SALES
========================================================= */

export interface ProductSales {
  product: string;
  category: string;
  revenue: number;
  transactions: number;
}

export const PRODUCT_SALES: ProductSales[] =
  Object.values(
    SALES.reduce<
      Record<string, ProductSales>
    >(
      (products, sale) => {
        if (
          !products[sale.product]
        ) {
          products[sale.product] = {
            product:
              sale.product,
            category:
              sale.category,
            revenue: 0,
            transactions: 0,
          };
        }

        products[
          sale.product
        ].revenue +=
          sale.amount;

        products[
          sale.product
        ].transactions += 1;

        return products;
      },
      {}
    )
  );

/* =========================================================
   SALES CATEGORY SUMMARY
   Derived automatically from SALES
========================================================= */

export interface SalesCategorySummary {
  category: string;
  revenue: number;
  transactions: number;
}

export const SALES_CATEGORY_SUMMARY: SalesCategorySummary[] =
  Object.values(
    SALES.reduce<
      Record<
        string,
        SalesCategorySummary
      >
    >(
      (categories, sale) => {
        if (
          !categories[
            sale.category
          ]
        ) {
          categories[
            sale.category
          ] = {
            category:
              sale.category,
            revenue: 0,
            transactions: 0,
          };
        }

        categories[
          sale.category
        ].revenue +=
          sale.amount;

        categories[
          sale.category
        ].transactions += 1;

        return categories;
      },
      {}
    )
  );