import React, { useMemo } from 'react';
import { Search, Heart, Copy, Share2, Zap, ShieldCheck } from 'lucide-react';
import { Reveal } from './ui/Reveal';
import { Feature } from '../types';

const FEATURES: Feature[] = [
  {
    title: "Automatisch zoeken",
    description: "Vind direct de beste kortingscodes voor je favoriete webshops.",
    icon: Search
  },
  {
    title: "Favorieten",
    description: "Sla je favoriete merken op zodat je ze altijd bij de hand hebt.",
    icon: Heart
  },
  {
    title: "Eén tik kopiëren",
    description: "Kopieer codes direct naar je klembord en gebruik ze in de winkelmand.",
    icon: Copy
  },
  {
    title: "Delen met vrienden",
    description: "Heb je een goede deal gevonden? Deel hem eenvoudig via WhatsApp.",
    icon: Share2
  },
  {
    title: "Bliksemsnel",
    description: "Geen wachttijden, geen zware animaties. Kortio is gemaakt voor snelheid.",
    icon: Zap
  },
  {
    title: "Jouw data",
    description: "Jouw zoekgeschiedenis blijft op je telefoon. Wij verkopen niks.",
    icon: ShieldCheck
  }
];

export const Features: React.FC = () => {
  const features = useMemo(() => FEATURES, []);

  return (
    <section id="features" className="py-24 bg-white relative scroll-mt-24">
      <div className="container mx-auto px-6 md:px-12">

        <div className="max-w-2xl mx-auto text-center mb-16">
          <Reveal width="100%" direction="up">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Alles wat je nodig hebt om te besparen
            </h2>
            <p className="text-lg text-slate-500">
              Kortio is ontworpen met één doel: jou zo snel en makkelijk mogelijk korting laten vinden.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <Reveal key={idx} delay={idx * 100} width="100%">
                <div className="group p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-blue-100 hover:shadow-lg hover:shadow-blue-100/50 transition-all duration-300 h-full">
                  <div
                    className="w-12 h-12 bg-white rounded-2xl border border-slate-100 flex items-center justify-center mb-6 text-blue-600 group-hover:scale-110 transition-transform duration-300 shadow-sm"
                    aria-hidden="true"
                  >
                    <Icon size={24} strokeWidth={2} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                  <p className="text-slate-500 leading-relaxed">{feature.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

      </div>
    </section>
  );
};
