import { useEffect, useMemo, useState } from "react";
import {
  ModusWcButton,
  ModusWcTable,
} from "@trimble-oss/moduswebcomponents-react";
import type { ITableColumn } from "@trimble-oss/moduswebcomponents/components/modus-wc-table/modus-wc-table";
import { AssetIcon } from "./AssetIcon.tsx";

type GroupId = "all" | "group-2" | "group-3" | "group-4" | "group-5";

const GROUPS: { id: GroupId; name: string; count: string }[] = [
  { id: "all", name: "All Devices", count: "52 Devices" },
  { id: "group-2", name: "Group 2", count: "16 Devices" },
  { id: "group-3", name: "Group 3", count: "20 Devices" },
  { id: "group-4", name: "Group 4", count: "12 Devices" },
  { id: "group-5", name: "Group 5", count: "18 Devices" },
];

const DEVICE_ROWS: Record<string, unknown>[] = [
  { id: "1", name: "MBIRCH-NZ-LE", serial: "3140J023SQ", firmware: "4.2.1", available: "4.3.5" },
  { id: "2", name: "323F_Oli_Bench", serial: "1271J005TJ", firmware: "4.2.1", available: "4.3.5" },
  { id: "3", name: "323F_Oli_Bench", serial: "3100J024YU", firmware: "4.2.1", available: "4.3.5" },
  { id: "4", name: "Z2N01041", serial: "1731J140XT", firmware: "4.2.1", available: "4.3.5" },
  { id: "5", name: "HR-XL-TABLE", serial: "2140J012AB", firmware: "4.2.1", available: "4.3.5" },
  { id: "6", name: "A1-Drawer", serial: "1930J030CD", firmware: "4.2.1", available: "4.3.5" },
  { id: "7", name: "CT-Desk-Model", serial: "2134J004EF", firmware: "4.2.1", available: "4.3.5" },
  { id: "8", name: "M4-Table", serial: "1500J051GH", firmware: "4.2.1", available: "4.3.5" },
  { id: "9", name: "Nexus-Shelf", serial: "1211J083JI", firmware: "4.2.1", available: "4.3.5" },
  { id: "10", name: "X5-Round-Table", serial: "2301J067KL", firmware: "4.2.1", available: "4.3.5" },
  { id: "11", name: "O1-Conference-Table", serial: "1992J019MN", firmware: "4.2.1", available: "4.3.5" },
  { id: "12", name: "B2-Writing-Desk", serial: "1450J055OP", firmware: "4.2.1", available: "4.3.5" },
  { id: "13", name: "E3-Workstation", serial: "1756J032QR", firmware: "4.2.1", available: "4.3.5" },
  { id: "14", name: "Garnet-Table", serial: "1594J023ST", firmware: "4.2.1", available: "4.3.5" },
  { id: "15", name: "Garnet-Table", serial: "1594J023ST", firmware: "4.2.1", available: "4.3.5" },
];

function renderTypeIcon(): HTMLElement {
  const wrap = document.createElement("span");
  wrap.className = "devices-type-icon";
  const img = document.createElement("img");
  img.src = "/assets/icon-device-type.png";
  img.alt = "";
  img.width = 24;
  img.height = 24;
  wrap.appendChild(img);
  return wrap;
}

const DEVICE_COLUMNS: ITableColumn[] = [
  {
    id: "type",
    accessor: "type",
    header: "",
    width: "64px",
    cellRenderer: () => renderTypeIcon(),
  },
  { id: "name", accessor: "name", header: "Device Name" },
  { id: "serial", accessor: "serial", header: "Serial Number" },
  { id: "firmware", accessor: "firmware", header: "Current Firmware", width: "200px" },
  { id: "available", accessor: "available", header: "Available", width: "200px" },
];

export function DevicesPage() {
  const [selectedGroup, setSelectedGroup] = useState<GroupId>("all");
  const [tableReady, setTableReady] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setTableReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const columns = useMemo(() => DEVICE_COLUMNS, []);

  return (
    <div className="devices-page">
      <div className="devices-header">
        <h1 className="devices-title">Devices</h1>
        <div className="devices-toolbar">
          <ModusWcButton
            color="tertiary"
            shape="square"
            size="md"
            variant="outlined"
            aria-label="Search devices"
          >
            <AssetIcon src="/assets/icon-devices-search.svg" size={16} />
          </ModusWcButton>
          <ModusWcButton
            color="tertiary"
            shape="square"
            size="md"
            variant="outlined"
            aria-label="Filter devices"
          >
            <AssetIcon src="/assets/icon-devices-filter.svg" size={16} />
          </ModusWcButton>
          <ModusWcButton color="primary" size="md" variant="filled">
            Add
          </ModusWcButton>
        </div>
      </div>
      <div className="devices-body">
        <aside className="devices-groups" aria-label="Device groups">
          <div className="devices-groups-header">
            <h2 className="devices-groups-heading">Groups</h2>
            <ModusWcButton color="tertiary" size="xs" variant="outlined">
              New Group
            </ModusWcButton>
          </div>
          <button
            type="button"
            className={`devices-group-item${selectedGroup === "all" ? " is-selected" : ""}`}
            onClick={() => setSelectedGroup("all")}
          >
            <span className="devices-group-icon">
              <img src="/assets/icon-device-group.svg" alt="" width={21} height={22} />
            </span>
            <span className="devices-group-copy">
              <span className="devices-group-name">All Devices</span>
              <span className="devices-group-count">52 Devices</span>
            </span>
          </button>
          <div className="devices-group-section">Custom Groups</div>
          {GROUPS.filter((group) => group.id !== "all").map((group) => (
            <button
              key={group.id}
              type="button"
              className={`devices-group-item${selectedGroup === group.id ? " is-selected" : ""}`}
              onClick={() => setSelectedGroup(group.id)}
            >
              <span className="devices-group-icon">
                <img src="/assets/icon-device-group.svg" alt="" width={21} height={22} />
              </span>
              <span className="devices-group-copy">
                <span className="devices-group-name">{group.name}</span>
                <span className="devices-group-count">{group.count}</span>
              </span>
            </button>
          ))}
        </aside>
        <div className="devices-table-wrap">
          {tableReady ? (
            <ModusWcTable
              caption="Devices"
              columns={columns}
              data={DEVICE_ROWS}
              density="comfortable"
              hover
              mode="simple"
              selectable="multi"
            />
          ) : (
            <div className="devices-table-skeleton" aria-hidden />
          )}
        </div>
      </div>
    </div>
  );
}
