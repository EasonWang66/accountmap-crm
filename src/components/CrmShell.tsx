import { BriefcaseBusiness, Building2, Home, UsersRound } from "lucide-react";
import type { PropsWithChildren } from "react";
import jamieBurtonPhoto from "../assets/jamie-burton.jpeg";

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
            <img alt="" src={jamieBurtonPhoto} />
            <span>Jamie Burton</span>
          </div>
        </header>
        {children}
      </section>
    </div>
  );
}
