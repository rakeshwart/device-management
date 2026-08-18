import { useEffect, useRef } from "react";
import {
  ModusWcNavbar,
  type INavbarUserCard,
  type INavbarVisibility,
} from "@trimble-oss/moduswebcomponents-react";
import { assetUrl } from "../assetUrl.ts";
import { NAVBAR_VISIBILITY, USER_CARD } from "../nav.ts";

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
      userCard={USER_CARD as INavbarUserCard}
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
    </ModusWcNavbar>
  );
}
