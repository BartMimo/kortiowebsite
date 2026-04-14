import React from 'react';
import { AppStoreButton, PlayStoreButton } from './ui/AppStoreButton';
import { PhoneMockup } from './ui/PhoneMockup';
import adidasImg from '../assets/WhatsApp Image 2026-01-27 at 16.11.58.jpeg';
import { Reveal } from './ui/Reveal';
import { CheckCircle2 } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-gradient-to-b from-blue-50/50 via-white to-white">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24">
          
          <div className="w-full md:w-1/2 space-y-8 text-center md:text-left z-10">
            <Reveal>
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold tracking-wide uppercase mb-4 border border-blue-100">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                  Nu beschikbaar voor iOS & Android
               </div>
            </Reveal>
            
            <Reveal delay={100}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 leading-[1.1]">
                Snel korting vinden, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">zonder gedoe.</span>
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-lg md:text-xl text-slate-500 max-w-lg mx-auto md:mx-0 leading-relaxed">
                De slimste manier om kortingscodes te vinden, te bewaren en direct te gebruiken. Download Kortio en bespaar direct.
              </p>
            </Reveal>

            <Reveal delay={300}>
  <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
    <AppStoreButton className="w-full sm:w-auto" />
    <PlayStoreButton className="w-full sm:w-auto" />
  </div>
</Reveal>

            <Reveal delay={400}>
               <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4 text-sm text-slate-500">
                  <div className="flex items-center gap-1.5">
                     <CheckCircle2 size={16} className="text-green-500" />
                     <span>Geen account nodig</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                     <CheckCircle2 size={16} className="text-green-500" />
                     <span>Geen reclames</span>
                  </div>
               </div>
            </Reveal>
          </div>

          <div className="w-full md:w-1/2 relative flex justify-center md:justify-end">
             {/* Background Blob */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-200/20 rounded-full blur-3xl -z-10"></div>
             
             <Reveal direction="left" delay={500} className="relative z-10 transform md:rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
                <PhoneMockup imgSrc={adidasImg} alt="Kortio app — kortingscode voor Adidas kopiëren" />
                {/* Floating Card Element */}
                <div className="absolute -left-12 bottom-32 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 hidden lg:block animate-bounce" style={{ animationDuration: '3s' }}>
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold">€</div>
                      <div>
                         <div className="text-sm font-bold text-slate-900">Code Gekopieerd!</div>
                         <div className="text-xs text-slate-500">Bespaar direct 20%</div>
                      </div>
                   </div>
                </div>
             </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
};