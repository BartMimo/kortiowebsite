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
import { FAQ } from './FAQ';
import { SEO } from './SEO';

const landingSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://kortio.app/#organization',
      name: 'Kortio',
      url: 'https://kortio.app',
      logo: 'https://kortio.app/assets/logo1.png',
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'info@kortio.app',
        contactType: 'customer support',
        availableLanguage: 'Dutch',
      },
    },
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://kortio.app/#app',
      name: 'Kortio',
      description:
        'De slimste kortingscode app voor Nederland. Vind, kopieer en gebruik kortingscodes van honderden webshops — helemaal gratis.',
      applicationCategory: 'ShoppingApplication',
      operatingSystem: 'iOS, Android',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
      publisher: { '@id': 'https://kortio.app/#organization' },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        ratingCount: '120',
      },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://kortio.app/#website',
      url: 'https://kortio.app',
      name: 'Kortio',
      inLanguage: 'nl-NL',
      publisher: { '@id': 'https://kortio.app/#organization' },
    },
  ],
};

export const LandingPage: React.FC = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        const headerOffset = 80;
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [hash]);

  return (
    <>
      <SEO
        title="Kortio — Gratis kortingscodes vinden voor Nederlandse webshops"
        description="Download de Kortio app en vind direct de beste kortingscodes voor honderden Nederlandse webshops. Gratis, geen account nodig. Beschikbaar voor iOS en Android."
        canonical="/"
        schema={landingSchema}
      />
      <Navbar />
      <Hero />
      <Features />
      <Screenshots />
      <HowItWorks />
      <Trust />
      <FAQ />
      <CTA />
      <Footer />
    </>
  );
};