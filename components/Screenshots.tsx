import React from 'react';
import { Reveal } from './ui/Reveal';
import img1 from '../assets/WhatsApp Image 2026-01-28 at 15.03.24 (1).jpeg';
import img2 from '../assets/WhatsApp Image 2026-01-28 at 15.03.24.jpeg';
import img3 from '../assets/WhatsApp Image 2026-01-27 at 16.11.58.jpeg';
import { 
  Search, Heart, Settings, Plus, ChevronLeft, 
  Share, Globe, Copy, Tag, Dumbbell, Shirt, 
  Utensils, Smartphone, Sparkles, Bookmark
} from 'lucide-react';

// --- Helper: Scaled Wrapper ---
// Dit zorgt ervoor dat de content in de telefoon kleiner (realistischer) wordt weergegeven
const ScaledContent = ({ children }: { children?: React.ReactNode }) => (
  <div className="w-[125%] h-[125%] origin-top-left transform scale-80 font-sans">
    {children}
  </div>
);

// --- Reusable UI Components for the Mockups ---

const StatusBar = () => (
  <div className="h-8 w-full flex justify-between items-center px-6 text-[12px] font-semibold text-slate-900 select-none pt-2">
    <span>16:08</span>
    <div className="flex gap-1.5 items-center">
      <div className="h-2.5 w-4 bg-slate-900 rounded-[2px] opacity-20"></div>
      <div className="h-2.5 w-4 bg-slate-900 rounded-[2px] opacity-20"></div>
      <div className="h-2.5 w-6 bg-slate-900 rounded-[2px]"></div>
    </div>
  </div>
);

const TabBar = ({ activeTab = 'merken' }: { activeTab?: 'merken' | 'favorieten' | 'eigen' | 'instellingen' }) => (
  <div className="absolute bottom-0 left-0 right-0 h-[90px] bg-white border-t border-slate-100 flex items-start pt-3 justify-around px-2 text-[11px] font-medium text-slate-400 select-none pb-4">
    <div className={`flex flex-col items-center gap-1 ${activeTab === 'merken' ? 'text-blue-600' : ''}`}>
      <div className={`p-1 rounded-xl ${activeTab === 'merken' ? 'bg-blue-50' : ''}`}>
        <Tag size={24} fill={activeTab === 'merken' ? "currentColor" : "none"} />
      </div>
      <span>Merken</span>
    </div>
    <div className={`flex flex-col items-center gap-1 ${activeTab === 'favorieten' ? 'text-blue-600' : ''}`}>
      <Heart size={24} />
      <span>Favorieten</span>
    </div>
    <div className={`flex flex-col items-center gap-1 ${activeTab === 'eigen' ? 'text-blue-600' : ''}`}>
      <div className={`p-1 rounded-xl ${activeTab === 'eigen' ? 'bg-blue-50' : ''}`}>
        <div className="relative">
          <Plus size={14} className="absolute -top-1 -right-1 bg-slate-900 text-white rounded-full p-0.5" strokeWidth={3} />
          <Bookmark size={24} fill={activeTab === 'eigen' ? "currentColor" : "none"} />
        </div>
      </div>
      <span>Eigen</span>
    </div>
    <div className={`flex flex-col items-center gap-1 ${activeTab === 'instellingen' ? 'text-blue-600' : ''}`}>
      <Settings size={24} />
      <span>Instellingen</span>
    </div>
    {/* Home Indicator */}
    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-slate-900 rounded-full opacity-20"></div>
  </div>
);

// --- Screen 1: Brand List ---

const BrandRow = ({ name, discount, color, icon: Icon, filledHeart = false }: any) => (
  <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-50 shadow-sm mb-3">
    <div className="flex items-center gap-4">
      <div className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center text-slate-700`}>
        <Icon size={22} />
      </div>
      <div>
        <div className="font-bold text-slate-900 text-sm">{name}</div>
        <div className="text-slate-500 text-xs mt-0.5">{discount}</div>
      </div>
    </div>
    <Heart 
      size={20} 
      className={filledHeart ? "text-red-500 fill-red-500" : "text-slate-300"} 
    />
  </div>
);

const ScreenBrandList = () => (
  <ScaledContent>
    <div className="h-full bg-slate-50 flex flex-col pt-10 relative overflow-hidden font-sans">
      <StatusBar />
      <div className="px-6 pt-2 pb-4">
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
             <Search size={18} />
          </div>
          <div className="w-full bg-slate-200/50 h-11 rounded-xl pl-10 flex items-center text-sm text-slate-500 font-medium">
            Zoek merk...
          </div>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 p-1.5 bg-white rounded-lg shadow-sm">
             <Tag size={14} />
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-6 pb-28 no-scrollbar">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 pl-1">Populair</h3>
        <BrandRow name="Gymshark" discount="10% korting" color="bg-orange-100" icon={Dumbbell} />
        <BrandRow name="Upfront" discount="10% korting" color="bg-orange-100" icon={Dumbbell} filledHeart />
        <BrandRow name="NA-KD" discount="10% korting" color="bg-purple-100" icon={Shirt} />
        <BrandRow name="XXL Nutrition" discount="15% Korting" color="bg-green-100" icon={Utensils} />
        <BrandRow name="IDEAL of Sweden" discount="15% Korting" color="bg-blue-100" icon={Smartphone} />
        <BrandRow name="Visiondirect" discount="10% Korting" color="bg-pink-100" icon={Sparkles} filledHeart />
        <BrandRow name="Tess V" discount="15% Korting" color="bg-purple-100" icon={Shirt} />
      </div>
      <TabBar activeTab="merken" />
    </div>
  </ScaledContent>
);

// --- Screen 2: Adidas Detail ---

const ScreenDetail = () => (
  <ScaledContent>
    <div className="h-full bg-white flex flex-col pt-10 relative overflow-hidden font-sans">
      <StatusBar />
      <div className="px-6 py-2 flex items-center">
        <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center -ml-2">
          <ChevronLeft size={24} className="text-slate-900" />
        </div>
      </div>
      
      <div className="flex-1 flex flex-col items-center px-6 pt-4">
        <div className="w-24 h-24 bg-orange-50 rounded-[2rem] flex items-center justify-center mb-6 relative">
           <div className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-sm">
              <Heart size={14} className="text-red-500 fill-red-500" />
           </div>
           <Dumbbell size={40} className="text-orange-500" />
        </div>
        
        <h3 className="text-2xl font-bold text-slate-900 mb-8">Adidas</h3>
        
        <div className="w-full border-2 border-dashed border-orange-200 bg-orange-50/50 rounded-2xl p-8 text-center mb-4 relative">
          <div className="text-2xl font-mono font-bold text-slate-900 tracking-wider">ADIDAS20</div>
          {/* Cutout circles for coupon look */}
          <div className="absolute top-1/2 -left-2.5 w-5 h-5 bg-white rounded-full -translate-y-1/2"></div>
          <div className="absolute top-1/2 -right-2.5 w-5 h-5 bg-white rounded-full -translate-y-1/2"></div>
        </div>
        
        <div className="text-slate-400 text-sm mb-12 font-medium">Geverifieerd • 20% korting</div>
        
        <button className="w-full bg-orange-500 text-white font-bold py-4 rounded-2xl shadow-lg shadow-orange-200 flex items-center justify-center gap-2 mb-6 transform active:scale-95 transition-transform">
          <Copy size={20} />
          Code kopiëren
        </button>
        
        <div className="flex gap-4 w-full mb-8">
          <button className="flex-1 bg-slate-50 text-blue-600 font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2">
             <Share size={18} /> Deel
          </button>
          <button className="flex-1 bg-slate-50 text-blue-600 font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2">
             <Globe size={18} /> Website
          </button>
        </div>
        
        <div className="text-red-500 text-xs font-medium bg-red-50 px-3 py-1 rounded-full">Code werkt niet? Melden</div>
      </div>
      
      <TabBar activeTab="merken" />
    </div>
  </ScaledContent>
);

// --- Screen 3: Own Brands (Empty State) ---

const ScreenOwnBrands = () => (
  <ScaledContent>
    <div className="h-full bg-white flex flex-col pt-10 relative overflow-hidden font-sans">
      <StatusBar />
      <div className="px-6 py-4 flex justify-end">
         <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center shadow-sm">
           <Plus size={24} className="text-slate-900" />
         </div>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center px-10 -mt-20">
        <div className="mb-6 relative">
          <div className="absolute inset-0 bg-blue-100 rounded-full blur-xl opacity-50"></div>
          <Bookmark size={80} strokeWidth={1} className="text-slate-400 relative z-10" />
        </div>
        
        <h3 className="text-xl font-bold text-slate-900 mb-3">Je eigen merken</h3>
        <p className="text-slate-500 text-center mb-8 leading-relaxed text-sm">
          Voeg je eigen kortingscodes toe. Ze blijven privé en zien er net zo uit als normale merken.
        </p>
        
        <button className="bg-blue-600 text-white font-bold py-3.5 px-8 rounded-xl shadow-lg shadow-blue-200 text-sm">
          Nieuw merk toevoegen
        </button>
      </div>
      
      <TabBar activeTab="eigen" />
    </div>
  </ScaledContent>
);

// --- Main Component ---

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
             Simpel design. Duidelijke knoppen. <br className="hidden md:block"/> Geen overbodige menu's.
          </p>
        </Reveal>
      </div>

      <div className="relative w-full overflow-x-auto no-scrollbar pb-12 snap-x snap-mandatory px-6 md:px-12">
        <div className="flex gap-8 w-max mx-auto justify-center">
          
          {/* Mockup 1: Brand List */}
          <div className="snap-center shrink-0 pl-4 md:pl-0">
             <Reveal delay={0} direction="up" className="h-full">
                 <div className="w-[300px] h-[620px] bg-white rounded-[3rem] border-[10px] border-slate-900 shadow-2xl overflow-hidden relative transform hover:-translate-y-2 transition-transform duration-500 ring-1 ring-slate-900/5">
                   <img src={img1} alt="Screenshot 1" className="w-full h-full object-cover" />
                 </div>
             </Reveal>
          </div>

          {/* Mockup 2: Detail */}
          <div className="snap-center shrink-0">
             <Reveal delay={100} direction="up" className="h-full">
                 <div className="w-[300px] h-[620px] bg-white rounded-[3rem] border-[10px] border-slate-900 shadow-2xl overflow-hidden relative transform hover:-translate-y-2 transition-transform duration-500 ring-1 ring-slate-900/5">
                   <img src={img2} alt="Screenshot 2" className="w-full h-full object-cover" />
                 </div>
             </Reveal>
          </div>

          {/* Mockup 3: Own Brands */}
          <div className="snap-center shrink-0 pr-4 md:pr-0">
             <Reveal delay={200} direction="up" className="h-full">
                 <div className="w-[300px] h-[620px] bg-white rounded-[3rem] border-[10px] border-slate-900 shadow-2xl overflow-hidden relative transform hover:-translate-y-2 transition-transform duration-500 ring-1 ring-slate-900/5">
                   <img src={img3} alt="Screenshot 3" className="w-full h-full object-cover" />
                 </div>
             </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
};