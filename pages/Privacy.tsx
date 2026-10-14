import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { SEO } from "../components/SEO";
const sections = [
  "Gegevens die we verwerken",
  "Waarvoor we ze gebruiken",
  "Technische diensten",
  "Bewaren en verwijderen",
  "Beveiliging",
  "Vragen en verzoeken",
];
export default function Privacy() {
  return (
    <>
      <SEO
        title="Privacybeleid — Kortio"
        description="Lees hoe Kortio omgaat met appgebruik, favorieten en de gegevens die je bij een merkaanmelding of contact verstrekt."
        canonical="/privacy"
        noindex
      />
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <section className="page-intro">
          <div className="site-container">
            <div className="breadcrumb">
              <Link to="/">Kortio</Link>
              <ChevronRight aria-hidden="true" />
              <span>Privacybeleid</span>
            </div>
            <div className="section-label">Goed om te weten</div>
            <h1>
              Jouw privacy.
              <br />
              <span>Helder uitgelegd.</span>
            </h1>
            <p className="section-copy">
              Hier lees je welke gegevens Kortio gebruikt, waarom we dat doen en
              hoe je contact met ons kunt opnemen.
            </p>
            <p className="privacy-date">Laatst bijgewerkt: 14 oktober 2026</p>
          </div>
        </section>
        <section className="section">
          <div className="site-container privacy-layout">
            <nav
              className="privacy-nav"
              aria-label="Inhoud van het privacybeleid"
            >
              {sections.map((title, i) => (
                <a href={`#privacy-${i + 1}`} key={title}>
                  {i + 1}. {title}
                </a>
              ))}
            </nav>
            <article className="privacy-content">
              <h2 id="privacy-1">1. Gegevens die we verwerken</h2>
              <p>
                Je hoeft je niet met een naam of e-mailadres te registreren om
                Kortio te gebruiken. Voor de werking en verbetering van de app
                verwerken we wel technische en gebruiksgegevens.
              </p>
              <ul>
                <li>
                  <strong>Appgebruik:</strong> interacties zoals het bekijken
                  van merken, kopiëren van een code en melden van een code die
                  niet werkt.
                </li>
                <li>
                  <strong>Favorieten en technische identificatie:</strong>{" "}
                  gegevens waarmee de app je opgeslagen favorieten kan
                  terugvinden. Dit kan een technische toestel- of
                  gebruikersidentifier zijn.
                </li>
                <li>
                  <strong>Eigen codes en voorkeuren:</strong> codes die je privé
                  bewaart en lokale instellingen worden op je toestel
                  opgeslagen.
                </li>
                <li>
                  <strong>Downloads:</strong> wanneer je op een downloadknop op
                  de website klikt, kan het gekozen platform worden
                  geregistreerd.
                </li>
                <li>
                  <strong>Merkaanmeldingen en contact:</strong> als je een merk
                  aanmeldt, verwerken we de ingevulde merkgegevens, het
                  kortingsaanbod en je contact-e-mailadres. Een kopie van de
                  aanvraag wordt naar dat e-mailadres gestuurd.
                </li>
              </ul>
              <p>
                Voor het normale gebruik van Kortio vragen we niet om
                betaalgegevens of je precieze locatie. Kortio verwerkt zelf geen
                aankopen: je rekent af bij de webshop.
              </p>
              <h2 id="privacy-2">2. Waarvoor we ze gebruiken</h2>
              <p>
                We gebruiken deze gegevens om de app te laten werken, favorieten
                beschikbaar te maken, het gebruik van de app te begrijpen,
                niet-werkende codes te onderzoeken en merkaanmeldingen of vragen
                te behandelen.
              </p>
              <p>Kortio verkoopt of verhuurt jouw gegevens niet aan derden.</p>
              <h2 id="privacy-3">3. Technische diensten</h2>
              <p>
                Kortio maakt gebruik van technische dienstverleners. Supabase
                ondersteunt de database en appfunctionaliteit. De website wordt
                gehost via Vercel. Aanmeldingen worden via een e-maildienst naar
                Kortio gestuurd, met een kopie naar het opgegeven adres.
              </p>
              <p>
                Wanneer je een webshop of downloadlink opent, gelden daar de
                voorwaarden en het privacybeleid van die aanbieder. Deze externe
                diensten vallen buiten de werking van Kortio.
              </p>
              <h2 id="privacy-4">4. Bewaren en verwijderen</h2>
              <p>
                We bewaren gegevens niet langer dan nodig voor de werking van de
                app of het behandelen van je vraag of aanvraag. Lokale eigen
                codes en instellingen kun je verwijderen via de mogelijkheden in
                de app of door de app te verwijderen.
              </p>
              <p>
                Het verwijderen van de app verwijdert niet automatisch gegevens
                die eerder naar Kortio zijn verstuurd, zoals een merkaanmelding
                of opgeslagen gegevens op de server. Neem voor een verzoek om
                verwijdering contact met ons op.
              </p>
              <h2 id="privacy-5">5. Beveiliging</h2>
              <p>
                We nemen technische en organisatorische maatregelen om gegevens
                te beschermen tegen verlies, misbruik en onbevoegde toegang.
                Verstuur geen wachtwoorden, betaalgegevens of andere gevoelige
                informatie via het aanmeldformulier.
              </p>
              <h2 id="privacy-6">6. Vragen en verzoeken</h2>
              <p>
                Wil je weten welke gegevens we van je verwerken, wil je gegevens
                laten corrigeren of verwijderen, of heb je een vraag over dit
                beleid? Mail dan naar{" "}
                <a href="mailto:info@kortio.app">info@kortio.app</a>. Vermeld
                voldoende informatie om je vraag of aanvraag terug te vinden.
              </p>
              <p>
                Dit beleid kan veranderen wanneer de app of website verandert.
                De actuele versie staat op deze pagina.
              </p>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
