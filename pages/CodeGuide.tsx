import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { SEO } from "../components/SEO";
import { CTA } from "../components/CTA";

const sections = [
  ["stappen", "Een code gebruiken"],
  ["voorwaarden", "Voorwaarden controleren"],
  ["werkt-niet", "Als de code niet werkt"],
  ["bewaren", "Codes vinden en bewaren"],
];
export default function CodeGuide() {
  return (
    <>
      <SEO
        title="Kortingscode gebruiken? Zo werkt het — Kortio"
        description="Leer hoe je een kortingscode vindt, kopieert en gebruikt bij het afrekenen. Bekijk de voorwaarden en wat je kunt doen als je code niet werkt."
        canonical="/kortingscode-gebruiken"
      />
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <section className="page-intro">
          <div className="site-container">
            <div className="breadcrumb">
              <Link to="/">Kortio</Link>
              <ChevronRight aria-hidden="true" />
              <span>Kortingscode gebruiken</span>
            </div>
            <div className="section-label">Van code naar korting</div>
            <h1>
              Kortingscode gebruiken?
              <br />
              <span>Zo werkt het.</span>
            </h1>
            <p className="section-copy">
              Een kortingscode plak je tijdens het afrekenen in de webshop. Hier
              lees je waar je op moet letten, zodat je de korting ziet voordat
              je bestelt.
            </p>
          </div>
        </section>
        <section className="section">
          <div className="site-container privacy-layout">
            <nav
              className="privacy-nav"
              aria-label="Inhoud van de kortingscode-uitleg"
            >
              {sections.map(([id, name]) => (
                <a key={id} href={`#${id}`}>
                  {name}
                </a>
              ))}
            </nav>
            <article className="privacy-content">
              <h2 id="stappen">Een kortingscode gebruiken in vier stappen</h2>
              <ol>
                <li>
                  <strong>Vind een code voor jouw webshop.</strong> Zoek je merk
                  in{" "}
                  <Link to="/merken">
                    het overzicht met gratis kortingscodes
                  </Link>{" "}
                  of in de Kortio-app. Lees de korting en eventuele voorwaarden.
                </li>
                <li>
                  <strong>Kopieer de hele code.</strong> Gebruik de kopieerknop.
                  Kies vervolgens ‘Naar de webshop’ en voeg de producten die je
                  wilt kopen toe aan je winkelmandje.
                </li>
                <li>
                  <strong>Plak de code bij het afrekenen.</strong> Zoek een veld
                  met een naam als ‘Kortingscode’, ‘Promotiecode’, ‘Voucher’ of
                  ‘Coupon’. Dit staat vaak in het winkelmandje of bij het
                  betaaloverzicht. Soms moet je het veld eerst openklappen.
                </li>
                <li>
                  <strong>Pas de code toe en controleer het bedrag.</strong>{" "}
                  Klik op ‘Toepassen’ of de vergelijkbare knop van de webshop.
                  Kijk of de korting in het totaalbedrag staat. Rond je
                  bestelling pas af als het bedrag klopt.
                </li>
              </ol>
              <p>
                De korting wordt door de webshop toegepast. Kortio rekent geen
                aankopen af en kan de uiteindelijke prijs van je bestelling niet
                aanpassen.
              </p>
              <h2 id="voorwaarden">
                Welke voorwaarden kan een kortingscode hebben?
              </h2>
              <p>
                Een code geldt niet altijd voor alles. Controleer bij het merk
                welke regels bij de actie horen. Veelvoorkomende voorwaarden
                zijn:
              </p>
              <ul>
                <li>
                  <strong>Een minimum bestelbedrag.</strong> Je winkelmandje
                  moet bijvoorbeeld een bepaald bedrag bereiken. De webshop
                  bepaalt of verzendkosten meetellen.
                </li>
                <li>
                  <strong>Een geldigheidsperiode.</strong> Een tijdelijke code
                  werkt alleen binnen de aangegeven periode.
                </li>
                <li>
                  <strong>Uitgesloten producten.</strong> Sale, bepaalde
                  collecties, cadeaukaarten of specifieke merken kunnen buiten
                  de actie vallen.
                </li>
                <li>
                  <strong>Alleen voor nieuwe klanten.</strong> Een welkomstcode
                  kan gekoppeld zijn aan je eerste bestelling of een specifiek
                  account.
                </li>
                <li>
                  <strong>Niet te combineren met andere acties.</strong> Veel
                  webshops accepteren maar één kortingscode per bestelling.
                </li>
              </ul>
              <h2 id="werkt-niet">
                Mijn kortingscode werkt niet. Wat kan ik doen?
              </h2>
              <p>
                Controleer eerst of je de volledige code hebt geplakt, zonder
                extra spatie. Bekijk daarna de einddatum, het minimum
                bestelbedrag en de producten in je winkelmandje. Een code kan
                ook al gebruikt zijn of alleen voor een bepaalde klantgroep
                gelden.
              </p>
              <p>
                Heb je al een andere actie toegepast? Kijk of de webshop die
                combinatie toestaat. Een mislukte code is geen reden om zonder
                controle af te rekenen: het betaaloverzicht van de webshop laat
                zien welke korting daadwerkelijk geldt.
              </p>
              <p>
                In de Kortio-app kun je melden dat een code niet werkt. Voor
                vragen over je bestelling of het toepassen van de korting kun je
                bij de webshop terecht. Een vermelding in Kortio garandeert niet
                dat iedere bestelling aan de actievoorwaarden voldoet.
              </p>
              <h2 id="bewaren">Waar vind en bewaar ik mijn kortingscodes?</h2>
              <p>
                Op de <Link to="/merken">merkenpagina</Link> kun je zoeken en
                filteren op categorie. Gebruik de gratis{" "}
                <Link to="/#download">Kortio-app voor iPhone of Android</Link>{" "}
                om merken als favoriet te bewaren en je eigen codes privé bij te
                houden.
              </p>
              <p>
                Een persoonlijke nieuwsbriefcode of eenmalige code kun je bij je
                eigen codes opslaan. Bewaar de voorwaarden erbij, zodat je later
                weet wanneer en waarvoor je hem kunt gebruiken.
              </p>
              <Link className="button button-primary" to="/merken">
                Vind een kortingscode
                <ArrowRight aria-hidden="true" />
              </Link>
            </article>
          </div>
        </section>
        <CTA />
      </main>
      <Footer />
    </>
  );
}
