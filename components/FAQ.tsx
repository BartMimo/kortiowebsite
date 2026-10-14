import { useState } from "react";
import { Plus } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
const faqs = [
  {
    question: "Wat is Kortio precies?",
    answer:
      "Kortio is een gratis app waarmee je kortingscodes van merken en webshops vindt. Je kunt merken bewaren als favoriet en je eigen codes privé bijhouden.",
  },
  {
    question: "Is Kortio echt gratis?",
    answer:
      "Ja. Je kunt Kortio gratis downloaden en de kortingscodes gratis bekijken en kopiëren. Je hebt geen betaald abonnement nodig.",
  },
  {
    question: "Werkt Kortio op mijn telefoon?",
    answer:
      "Kortio is beschikbaar voor iPhone via de App Store. Voor Android kun je de app direct downloaden als APK. Bij het installeren kan Android om toestemming vragen om apps van deze bron te installeren.",
  },
  {
    question: "Moet ik een account aanmaken?",
    answer:
      "Nee, je hoeft je niet te registreren om Kortio te gebruiken. Download de app en begin met zoeken.",
  },
  {
    question: "Hoe gebruik ik een kortingscode?",
    answer:
      "Kopieer de code in Kortio en open de webshop. Plak de code tijdens het afrekenen in het veld voor een kortings- of promotiecode. Controleer of de korting is toegepast voordat je bestelt.",
  },
  {
    question: "Waarom werkt een code soms niet?",
    answer:
      "Een code kan voorwaarden hebben, bijvoorbeeld een minimum bestelbedrag, een einddatum of een uitzondering voor bepaalde producten. Bekijk altijd de voorwaarden in de webshop. In de app kun je melden wanneer een code niet werkt.",
  },
  {
    question: "Kan ik mijn merk aanmelden?",
    answer:
      "Zeker. Vul het formulier op de pagina Merk aanmelden in. We zetten je merk, kortingscode en voorwaarden klaar in een e-mailconcept. Verstuur dit zelf; we bekijken je aanvraag voordat je merk in Kortio verschijnt.",
  },
];
export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="section" id="faq">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map(({ question, answer }) => ({
              "@type": "Question",
              name: question,
              acceptedAnswer: { "@type": "Answer", text: answer },
            })),
          })}
        </script>
      </Helmet>
      <div className="site-container faq-layout">
        <div>
          <div className="section-label">Goed om te weten</div>
          <h2 className="section-title">
            Even een
            <br />
            vraagje?
          </h2>
          <p className="section-copy">
            Hier vind je de antwoorden op de vragen die we vaker krijgen.
          </p>
          <p className="faq-contact">
            Staat je vraag er niet bij?
            <br />
            <a href="mailto:info@kortio.app">Mail ons gerust</a> of{" "}
            <Link to="/merk-toevoegen">meld je merk aan</Link>.
            <br />
            <Link to="/kortingscode-gebruiken">
              Lees hoe je een kortingscode gebruikt
            </Link>
            .
          </p>
        </div>
        <div className="faq-list">
          {faqs.map(({ question, answer }, i) => (
            <div className="faq-item" key={question}>
              <h3>
                <button
                  id={`faq-question-${i}`}
                  className="faq-question"
                  aria-expanded={open === i}
                  aria-controls={`faq-answer-${i}`}
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  {question}
                  <Plus aria-hidden="true" />
                </button>
              </h3>
              <div
                hidden={open !== i}
                id={`faq-answer-${i}`}
                aria-labelledby={`faq-question-${i}`}
                className="faq-answer"
              >
                {answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
