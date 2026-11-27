import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { SEO } from "../components/SEO";
import { CTA } from "../components/CTA";

// Wie zit erachter, waar komen de codes vandaan en hoe verdient Kortio: vertrouwenssignalen die
// Google (en bezoekers) zoeken bij sites over aankopen.
const sections = [
  ["wat", "Wat is Kortio"],
  ["bronnen", "Waar de codes vandaan komen"],
  ["testen", "Hoe we codes testen"],
  ["werkt-niet", "Werkt een code niet?"],
  ["verdienen", "Hoe Kortio geld verdient"],
  ["wie", "Wie zit erachter"],
];
export default function OverKortio() {
  return (
    <>
      <SEO
        title="Over Kortio: zo vinden en testen we kortingscodes"
        description="Kortio is een Nederlandse app en website met gratis kortingscodes. Lees waar de codes vandaan komen, hoe we ze testen en hoe Kortio geld verdient."
        canonical="/over-kortio"
        pageType="AboutPage"
        breadcrumbs={[{ name: "Over Kortio" }]}
      />
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <section className="page-intro">
          <div className="site-container">
            <nav className="breadcrumb" aria-label="Kruimelpad">
              <Link to="/">Kortio</Link>
              <ChevronRight aria-hidden="true" />
              <span>Over Kortio</span>
            </nav>
            <div className="section-label">Over ons</div>
            <h1>
              Over Kortio.
              <br />
              <span>Kortingscodes zonder gedoe.</span>
            </h1>
            <p className="section-copy">
              Kortio is een Nederlandse app en website met kortingscodes van webshops en merken.
              Je ziet de code, kopieert hem met één tik en plakt hem bij het afrekenen. Gratis en
              zonder account.
            </p>
          </div>
        </section>
        <section className="section">
          <div className="site-container privacy-layout">
            <nav className="privacy-nav" aria-label="Inhoud van deze pagina">
              {sections.map(([id, name]) => (
                <a key={id} href={`#${id}`}>
                  {name}
                </a>
              ))}
            </nav>
            <article className="privacy-content">
              <h2 id="wat">Wat is Kortio</h2>
              <p>
                Op Kortio vind je per merk een actuele kortingscode, met de korting, eventuele
                voorwaarden en, als we hem zelf hebben getest, de testdatum. Je kunt zoeken op
                merk of bladeren per categorie, zoals{" "}
                <Link to="/kortingscodes/mode">mode</Link>,{" "}
                <Link to="/kortingscodes/sport">sport</Link> en{" "}
                <Link to="/kortingscodes/beauty">beauty</Link>. In de gratis app voor iPhone en
                Android bewaar je je favoriete merken en je eigen codes.
              </p>
              <h2 id="bronnen">Waar de codes vandaan komen</h2>
              <p>
                We verzamelen kortingscodes van merken zelf, via partnerprogramma's van webshops
                en uit openbare bronnen, zoals nieuwsbrieven, sociale media, acties op de site van
                het merk en andere overzichten van kortingscodes. Merken kunnen hun code ook zelf
                aanmelden via <Link to="/merk-toevoegen">Merk aanmelden</Link>.
              </p>
              <h2 id="testen">Hoe we codes testen</h2>
              <p>
                Een deel van de codes testen we zelf: we controleren in de webshop of de code wordt
                geaccepteerd en welke korting hij geeft. Bij die codes staat "getest op" met de
                datum. Staat er geen testdatum, dan hebben we de code nog niet zelf getest.
              </p>
              <p>
                Tijdelijke codes verdwijnen vanzelf uit het overzicht na hun einddatum. De pagina
                van het merk blijft bestaan en meldt dat er een nieuwe code volgt.
              </p>
              <h2 id="werkt-niet">Werkt een code niet?</h2>
              <p>
                Meld het in de app of mail naar{" "}
                <a href="mailto:info@kortio.app">info@kortio.app</a>. We kijken het na en halen
                een code die niet meer werkt weg of vervangen hem. Lees ook{" "}
                <Link to="/kortingscode-gebruiken#werkt-niet">
                  wat je kunt doen als een kortingscode niet werkt
                </Link>
                .
              </p>
              <h2 id="verdienen">Hoe Kortio geld verdient</h2>
              <p>
                Kortio is gratis. Bij een deel van de webshops ontvangen we een vergoeding als je
                via onze link iets bestelt. Dat kost jou niets extra en je betaalt dezelfde prijs.
              </p>
              <h2 id="wie">Wie zit erachter</h2>
              <p>
                Kortio is een product van Bartio, de eenmanszaak van Bart van Gemert, gevestigd in
                Zeeland (Noord-Brabant) en ingeschreven bij de KvK onder nummer 42025522. Vragen of
                een merk aanmelden? Mail naar <a href="mailto:info@kortio.app">info@kortio.app</a>.
              </p>
              <p>
                Lees ook ons <Link to="/privacy">privacybeleid</Link> en de{" "}
                <Link to="/voorwaarden">servicevoorwaarden</Link>.
              </p>
            </article>
          </div>
        </section>
        <CTA />
      </main>
      <Footer />
    </>
  );
}
