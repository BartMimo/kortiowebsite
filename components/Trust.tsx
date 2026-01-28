import React from 'react';
import { Reveal } from './ui/Reveal';
import { XCircle, CheckCircle } from 'lucide-react';

export const Trust: React.FC = () => {
  return (
    <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          
          <div className="lg:w-1/2">
            <Reveal>
               <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                 Wij houden het graag simpel.
               </h2>
            </Reveal>
            <Reveal delay={100}>
               <p className="text-lg text-slate-300 mb-8 leading-relaxed max-w-lg">
                 De meeste kortingssites staan vol met pop-ups, trackers en verlopen codes. 
                 Kortio doet het anders. Wij focussen op wat belangrijk is: jou geld besparen.
               </p>
            </Reveal>
            
            <Reveal delay={200}>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                  <XCircle className="text-red-400 shrink-0" />
                  <span className="text-slate-200">Geen irritante pop-ups of nieuwsbrieven</span>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                  <XCircle className="text-red-400 shrink-0" />
                  <span className="text-slate-200">Geen accountregistratie verplicht</span>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                  <CheckCircle className="text-green-400 shrink-0" />
                  <span className="text-slate-200">Alleen gecontroleerde, actieve codes</span>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:w-1/2 w-full">
             <Reveal direction="left" delay={300}>
               <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700 shadow-2xl relative">
                  <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-4xl font-bold rotate-12 shadow-lg">
                    %
                  </div>
                  <div className="space-y-6">
                     <div className="h-4 w-1/3 bg-slate-700 rounded opacity-50"></div>
                     <div className="h-32 bg-slate-700/50 rounded-2xl flex items-center justify-center border-2 border-dashed border-slate-600">
                        <span className="text-slate-500 font-medium">Rust en overzicht</span>
                     </div>
                     <div className="space-y-3">
                        <div className="h-3 w-full bg-slate-700 rounded opacity-30"></div>
                        <div className="h-3 w-5/6 bg-slate-700 rounded opacity-30"></div>
                        <div className="h-3 w-4/6 bg-slate-700 rounded opacity-30"></div>
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