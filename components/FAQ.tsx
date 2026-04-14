import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Reveal } from './ui/Reveal';
import { ChevronDown } from 'lucide-react';

const FAQS = [
  {
    question: 'Wat is Kortio?',
    answer:
      'Kortio is een gratis app waarmee je snel en eenvoudig kortingscodes vindt voor honderden Nederlandse webshops. Je opent de app, zoekt een merk en kopieert de code met één tik.',
  },
  {
    question: 'Is Kortio gratis te downloaden?',
    answer:
      'Ja, Kortio is volledig gratis. Er zijn geen abonnementskosten, geen verborgen kosten en geen reclames.',
  },
  {
    question: 'Voor welke toestellen is Kortio beschikbaar?',
    answer:
      'Kortio is beschikbaar voor iOS (iPhone, iPad — iOS 15 en hoger) en Android. Download de app via de App Store of Google Play.',
  },
  {
    question: 'Hoe weet ik of een kortingscode werkt?',
    answer:
      'Alle codes in Kortio zijn handmatig gecontroleerd en gemarkeerd als actief. Werkt een code toch niet? Je kunt dit direct in de app melden zodat we hem snel kunnen verwijderen.',
  },
  {
    question: 'Moet ik een account aanmaken?',
    answer:
      'Nee. Kortio werkt zonder account. Je favorieten en instellingen worden lokaal op je telefoon opgeslagen — wij hebben geen toegang tot jouw gegevens.',
  },
  {
    question: 'Hoe voeg ik mijn eigen merk toe aan Kortio?',
    answer:
      'Heb je een webshop en wil je jouw kortingscode aanbieden via Kortio? Vul dan het aanmeldformulier in op onze pagina "Merk toevoegen" en we nemen contact met je op.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map(({ question, answer }) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: { '@type': 'Answer', text: answer },
  })),
};

export const FAQ: React.FC = () => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 bg-slate-50 scroll-mt-24">
      <div className="container mx-auto px-6 md:px-12">
        <Helmet>
          <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        </Helmet>

        <div className="max-w-2xl mx-auto text-center mb-16">
          <Reveal width="100%" direction="up">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Veelgestelde vragen over Kortio
            </h2>
            <p className="text-lg text-slate-500">
              Alles wat je wilt weten over kortingscodes vinden met de Kortio app.
            </p>
          </Reveal>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {FAQS.map((faq, i) => (
            <Reveal key={i} delay={i * 60} width="100%">
              <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-2xl"
                  aria-expanded={open === i}
                >
                  <span className="text-base font-semibold text-slate-900 pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={20}
                    className={`shrink-0 text-slate-400 transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                  />
                </button>
                {open === i && (
                  <div className="px-6 pb-5 text-slate-600 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
