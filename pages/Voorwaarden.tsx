import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { SEO } from "../components/SEO";
const sections = [
  "Wie we zijn",
  "Wat Kortio doet",
  "Kortingscodes zijn niet gegarandeerd",
  "Aankopen en links naar webshops",
  "Gebruik van de app en website",
  "Merkaanmeldingen",
  "Merknamen en inhoud",
  "Aansprakelijkheid",
  "Wijzigingen en beëindiging",
  "Toepasselijk recht en contact",
];
export default function Voorwaarden() {
  return (
    <>
      <SEO
        title="Servicevoorwaarden — Kortio"
        description="De voorwaarden voor het gebruik van de Kortio-app en www.kortio.app."
        canonical="/voorwaarden"
        noindex
      />
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <section className="page-intro">
          <div className="site-container">
            <div className="breadcrumb">
              <Link to="/">Kortio</Link>
              <ChevronRight aria-hidden="true" />
              <span>Servicevoorwaarden</span>
            </div>
            <div className="section-label">Goed om te weten</div>
            <h1>
              Servicevoorwaarden.
              <br />
              <span>Kort en duidelijk.</span>
            </h1>
            <p className="section-copy">
              Deze voorwaarden gelden voor het gebruik van de Kortio-app (iOS en
              Android) en de website www.kortio.app.
            </p>
            <p className="section-copy">
              Kortio is een product van Bartio (eenmanszaak van Bart van
              Gemert), Vezelstraat 20, 5411 AP Zeeland, KvK 42025522. Hoe we met
              je gegevens omgaan, lees je in ons{" "}
              <Link to="/privacy">privacybeleid</Link>.
            </p>
            <p className="privacy-date">Laatst bijgewerkt: 25 november 2026</p>
          </div>
        </section>
        <section className="section">
          <div className="site-container privacy-layout">
            <nav
              className="privacy-nav"
              aria-label="Inhoud van de servicevoorwaarden"
            >
              {sections.map((title, i) => (
                <a href={`#privacy-${i + 1}`} key={title}>
                  {i + 1}. {title}
                </a>
              ))}
            </nav>
            <article className="privacy-content">
              <h2 id="privacy-1">1. Wie we zijn</h2>
              <p>
                Kortio wordt aangeboden door Bartio, eenmanszaak van Bart van
                Gemert, Vezelstraat 20, 5411 AP Zeeland, KvK 42025522. Je
                bereikt ons via{" "}
                <a href="mailto:info@kortio.app">info@kortio.app</a>.
              </p>
              <h2 id="privacy-2">2. Wat Kortio doet</h2>
              <p>
                Kortio verzamelt kortingscodes en aanbiedingen van webshops en
                merken, zodat je ze kunt vinden, bewaren en gebruiken. De app en
                de website zijn gratis. Je hebt geen account nodig.
              </p>
              <h2 id="privacy-3">3. Kortingscodes zijn niet gegarandeerd</h2>
              <p>
                We controleren codes zo goed mogelijk, maar webshops bepalen
                zelf of een code geldig is, hoe lang hij geldt en onder welke
                voorwaarden (zoals een minimaal bestelbedrag of uitgesloten
                producten). Een code kan daarom zonder bericht verlopen of niet
                werken. Werkt een code niet, meld het dan in de app; dan kijken
                we ernaar.
              </p>
              <h2 id="privacy-4">4. Aankopen en links naar webshops</h2>
              <p>
                Kortio verkoopt zelf niets en is geen partij bij je aankoop. Als
                je via Kortio een webshop opent, sluit je de overeenkomst met
                die webshop en gelden de voorwaarden, prijzen, levering,
                retourregels en het privacybeleid van die webshop. Vragen over
                een bestelling stel je aan de webshop.
              </p>
              <p>
                Sommige links naar webshops kunnen partnerlinks zijn. Kortio
                kan dan een vergoeding van de webshop ontvangen als je iets
                koopt. Dat kost jou niets extra en heeft geen invloed op de
                kortingscode.
              </p>
              <h2 id="privacy-5">5. Gebruik van de app en website</h2>
              <p>Je gebruikt Kortio voor persoonlijk, niet-commercieel gebruik. Het is niet toegestaan om:</p>
              <ul>
                <li>
                  codes of andere inhoud geautomatiseerd te verzamelen
                  (scrapen) of op grote schaal over te nemen;
                </li>
                <li>
                  de app, de website of de achterliggende systemen te
                  verstoren, te overbelasten of te proberen binnen te dringen;
                </li>
                <li>valse meldingen of misleidende merkaanmeldingen te doen.</li>
              </ul>
              <h2 id="privacy-6">6. Merkaanmeldingen</h2>
              <p>
                Meld je een merk of kortingscode aan, dan verklaar je dat je de
                gegevens mag delen en dat ze kloppen. Kortio beslist zelf of en
                hoe een merk of code wordt geplaatst en kan inhoud aanpassen of
                verwijderen.
              </p>
              <h2 id="privacy-7">7. Merknamen en inhoud</h2>
              <p>
                Merknamen en logo's zijn eigendom van de betreffende merken en
                worden alleen gebruikt om aan te geven op welke webshop een
                code betrekking heeft. Kortio is niet verbonden aan deze merken,
                tenzij dat er uitdrukkelijk bij staat. Het ontwerp, de teksten
                en de software van Kortio zijn eigendom van Bartio. Is een
                merkeigenaar het niet eens met een vermelding? Mail ons, dan
                passen we het aan of halen we het weg.
              </p>
              <h2 id="privacy-8">8. Aansprakelijkheid</h2>
              <p>
                Kortio wordt aangeboden zoals het is. We doen ons best om de app
                en website goed te laten werken, maar kunnen niet garanderen dat
                ze altijd beschikbaar en foutloos zijn. Bartio is niet
                aansprakelijk voor schade door een niet-werkende of verlopen
                code, of door het handelen van een webshop. Dit geldt niet als
                de schade het gevolg is van opzet of bewuste roekeloosheid van
                Bartio, of als de wet aansprakelijkheid niet laat beperken.
              </p>
              <h2 id="privacy-9">9. Wijzigingen en beëindiging</h2>
              <p>
                We kunnen Kortio en deze voorwaarden aanpassen. De actuele
                versie staat altijd op deze pagina, met de datum bovenaan. Je
                kunt op elk moment stoppen met Kortio door de app te
                verwijderen.
              </p>
              <h2 id="privacy-10">10. Toepasselijk recht en contact</h2>
              <p>
                Op deze voorwaarden is Nederlands recht van toepassing. Dat
                neemt je rechten als consument onder het recht van je eigen
                land niet weg. Vragen of klachten? Mail naar{" "}
                <a href="mailto:info@kortio.app">info@kortio.app</a>.
              </p>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
