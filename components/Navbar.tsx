import React, { useState, useEffect } from 'react';
import { AppStoreButton } from './ui/AppStoreButton';
import { Logo } from './ui/Logo';
import { Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault(); // Dit is cruciaal: het voorkomt dat de browser de URL probeert te veranderen
    const element = document.getElementById(id);
    if (element) {
      // We berekenen de positie handmatig om rekening te houden met de vaste header
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        scrolled || mobileMenuOpen ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
      }`}>
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <div className="flex items-center gap-2 relative z-[101]">
            <Logo className="w-8 h-8" />
            <span className="text-xl font-bold tracking-tight text-slate-900">Kortio</span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
             <a href="#features" onClick={(e) => scrollToSection(e, 'features')} className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors cursor-pointer">Functies</a>
             <a href="#how-it-works" onClick={(e) => scrollToSection(e, 'how-it-works')} className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors cursor-pointer">Hoe het werkt</a>
             <a href="#screenshots" onClick={(e) => scrollToSection(e, 'screenshots')} className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors cursor-pointer">Screenshots</a>
          </div>

          {/* Desktop Button */}
          <div className="hidden md:block">
             <AppStoreButton className="scale-90 origin-right !py-2 !px-4" />
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden relative z-[101] p-2 text-slate-600"
            onClick={toggleMobileMenu}
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay - Moved outside nav to ensure full coverage */}
      <div className={`fixed inset-0 bg-white/95 backdrop-blur-xl z-[90] flex flex-col items-center justify-center space-y-8 transition-all duration-300 md:hidden ${
        mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
         <a href="#features" onClick={(e) => scrollToSection(e, 'features')} className="text-2xl font-medium text-slate-900 cursor-pointer">Functies</a>
         <a href="#how-it-works" onClick={(e) => scrollToSection(e, 'how-it-works')} className="text-2xl font-medium text-slate-900 cursor-pointer">Hoe het werkt</a>
         <a href="#screenshots" onClick={(e) => scrollToSection(e, 'screenshots')} className="text-2xl font-medium text-slate-900 cursor-pointer">Screenshots</a>
         <div className="pt-8">
           <AppStoreButton onClick={() => setMobileMenuOpen(false)} />
         </div>
      </div>
    </>
  );
};