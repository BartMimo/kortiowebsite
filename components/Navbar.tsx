import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppStoreButton, PlayStoreButton } from './ui/AppStoreButton';
import { Logo } from './ui/Logo';
import { Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isOnDarkBackground = location.pathname === '/merken';

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [handleScroll]);

  const toggleMobileMenu = () => setMobileMenuOpen(prev => !prev);

  const isDark = isOnDarkBackground && !scrolled && !mobileMenuOpen;
  const linkClass = `text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded ${
    isDark ? 'text-white hover:text-white/80' : 'text-slate-600 hover:text-slate-900'
  }`;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          isDark ? 'bg-transparent py-6' : 'bg-white/90 backdrop-blur-md shadow-sm py-4'
        }`}
        role="navigation"
        aria-label="Hoofdnavigatie"
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <a href="/home" className="flex items-center gap-2 relative z-[101]" aria-label="Kortio - ga naar startpagina">
            <Logo className="w-8 h-8" />
            <span className={`text-xl font-bold tracking-tight transition-colors ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              Kortio
            </span>
          </a>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/home" className={linkClass}>Home</Link>
            <Link to="/home#features" className={linkClass}>Functies</Link>
            <Link to="/home#how-it-works" className={linkClass}>Hoe het werkt</Link>
            <Link to="/home#screenshots" className={linkClass}>Screenshots</Link>
            <Link to="/merk-toevoegen" className={linkClass}>Merk toevoegen</Link>
            <Link to="/merken" className={linkClass}>Merken</Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <AppStoreButton className="scale-90 origin-right !py-2 !px-4" />
            <PlayStoreButton className="scale-90 origin-right !py-2 !px-4" />
          </div>

          {/* Mobile toggle */}
          <button
            className={`md:hidden relative z-[101] p-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded ${
              isDark ? 'text-white' : 'text-slate-600'
            }`}
            onClick={toggleMobileMenu}
            aria-label={mobileMenuOpen ? 'Menu sluiten' : 'Menu openen'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        role="navigation"
        aria-label="Mobiele navigatie"
        className={`fixed inset-0 bg-white/95 backdrop-blur-xl z-[90] flex flex-col items-center justify-center space-y-8 transition-all duration-300 md:hidden ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {[
          { to: '/home', label: 'Home' },
          { to: '/home#features', label: 'Functies' },
          { to: '/home#how-it-works', label: 'Hoe het werkt' },
          { to: '/home#screenshots', label: 'Screenshots' },
          { to: '/merk-toevoegen', label: 'Merk toevoegen' },
          { to: '/merken', label: 'Merken' },
        ].map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            onClick={() => setMobileMenuOpen(false)}
            className="text-2xl font-medium text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
          >
            {label}
          </Link>
        ))}

        <div className="pt-8 flex flex-col gap-4">
          <AppStoreButton onClick={() => setMobileMenuOpen(false)} />
          <PlayStoreButton onClick={() => setMobileMenuOpen(false)} />
        </div>
      </div>
    </>
  );
};
