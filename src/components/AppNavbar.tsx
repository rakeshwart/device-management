import { useEffect, useRef } from "react";
import {
  ModusWcNavbar,
  type INavbarVisibility,
} from "@trimble-oss/moduswebcomponents-react";
import { assetUrl } from "../assetUrl.ts";
import { NAVBAR_VISIBILITY } from "../nav.ts";
import { UserMenu } from "./UserMenu.tsx";

type AppNavbarProps = {
  navExpanded: boolean;
  onNavExpandedChange: (expanded: boolean) => void;
};

export function AppNavbar({
  navExpanded,
  onNavExpandedChange,
}: AppNavbarProps) {
  const navbarRef = useRef<HTMLModusWcNavbarElement>(null);

  useEffect(() => {
    const id = window.setTimeout(() => {
      const host = navbarRef.current;
      if (host) {
        host.mainMenuOpen = false;
      }
    }, 0);
    return () => window.clearTimeout(id);
  }, [navExpanded]);

  return (
    <ModusWcNavbar
      ref={navbarRef}
      mainMenuOpen={false}
      visibility={NAVBAR_VISIBILITY as INavbarVisibility}
      onMainMenuOpenChange={() => onNavExpandedChange(!navExpanded)}
    >
      <div slot="start" className="brand">
        <span className="icon-frame brand__emblem">
          <img src={assetUrl("assets/emblem.svg")} alt="" width={32} height={32} />
        </span>
        <div className="brand__name">
          <span className="icon-frame brand__wordmark">
            <img src={assetUrl("assets/wordmark.svg")} alt="Trimble" width={37} height={8} />
          </span>
          <p className="product-title">
            <span className="product-title__strong">Device</span>
            <span className="product-title__light">Management</span>
          </p>
        </div>
      </div>
      <div slot="end" className="navbar-end">
        <UserMenu />
      </div>
    </ModusWcNavbar>
  );
}
