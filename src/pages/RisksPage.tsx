import PageHeader from "../components/PageHeader";
import StatTile from "../components/StatTile";
import FlaggedRisksTable from "../components/FlaggedRisksTable";
import { FLAGGED_RISKS } from "../data/mockData";
import { useSalesStats } from "../data/useSalesStats";

const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export default function RisksPage() {
  const { openRisks, criticalOpen } = useSalesStats();
  const flaggedAmount = FLAGGED_RISKS.reduce((sum, r) => sum + r.amount, 0);
  const resolvedCount = FLAGGED_RISKS.filter((r) => r.status === "resolved").length;

  return (
    <>
      <PageHeader title="Flagged risks" subtitle="Transactions flagged for compliance review" />

      <section className="stat-grid">
        <StatTile label="Total flagged" value={FLAGGED_RISKS.length.toString()} />
        <StatTile
          label="Open"
          value={openRisks.length.toString()}
          tone={criticalOpen.length > 0 ? "critical" : "default"}
          delta={`${criticalOpen.length} critical`}
          deltaDirection="flat"
        />
        <StatTile label="Resolved" value={resolvedCount.toString()} />
        <StatTile label="Flagged amount" value={currency.format(flaggedAmount)} />
      </section>

      <section>
        <FlaggedRisksTable risks={FLAGGED_RISKS} />
      </section>
    </>
  );
}
