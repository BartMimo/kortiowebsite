import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { AppStoreButton, PlayStoreButton } from "./ui/AppStoreButton";
import { PhoneMockup } from "./ui/PhoneMockup";
export function Hero() {
  return (
    <section className="hero">
      <div className="site-container hero-grid">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="eyebrow-dot" />
            Meer korting. Minder gedoe.
          </div>
          <h1>
            Leuk gevonden.
            <br />
            <span>Slim bespaard.</span>
          </h1>
          <p className="hero-description">
            Je favoriete merken, met een beetje extra voordeel. Vind een
            kortingscode, kopieer ’m en shop lekker verder.
          </p>
          <div className="download-buttons">
            <AppStoreButton />
            <PlayStoreButton />
          </div>
          <ul className="hero-benefits">
            <li>
              <Check aria-hidden="true" />
              Helemaal gratis
            </li>
            <li>
              <Check aria-hidden="true" />
              Geen registratie nodig
            </li>
            <li>
              <Check aria-hidden="true" />
              iOS &amp; Android
            </li>
          </ul>
          <p className="hero-browse">
            Eerst even rondkijken?
            <Link to="/merken">
              Ontdek de merken
              <ArrowRight aria-hidden="true" />
            </Link>
          </p>
        </div>
        <div className="hero-visual">
          <div className="hero-orbit" aria-hidden="true" />
          <div className="hero-sticker" aria-hidden="true">
            Een beetje
            <br />
            slimmer
            <br />
            shoppen.
          </div>
          <PhoneMockup
            imgSrc="/images/app/merken.webp"
            alt="Voorproefje van Kortio: zoek een merk en bekijk de kortingscodes"
            eager
          />
          <div className="floating-note" aria-hidden="true">
            <div className="note-check">
              <Check size={21} />
            </div>
            <div>
              <strong>Code gekopieerd.</strong>
              <small>Klaar voor je winkelmandje.</small>
            </div>
          </div>
          <p className="visual-caption">Voorproefje van de nieuwe iOS-look.</p>
        </div>
      </div>
    </section>
  );
}
