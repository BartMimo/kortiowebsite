import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './ui/Logo';

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-slate-100 py-12">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
        
        <div className="flex items-center gap-2">
          <Logo className="w-6 h-6" />
          <span className="text-lg font-bold text-slate-900">Kortio</span>
        </div>

        <div className="flex gap-6 text-sm text-slate-500 font-medium">
          <Link to="/login" className="hover:text-blue-600 transition-colors">Admin Login</Link>

        </div>

        <div className="text-sm text-slate-400 font-medium">
          &copy; {year} Kortio App. Alle rechten voorbehouden.
        </div>

      </div>
    </footer>
  );
};