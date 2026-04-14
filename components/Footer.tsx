import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './ui/Logo';

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-slate-100 py-12">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10 mb-10">

          {/* Brand */}
          <div className="flex flex-col gap-3 max-w-xs">
            <Link to="/home" className="flex items-center gap-2" aria-label="Kortio — ga naar startpagina">
              <Logo className="w-6 h-6" />
              <span className="text-lg font-bold text-slate-900">Kortio</span>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed">
              De gratis kortingscode app voor Nederland. Bespaar bij honderden webshops — zonder account.
            </p>
          </div>

          {/* App links */}
          <nav aria-label="App-navigatie">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">App</h3>
            <ul className="space-y-2 text-sm text-slate-600 font-medium">
              <li><Link to="/home#features" className="hover:text-blue-600 transition-colors">Functies</Link></li>
              <li><Link to="/home#how-it-works" className="hover:text-blue-600 transition-colors">Hoe het werkt</Link></li>
              <li><Link to="/home#screenshots" className="hover:text-blue-600 transition-colors">Screenshots</Link></li>
              <li><Link to="/home#faq" className="hover:text-blue-600 transition-colors">FAQ</Link></li>
            </ul>
          </nav>

          {/* Webshops links */}
          <nav aria-label="Webshops-navigatie">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Kortingscodes</h3>
            <ul className="space-y-2 text-sm text-slate-600 font-medium">
              <li><Link to="/merken" className="hover:text-blue-600 transition-colors">Alle merken</Link></li>
              <li><Link to="/merk-toevoegen" className="hover:text-blue-600 transition-colors">Merk toevoegen</Link></li>
            </ul>
          </nav>

          {/* Legal */}
          <nav aria-label="Juridische navigatie">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Info</h3>
            <ul className="space-y-2 text-sm text-slate-600 font-medium">
              <li><Link to="/privacy" className="hover:text-blue-600 transition-colors">Privacybeleid</Link></li>
              <li><a href="mailto:info@kortio.app" className="hover:text-blue-600 transition-colors">Contact</a></li>
            </ul>
          </nav>

        </div>

        <div className="border-t border-slate-100 pt-6 flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-sm text-slate-400 font-medium">
            &copy; {year} Kortio.App. Alle rechten voorbehouden.
          </p>
          <p className="text-xs text-slate-300">
            Kortingscodes voor Nederlandse webshops · Gratis · Geen account
          </p>
        </div>
      </div>
    </footer>
  );
};
