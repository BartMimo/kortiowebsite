import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { SEO } from "../components/SEO";
export default function NotFound() {
  return (
    <>
      <SEO
        title="Pagina niet gevonden — Kortio"
        description="Deze pagina bestaat niet. Ontdek de merken in Kortio of ga terug naar de startpagina."
        noindex
      />
      <Navbar />
      <main
        id="main-content"
        tabIndex={-1}
        className="not-found site-container"
      >
        <div className="section-label">404 · Hier even geen korting</div>
        <h1 className="section-title">Deze pagina is zoek.</h1>
        <p className="section-copy">
          Gelukkig zijn je favoriete merken wel te vinden.
        </p>
        <Link to="/" className="button button-secondary">
          Naar de startpagina
        </Link>
        <Link to="/merken" className="button button-primary">
          Ontdek de merken
          <ArrowRight aria-hidden="true" />
        </Link>
      </main>
      <Footer />
    </>
  );
}
