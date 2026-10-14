import { useState } from "react";
import { ArrowRight, Heart, Layers, Search } from "lucide-react";
import { PhoneMockup } from "./ui/PhoneMockup";
const previews = [
  {
    id: "merken",
    icon: Search,
    title: "Vind je favoriete merk",
    text: "Zoeken, kiezen, klaar.",
    alt: "Kortio overzicht met merkzoekveld en kortingscodes",
  },
  {
    id: "favorieten",
    icon: Heart,
    title: "Bewaar je favorieten",
    text: "Volgende keer zo gevonden.",
    alt: "Kortio favorieten met opgeslagen merken",
  },
  {
    id: "mijn-codes",
    icon: Layers,
    title: "Houd je eigen codes bij",
    text: "Je eigen verzameling, privé.",
    alt: "Kortio met privé bewaarde eigen kortingscodes",
  },
];
export function Screenshots() {
  const [active, setActive] = useState(0);
  const preview = previews[active];
  return (
    <section id="screenshots" className="preview-section">
      <div className="site-container preview-layout">
        <div className="preview-copy">
          <div className="section-label">Fijn in je broekzak</div>
          <h2 className="section-title">
            Een kleine app.
            <br />
            Een lekker voordeel.
          </h2>
          <p className="section-copy">
            Alles wat je nodig hebt om een code te vinden en te bewaren.
            Overzichtelijk, snel en altijd bij de hand.
          </p>
          <div
            className="preview-tabs"
            role="group"
            aria-label="Bekijk de appschermen"
          >
            {previews.map(({ icon: Icon, title, text }, index) => (
              <button
                type="button"
                className="preview-tab"
                key={title}
                aria-pressed={active === index}
                aria-controls="app-preview"
                onClick={() => setActive(index)}
              >
                <Icon aria-hidden="true" />
                <span>
                  <strong>{title}</strong>
                  <small>{text}</small>
                </span>
                <ArrowRight className="tab-arrow" aria-hidden="true" />
              </button>
            ))}
          </div>
          <p className="preview-note">
            Echte schermen van de nieuwe iOS-versie, nu in voorbereiding.
            <br />
            De Android-versie kan er anders uitzien.
          </p>
        </div>
        <div className="preview-phones" id="app-preview" aria-live="polite">
          <PhoneMockup
            className="preview-main"
            imgSrc={`/images/app/${preview.id}.webp`}
            alt={preview.alt}
          />
          <PhoneMockup
            className="preview-secondary"
            imgSrc="/images/app/gekopieerd.webp"
            alt="Kortio bevestigt dat de code is gekopieerd en biedt de webshopknop aan"
          />
        </div>
      </div>
    </section>
  );
}
