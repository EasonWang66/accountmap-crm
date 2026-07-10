const tabs = ["Overview", "Organizational Chart", "Activity Timeline", "Contract History", "Competitors"];

type AccountTabsProps = {
  activeTab: string;
};

export function AccountTabs({ activeTab }: AccountTabsProps) {
  return (
    <div className="tabs" role="tablist" aria-label="Account sections">
      {tabs.map((tab) => (
        <button
          aria-selected={tab === activeTab}
          className={tab === activeTab ? "tab active" : "tab"}
          key={tab}
          role="tab"
          type="button"
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

