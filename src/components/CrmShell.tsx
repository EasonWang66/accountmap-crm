import { BriefcaseBusiness, Building2, Home, UsersRound } from "lucide-react";
import type { PropsWithChildren } from "react";

const navItems = [
  { label: "Home", icon: Home },
  { label: "Accounts", icon: Building2, active: true },
  { label: "Leads", icon: UsersRound },
  { label: "Requisitions", icon: BriefcaseBusiness }
];

export function CrmShell({ children }: PropsWithChildren) {
  return (
    <div className="app-frame">
      <aside className="sidebar" aria-label="Primary navigation">
        <div className="brand">
          <span className="window-dot red" />
          <span className="window-dot yellow" />
          <span className="window-dot green" />
          <strong>IG</strong>
        </div>
        <nav className="nav-list">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button className={item.active ? "nav-item active" : "nav-item"} key={item.label}>
                <Icon size={18} aria-hidden="true" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>
      <section className="content-shell">
        <header className="topbar">
          <button className="back-button">Back</button>
          <div className="user-chip">
            <img
              alt=""
              src="data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='80' height='80' fill='%23d7f3ff'/%3E%3Ccircle cx='40' cy='32' r='15' fill='%23786fdb'/%3E%3Cpath d='M16 80c3-20 14-31 24-31s21 11 24 31H16Z' fill='%23176b91'/%3E%3Ccircle cx='31' cy='31' r='3' fill='%23172b3a'/%3E%3Ccircle cx='49' cy='31' r='3' fill='%23172b3a'/%3E%3Cpath d='M33 41c4 4 10 4 14 0' stroke='%23172b3a' stroke-width='3' stroke-linecap='round' fill='none'/%3E%3C/svg%3E"
            />
            <span>Jamie Burton</span>
          </div>
        </header>
        {children}
      </section>
    </div>
  );
}
