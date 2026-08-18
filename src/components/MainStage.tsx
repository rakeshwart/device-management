import { ModusWcButton, ModusWcPanel } from "@trimble-oss/moduswebcomponents-react";
import { VIEW_TITLES, type ViewName } from "../nav.ts";
import { AssetIcon } from "./AssetIcon.tsx";
import { DeviceMap } from "./DeviceMap.tsx";
import { DevicesPage } from "./DevicesPage.tsx";

type MainStageProps = {
  activeView: ViewName;
  panelOpen: boolean;
  onTogglePanel: () => void;
};

export function MainStage({
  activeView,
  panelOpen,
  onTogglePanel,
}: MainStageProps) {
  return (
    <main className="main">
      {activeView === "map" ? (
        <>
          <h1 className="page-title">{VIEW_TITLES[activeView]}</h1>
          <div className="map-stage">
            <DeviceMap />
            <ModusWcButton
              className={`collapse-button${panelOpen ? " is-open" : ""}`}
              color="neutral"
              shape="square"
              size="md"
              variant="outlined"
              onButtonClick={onTogglePanel}
            >
              <AssetIcon src="/assets/icon-collapse.svg" size={16} />
            </ModusWcButton>
            {panelOpen ? (
              <ModusWcPanel className="details-panel" height="100%" width="320px">
                <h2>Details</h2>
                <p>Select an asset on the map to inspect it.</p>
              </ModusWcPanel>
            ) : null}
          </div>
        </>
      ) : activeView === "devices" ? (
        <DevicesPage />
      ) : (
        <>
          <h1 className="page-title">{VIEW_TITLES[activeView]}</h1>
          <div className="placeholder">
            {VIEW_TITLES[activeView]} will appear here.
          </div>
        </>
      )}
    </main>
  );
}
