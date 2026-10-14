import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Check,
  ChevronRight,
  ClipboardCheck,
  Send,
  Mail,
  Store,
} from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { SEO } from "../components/SEO";
export default function MerkToevoegen() {
  const [error, setError] = useState("");
  const [mailDraft, setMailDraft] = useState("");
  const [draftValues, setDraftValues] = useState<Record<string, string>>({});
  const mailHeadingRef = useRef<HTMLHeadingElement>(null);
  function draft(payload: Record<string, string>) {
    setDraftValues(payload);
    const body = [
      "Hallo Kortio,",
      "",
      "Ik wil graag mijn merk aanmelden:",
      "",
      "Merknaam: " + payload.Merknaam,
      "Website: " + (payload.Website || "Niet opgegeven"),
      "Kortingscode: " + (payload.Merkcode || "Nog niet bekend"),
      "Korting en voorwaarden: " + payload.Omschrijving,
      "Geldigheidsperiode: " + (payload.Periode || "Niet opgegeven"),
      "Contact e-mailadres: " + payload.Email,
      "",
      "Met vriendelijke groet,",
      payload.Merknaam,
    ].join("\n");
    setMailDraft(
      "mailto:info@kortio.app?subject=" +
        encodeURIComponent("Merkaanmelding: " + payload.Merknaam) +
        "&body=" +
        encodeURIComponent(body),
    );
    requestAnimationFrame(() => mailHeadingRef.current?.focus());
  }
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload: Record<string, string> = {};
    data.forEach((value, key) => {
      payload[key] = String(value).trim();
    });
    if (!payload.Merknaam || !payload.Omschrijving || !payload.Email) {
      setError("Vul je merknaam, kortingsomschrijving en e-mailadres in.");
      return;
    }
    setError("");
    draft(payload);
  }
  return (
    <>
      <SEO
        title="Meld je merk aan — Kortio"
        description="Bied je merk en kortingscode aan via Kortio. Meld je webshop gratis aan. We bekijken je aanvraag voordat je merk in de app verschijnt."
        canonical="/merk-toevoegen"
      />
      <Navbar />
      <main id="main-content" tabIndex={-1} className="form-page">
        <div className="site-container">
          <div className="breadcrumb">
            <Link to="/">Kortio</Link>
            <ChevronRight aria-hidden="true" />
            <span>Merk aanmelden</span>
          </div>
          <div className="form-layout">
            <div className="form-intro">
              <div className="section-label">Voor merken &amp; webshops</div>
              <h1>
                Jouw merk.
                <br />
                <span>Een fijne match.</span>
              </h1>
              <p className="section-copy">
                Laat shoppers jouw merk ontdekken met een mooie korting. Meld je
                webshop gratis aan en vertel ons wat je aanbiedt.
              </p>
              <div className="form-info-list">
                <div>
                  <Store aria-hidden="true" />
                  <span>
                    <strong>Gratis aanmelden</strong>
                    <p>Stuur je merk en je kortingsaanbod in.</p>
                  </span>
                </div>
                <div>
                  <ClipboardCheck aria-hidden="true" />
                  <span>
                    <strong>Eerst even bekijken</strong>
                    <p>
                      We controleren je aanvraag voordat je merk verschijnt.
                    </p>
                  </span>
                </div>
                <div>
                  <Check aria-hidden="true" />
                  <span>
                    <strong>Goed gevonden</strong>
                    <p>Help gebruikers je merk te ontdekken via Kortio.</p>
                  </span>
                </div>
              </div>
              <p className="form-contact">
                Liever eerst even overleggen?
                <br />
                <a href="mailto:info@kortio.app">info@kortio.app</a>
              </p>
            </div>
            <div className="form-card">
              {mailDraft ? (
                <div className="form-success">
                  <Mail aria-hidden="true" />
                  <h2 ref={mailHeadingRef} tabIndex={-1}>
                    Je aanvraag staat klaar.
                  </h2>
                  <p>
                    Open je e-mailprogramma, controleer de ingevulde gegevens en
                    verstuur je aanvraag naar info@kortio.app.
                  </p>
                  <a href={mailDraft} className="button button-primary">
                    Open e-mailprogramma
                    <ArrowRight aria-hidden="true" />
                  </a>
                  <button
                    className="text-link"
                    style={{ marginTop: 20 }}
                    onClick={() => setMailDraft("")}
                  >
                    Gegevens aanpassen
                  </button>
                  <label className="mail-draft-label" htmlFor="mail-draft-text">
                    Je aanvraagtekst
                  </label>
                  <textarea
                    id="mail-draft-text"
                    className="mail-draft-text"
                    readOnly
                    rows={7}
                    value={decodeURIComponent(
                      mailDraft.split("&body=")[1] || "",
                    )}
                  />
                  <p className="mail-ready-note">
                    Je aanvraag is nog niet verzonden. Geen e-mailprogramma
                    ingesteld? Mail de gegevens zelf naar info@kortio.app.
                  </p>
                </div>
              ) : (
                <>
                  <h2>Vertel ons over je merk.</h2>
                  <p className="form-card-subtitle">
                    Velden met * zijn verplicht. Een code kun je ook later
                    aanleveren.
                  </p>
                  <p className="form-delivery-note">
                    <Mail size={17} aria-hidden="true" />
                    <span>
                      Je verstuurt de aanvraag via je eigen e-mailprogramma. We
                      zetten de ingevulde gegevens voor je klaar.
                    </span>
                  </p>
                  <form onSubmit={submit}>
                    <fieldset className="form-fields">
                      <div className="field field-full">
                        <label htmlFor="brand-name">Merknaam *</label>
                        <input
                          id="brand-name"
                          name="Merknaam"
                          defaultValue={draftValues.Merknaam ?? ""}
                          placeholder="Bijvoorbeeld: jouw webshop"
                          autoComplete="organization"
                          maxLength={120}
                          required
                        />
                      </div>
                      <div className="field">
                        <label htmlFor="brand-website">
                          Website <span>optioneel</span>
                        </label>
                        <input
                          id="brand-website"
                          name="Website"
                          defaultValue={draftValues.Website ?? ""}
                          placeholder="www.jouwmerk.nl"
                          inputMode="url"
                          autoComplete="url"
                          maxLength={500}
                        />
                      </div>
                      <div className="field">
                        <label htmlFor="brand-code">
                          Kortingscode <span>optioneel</span>
                        </label>
                        <input
                          id="brand-code"
                          name="Merkcode"
                          defaultValue={draftValues.Merkcode ?? ""}
                          placeholder="Bijvoorbeeld KORTIO10"
                          autoCapitalize="none"
                          autoCorrect="off"
                          spellCheck={false}
                          maxLength={150}
                        />
                        <p>Laat leeg als de code nog niet bekend is.</p>
                      </div>
                      <div className="field field-full">
                        <label htmlFor="brand-offer">
                          Korting &amp; voorwaarden *
                        </label>
                        <textarea
                          id="brand-offer"
                          name="Omschrijving"
                          defaultValue={draftValues.Omschrijving ?? ""}
                          rows={3}
                          required
                          maxLength={3000}
                          placeholder="Bijvoorbeeld: 10% korting vanaf €50. Geldig op het hele assortiment, behalve sale."
                        />
                      </div>
                      <div className="field field-full">
                        <label htmlFor="brand-period">
                          Geldigheidsperiode <span>optioneel</span>
                        </label>
                        <input
                          id="brand-period"
                          name="Periode"
                          defaultValue={draftValues.Periode ?? ""}
                          placeholder="Bijvoorbeeld: doorlopend of 1 t/m 31 december"
                          maxLength={250}
                        />
                      </div>
                      <div className="field field-full">
                        <label htmlFor="brand-email">
                          Contact e-mailadres *
                        </label>
                        <input
                          id="brand-email"
                          name="Email"
                          defaultValue={draftValues.Email ?? ""}
                          type="email"
                          autoComplete="email"
                          placeholder="jij@jouwmerk.nl"
                          maxLength={254}
                          required
                        />
                        <p>Voor contact over je aanvraag.</p>
                      </div>
                    </fieldset>
                    {error && (
                      <p className="form-error" role="alert">
                        {error}
                      </p>
                    )}
                    <div className="form-actions">
                      <p>
                        We gebruiken je gegevens voor deze aanvraag. Lees ons{" "}
                        <Link to="/privacy">privacybeleid</Link>.
                      </p>
                      <button className="button button-primary" type="submit">
                        Zet aanvraag klaar
                        <Send aria-hidden="true" />
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
