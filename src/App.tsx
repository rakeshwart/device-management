import { useState } from "react";
import { AppNavbar } from "./components/AppNavbar.tsx";
import { AppSidenav } from "./components/AppSidenav.tsx";
import { MainStage } from "./components/MainStage.tsx";
import type { ViewName } from "./nav.ts";
import "./App.css";

export default function App() {
  const [navExpanded, setNavExpanded] = useState(true);
  const [activeView, setActiveView] = useState<ViewName>("map");
  const [panelOpen, setPanelOpen] = useState(false);

  return (
    <div className="app">
      <AppNavbar
        navExpanded={navExpanded}
        onNavExpandedChange={setNavExpanded}
      />
      <div className={navExpanded ? "shell is-nav-expanded" : "shell"}>
        <AppSidenav
          expanded={navExpanded}
          activeView={activeView}
          onSelect={setActiveView}
        />
        <MainStage
          activeView={activeView}
          panelOpen={panelOpen}
          onTogglePanel={() => setPanelOpen((open) => !open)}
        />
      </div>
    </div>
  );
}
