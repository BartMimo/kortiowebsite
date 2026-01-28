import React from 'react';
import { Navbar } from './Navbar';
import { Hero } from './Hero';
import { Features } from './Features';
import { Screenshots } from './Screenshots';
import { HowItWorks } from './HowItWorks';
import { Trust } from './Trust';
import { CTA } from './CTA';
import { Footer } from './Footer';

export const LandingPage: React.FC = () => {
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