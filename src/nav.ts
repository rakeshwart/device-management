import { assetUrl } from "./assetUrl.ts";

export type ViewName = "map" | "devices" | "geofences" | "alerts";

export const SIDE_NAV_MAX_WIDTH = "280px";
export const SIDE_NAV_MIN_WIDTH = "4rem";

export const VIEW_TITLES: Record<ViewName, string> = {
  map: "Map",
  devices: "Devices",
  geofences: "Geofences",
  alerts: "Alerts",
};

export const NAV_ITEMS: { id: ViewName; label: string; icon: string }[] = [
  { id: "map", label: "Map", icon: assetUrl("assets/icon-map.svg") },
  { id: "devices", label: "Devices", icon: assetUrl("assets/icon-devices.svg") },
  { id: "geofences", label: "Geofences", icon: assetUrl("assets/icon-geofences.svg") },
  { id: "alerts", label: "Alerts", icon: assetUrl("assets/icon-alerts.svg") },
];

export const USER_CARD = {
  initials: "RT",
  email: "Rakeshwar_t@trimble.com",
  name: "Rakeshwar Thanagopal",
};

export const NAVBAR_VISIBILITY = {
  ai: false,
  apps: false,
  help: true,
  logo: false,
  mainMenu: true,
  notifications: false,
  search: true,
  searchInput: false,
  user: false,
};
