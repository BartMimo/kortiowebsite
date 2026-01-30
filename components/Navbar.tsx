import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
    setMobileMenuOpen(prev => !prev);
  };

  /** scrollToSection is handled in LandingPage when navigating to hashes */

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          scrolled || mobileMenuOpen
            ? 'bg-white/90 backdrop-blur-md shadow-sm py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 relative z-[101]">
            <Logo className="w-8 h-8" />
            <span className="text-xl font-bold tracking-tight text-slate-900">
              Kortio
            </span>
          </a>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/#features"
              className="text-sm font-medium text-slate-600 hover:text-slate-900"
            >
              Functies
            </Link>
            <Link
              to="/#how-it-works"
              className="text-sm font-medium text-slate-600 hover:text-slate-900"
            >
              Hoe het werkt
            </Link>
            <Link
              to="/#screenshots"
              className="text-sm font-medium text-slate-600 hover:text-slate-900"
            >
              Screenshots
            </Link>

            {/* ✅ ECHTE PAGINA */}
            <Link
              to="/merk-toevoegen"
              className="text-sm font-medium text-slate-600 hover:text-slate-900"
            >
              Merk toevoegen
            </Link>
          </div>

          <div className="hidden md:block">
            <AppStoreButton className="scale-90 origin-right !py-2 !px-4" />
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden relative z-[101] p-2 text-slate-600"
            onClick={toggleMobileMenu}
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 bg-white/95 backdrop-blur-xl z-[90] flex flex-col items-center justify-center space-y-8 transition-all duration-300 md:hidden ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <Link
          to="/#features"
          onClick={() => setMobileMenuOpen(false)}
          className="text-2xl font-medium text-slate-900"
        >
          Functies
        </Link>
        <Link
          to="/#how-it-works"
          onClick={() => setMobileMenuOpen(false)}
          className="text-2xl font-medium text-slate-900"
        >
          Hoe het werkt
        </Link>
        <Link
          to="/#screenshots"
          onClick={() => setMobileMenuOpen(false)}
          className="text-2xl font-medium text-slate-900"
        >
          Screenshots
        </Link>

        <Link
          to="/merk-toevoegen"
          onClick={() => setMobileMenuOpen(false)}
          className="text-2xl font-medium text-slate-900"
        >
          Merk toevoegen
        </Link>

        <div className="pt-8">
          <AppStoreButton onClick={() => setMobileMenuOpen(false)} />
        </div>
      </div>
    </>
  );
};