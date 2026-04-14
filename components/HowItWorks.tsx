import React from 'react';
import { Search, ClipboardCopy, ShoppingBag } from 'lucide-react';
import { Reveal } from './ui/Reveal';

export const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-24 bg-white scroll-mt-24">
      <div className="container mx-auto px-6 md:px-12">
        
        <div className="text-center mb-20">
          <Reveal width="100%">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Hoe werkt Kortio?</h2>
            <p className="text-lg text-slate-500">Besparen in drie simpele stappen.</p>
          </Reveal>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-slate-100 -z-10"></div>

          {/* Step 1 */}
          <Reveal delay={0} width="100%">
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-white rounded-full border-4 border-slate-50 shadow-xl flex items-center justify-center mb-8 relative" aria-hidden="true">
                 <div className="absolute -top-3 -right-3 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">1</div>
                 <Search className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Zoek een winkel</h3>
              <p className="text-slate-500 max-w-xs mx-auto">
                Typ de naam van je favoriete webshop in de zoekbalk.
              </p>
            </div>
          </Reveal>

          {/* Step 2 */}
          <Reveal delay={200} width="100%">
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-white rounded-full border-4 border-slate-50 shadow-xl flex items-center justify-center mb-8 relative" aria-hidden="true">
                 <div className="absolute -top-3 -right-3 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">2</div>
                 <ClipboardCopy className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Kopieer de code</h3>
              <p className="text-slate-500 max-w-xs mx-auto">
                Tik op de beste deal om de code direct naar je klembord te kopiëren.
              </p>
            </div>
          </Reveal>

          {/* Step 3 */}
          <Reveal delay={400} width="100%">
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-white rounded-full border-4 border-slate-50 shadow-xl flex items-center justify-center mb-8 relative" aria-hidden="true">
                 <div className="absolute -top-3 -right-3 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">3</div>
                 <ShoppingBag className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Gebruik & bespaar</h3>
              <p className="text-slate-500 max-w-xs mx-auto">
                Plak de code tijdens het afrekenen en zie de prijs dalen.
              </p>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
};