import React from 'react';
import { Reveal } from './ui/Reveal';
import img1 from '../assets/WhatsApp Image 2026-01-28 at 15.03.24 (1).jpeg';
import img2 from '../assets/WhatsApp Image 2026-01-28 at 15.03.24.jpeg';
import img3 from '../assets/WhatsApp Image 2026-01-27 at 16.11.58.jpeg';

const SCREENSHOTS = [
  {
    src: img1,
    alt: 'Kortio app — merkenlijst met zoekbalk en kortingscodes',
    delay: 0,
  },
  {
    src: img2,
    alt: 'Kortio app — detailpagina van een merk met kortingscode kopieerknop',
    delay: 100,
  },
  {
    src: img3,
    alt: 'Kortio app — eigen merken toevoegen en beheren',
    delay: 200,
  },
];

export const Screenshots: React.FC = () => {
  return (
    <section id="screenshots" className="py-24 bg-slate-50 overflow-hidden scroll-mt-24">
      <div className="container mx-auto px-6 md:px-12 mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <Reveal>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            Een blik in de app
          </h2>
        </Reveal>
        <Reveal delay={100} direction="left">
          <p className="text-slate-500 max-w-md text-left md:text-right">
            Simpel design. Duidelijke knoppen. <br className="hidden md:block" /> Geen overbodige menu's.
          </p>
        </Reveal>
      </div>

      <div
        className="relative w-full overflow-x-auto no-scrollbar pb-12 snap-x snap-mandatory px-6 md:px-12"
        role="region"
        aria-label="App screenshots"
      >
        <div className="flex gap-8 w-max mx-auto justify-center">
          {SCREENSHOTS.map(({ src, alt, delay }, i) => (
            <div
              key={i}
              className={`snap-center shrink-0 ${i === 0 ? 'pl-4 md:pl-0' : ''} ${i === SCREENSHOTS.length - 1 ? 'pr-4 md:pr-0' : ''}`}
            >
              <Reveal delay={delay} direction="up" className="h-full">
                <div className="w-[300px] h-[620px] bg-white rounded-[3rem] border-[10px] border-slate-900 shadow-2xl overflow-hidden relative transform hover:-translate-y-2 transition-transform duration-500 ring-1 ring-slate-900/5">
                  <img
                    src={src}
                    alt={alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
