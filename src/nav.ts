export type ViewName = "map" | "devices" | "geofences" | "alerts";

export const VIEW_TITLES: Record<ViewName, string> = {
  map: "Map",
  devices: "Devices",
  geofences: "Geofences",
  alerts: "Alerts",
};

export const NAV_ITEMS: { id: ViewName; label: string; icon: string }[] = [
  { id: "map", label: "Map", icon: "/assets/icon-map.svg" },
  { id: "devices", label: "Devices", icon: "/assets/icon-devices.svg" },
  { id: "geofences", label: "Geofences", icon: "/assets/icon-geofences.svg" },
  { id: "alerts", label: "Alerts", icon: "/assets/icon-alerts.svg" },
];

export const USER_CARD = {
  avatarAlt: "VS",
  email: "vs@trimble.com",
  name: "Victor Smith",
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
  user: true,
};
