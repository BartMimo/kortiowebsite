import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Hero } from './Hero';
import { Features } from './Features';
import { Screenshots } from './Screenshots';
import { HowItWorks } from './HowItWorks';
import { Trust } from './Trust';
import { CTA } from './CTA';
import { Footer } from './Footer';

export const LandingPage: React.FC = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const id = hash.replace('#', '');
    const el = document.getElementById(id);
    if (!el) return;
    const headerOffset = 80;
    const elementPosition = el.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
  }, [hash]);

  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Screenshots />
      <HowItWorks />
      <Trust />
      <CTA />
      <Footer />
    </>
  );
};