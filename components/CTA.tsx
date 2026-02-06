import React from 'react';
import { AppStoreButton, PlayStoreButton } from './ui/AppStoreButton';
import { Reveal } from './ui/Reveal';

export const CTA: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <div className="bg-blue-50 rounded-[3rem] p-10 md:p-20 text-center relative overflow-hidden">
           {/* Decorative circles */}
           <div className="absolute top-0 left-0 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 -translate-x-1/2 -translate-y-1/2"></div>
           <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 translate-x-1/2 translate-y-1/2"></div>
           
           <div className="relative z-10 max-w-3xl mx-auto">
             <Reveal direction="up" width="100%">
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
                  Klaar om te besparen?
                </h2>
                <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed">
                  Download Kortio vandaag nog en mis nooit meer een kortingscode. <br className="hidden md:block"/>
                  Snel, simpel en volledig gratis.
                </p>
                
                <div className="flex flex-col items-center gap-4">
                   <div className="flex flex-col sm:flex-row gap-4">
                     <AppStoreButton className="scale-110 shadow-xl shadow-blue-200" />
                     <PlayStoreButton className="scale-110 shadow-xl shadow-green-200" />
                   </div>
                   <span className="mt-6 text-sm text-slate-400 font-medium">Versie 2.1 • iOS 15+ & Android</span>
                </div>
             </Reveal>
           </div>
        </div>
      </div>
    </section>
  );
};