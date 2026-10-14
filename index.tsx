import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import { CatalogContext } from "./components/CatalogProvider";
import type { Catalog } from "./lib/catalog";
import "./index.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const initial = document.getElementById("kortio-catalog");
const catalog: Catalog | null = initial
  ? JSON.parse(initial.textContent ?? "null")
  : null;
const app = (
  <React.StrictMode>
    <HelmetProvider>
      <CatalogContext.Provider value={catalog}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CatalogContext.Provider>
    </HelmetProvider>
  </React.StrictMode>
);
// Old snapshots can cross a coupon's expiry date. Mount afresh in that case.
const renderedDate = document.documentElement.dataset.renderedDate;
const today = new Date().toLocaleDateString("sv-SE", {
  timeZone: "Europe/Amsterdam",
});
if (rootElement.hasChildNodes() && renderedDate === today)
  ReactDOM.hydrateRoot(rootElement, app);
else ReactDOM.createRoot(rootElement).render(app);
