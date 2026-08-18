import {
  ModusWcMenu,
  ModusWcMenuItem,
  ModusWcSideNavigation,
} from "@trimble-oss/moduswebcomponents-react";
import { NAV_ITEMS, type ViewName } from "../nav.ts";
import { AssetIcon } from "./AssetIcon.tsx";

type AppSidenavProps = {
  expanded: boolean;
  activeView: ViewName;
  onSelect: (view: ViewName) => void;
};

export function AppSidenav({
  expanded,
  activeView,
  onSelect,
}: AppSidenavProps) {
  return (
    <ModusWcSideNavigation
      className="sidenav"
      collapseOnClickOutside={false}
      expanded={expanded}
      maxWidth="280px"
      mode="push"
      targetContent=".main"
    >
      <div className="sidenav-content">
        <ModusWcMenu size="md">
          {NAV_ITEMS.map((item) => (
            <ModusWcMenuItem
              key={item.id}
              label={item.label}
              value={item.id}
              selected={activeView === item.id}
              onItemSelect={() => onSelect(item.id)}
            >
              <AssetIcon slot="start-icon" className="sidenav-icon" src={item.icon} />
            </ModusWcMenuItem>
          ))}
        </ModusWcMenu>
      </div>
    </ModusWcSideNavigation>
  );
}
