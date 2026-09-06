/**
 * Blue Star Plastic Industries — FRP & GRC product catalogue.
 * Hash-based routing so deep links survive static hosting:
 *   #/                  → product register (home)
 *   #/p/<slug>          → one of the ten product landing pages
 */
import { useEffect } from "react";
import { HashRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import ProductPage from "./pages/Product";
import { WhatsAppFab } from "./lib/ui";

/** Jump to the top whenever the route changes. */
function ScrollTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <HashRouter>
      <ScrollTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/p/:slug" element={<ProductPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {/* floating WhatsApp button — fixed bottom-right on every page */}
      <WhatsAppFab />
      {/* fixed film-grain layer for a printed, non-flat surface */}
      <div className="noise-overlay" aria-hidden="true" />
    </HashRouter>
  );
}
