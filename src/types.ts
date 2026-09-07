export interface DailySales {
  date: string; // ISO date
  revenue: number;
  orders: number;
}

export interface CategorySales {
  category: string;
  revenue: number;
}

export type RiskSeverity = "critical" | "serious" | "warning" | "good";
export type RiskStatus = "open" | "investigating" | "resolved";

export interface FlaggedRisk {
  id: string;
  date: string; // ISO date
  description: string;
  category: string;
  severity: RiskSeverity;
  amount: number;
  status: RiskStatus;
}
