import { useLayoutEffect } from "react";
import {
  ModusWcMenu,
  ModusWcMenuItem,
  ModusWcSideNavigation,
} from "@trimble-oss/moduswebcomponents-react";
import { NAV_ITEMS, SIDE_NAV_MAX_WIDTH, SIDE_NAV_MIN_WIDTH, type ViewName } from "../nav.ts";
import { AssetIcon } from "./AssetIcon.tsx";

type AppSidenavProps = {
  expanded: boolean;
  activeView: ViewName;
  onSelect: (view: ViewName) => void;
};

function applyMainMargin(expanded: boolean) {
  const main = document.querySelector(".main");
  if (!(main instanceof HTMLElement)) {
    return;
  }
  main.style.marginLeft = expanded ? SIDE_NAV_MAX_WIDTH : SIDE_NAV_MIN_WIDTH;
}

export function AppSidenav({
  expanded,
  activeView,
  onSelect,
}: AppSidenavProps) {
  useLayoutEffect(() => {
    applyMainMargin(expanded);
    let innerId = 0;
    const outerId = window.requestAnimationFrame(() => {
      innerId = window.requestAnimationFrame(() => {
        applyMainMargin(expanded);
      });
    });
    return () => {
      window.cancelAnimationFrame(outerId);
      window.cancelAnimationFrame(innerId);
    };
  }, [expanded]);

  return (
    <ModusWcSideNavigation
      className="sidenav"
      collapseOnClickOutside={false}
      expanded={expanded}
      maxWidth={SIDE_NAV_MAX_WIDTH}
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
