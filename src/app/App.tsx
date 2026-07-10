import { AccountHeader } from "../components/AccountHeader";
import { AccountTabs } from "../components/AccountTabs";
import { CrmShell } from "../components/CrmShell";
import { OrgChartWorkspace } from "../features/org-chart/OrgChartWorkspace";
import { finovatechAccount } from "../data/seed";

export default function App() {
  return (
    <CrmShell>
      <main className="workspace" aria-label="Account workspace">
        <AccountHeader account={finovatechAccount} />
        <AccountTabs activeTab="Organizational Chart" />
        <OrgChartWorkspace />
      </main>
    </CrmShell>
  );
}

