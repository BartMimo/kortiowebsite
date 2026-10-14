import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowDownToLine, Menu, X } from "lucide-react";
import { Logo } from "./ui/Logo";

const links = [
  { label: "Hoe het werkt", to: "/#how-it-works" },
  { label: "De app", to: "/#screenshots" },
  { label: "Alle merken", to: "/merken" },
  { label: "Merk aanmelden", to: "/merk-toevoegen" },
];
export function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash]);
  useEffect(() => {
    if (!open) return;
    menuRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const media = window.matchMedia("(min-width: 801px)");
    const onResize = () => {
      if (media.matches) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    media.addEventListener("change", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      media.removeEventListener("change", onResize);
    };
  }, [open]);
  return (
    <>
      <a href="#main-content" className="skip-link">
        Ga naar de inhoud
      </a>
      <header className="site-header">
        <div className="site-container header-inner">
          <Link
            className="wordmark"
            to="/"
            aria-label="Kortio — naar de startpagina"
          >
            <Logo />
            kortio
          </Link>
          <nav className="desktop-nav" aria-label="Hoofdnavigatie">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="nav-link"
                aria-current={
                  location.pathname === link.to ? "page" : undefined
                }
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Link
            to="/#download"
            className="button button-primary header-download"
          >
            Download de app
            <ArrowDownToLine size={15} aria-hidden="true" />
          </Link>
          <button
            ref={toggleRef}
            className="menu-toggle"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Menu sluiten" : "Menu openen"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
        {open && (
          <div
            ref={menuRef}
            className="site-container mobile-nav"
            id="mobile-menu"
          >
            <nav aria-label="Mobiele hoofdnavigatie" className="mobile-nav">
              {links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="nav-link"
                  aria-current={
                    location.pathname === link.to ? "page" : undefined
                  }
                >
                  {link.label}
                </Link>
              ))}
              <Link to="/#download" className="button button-primary">
                Download de app
                <ArrowDownToLine size={16} aria-hidden="true" />
              </Link>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
