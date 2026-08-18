import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  ModusWcThemeProvider,
  setAssetPath,
} from "@trimble-oss/moduswebcomponents-react";
import "@trimble-oss/moduswebcomponents/modus-wc-styles.css";
import "./index.css";
import App from "./App.tsx";

const base = import.meta.env.BASE_URL || "/";
setAssetPath(
  `${window.location.origin}${base.endsWith("/") ? base : `${base}/`}`,
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ModusWcThemeProvider
      initialTheme={{ theme: "modus-modern", mode: "light" }}
    >
      <App />
    </ModusWcThemeProvider>
  </StrictMode>,
);
