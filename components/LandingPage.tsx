import { Navbar } from "./Navbar";
import { Hero } from "./Hero";
import { Features } from "./Features";
import { Screenshots } from "./Screenshots";
import { HowItWorks } from "./HowItWorks";
import { Trust } from "./Trust";
import { CTA } from "./CTA";
import { Footer } from "./Footer";
import { FAQ } from "./FAQ";
import { SEO } from "./SEO";
import { FeaturedBrands } from "./FeaturedBrands";
const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Kortio",
  url: "https://kortio.app",
  description: "Vind, bewaar en gebruik kortingscodes van je favoriete merken.",
  applicationCategory: "ShoppingApplication",
  operatingSystem: "iOS, Android",
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
};
export function LandingPage() {
  return (
    <>
      <SEO
        title="Kortio — Leuk gevonden. Slim bespaard."
        description="Vind gratis kortingscodes van je favoriete merken. Kopieer een code en shop met voordeel. Download Kortio voor iPhone en Android, zonder registratie."
        canonical="/"
        schema={schema}
      />
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <div className="brand-ribbon">
          <div className="site-container">
            <p>Van je dagelijkse boodschappen tot je nieuwe outfit.</p>
            <div
              className="brand-wordmarks"
              role="group"
              aria-label="Onder andere deze merken vind je in Kortio"
            >
              <span>PicNic</span>
              <span className="wordmark-air">air up</span>
              <span className="wordmark-up">UPFRONT</span>
              <span>AYBL</span>
              <span>Alix the label</span>
            </div>
          </div>
        </div>
        <HowItWorks />
        <Screenshots />
        <Features />
        <FeaturedBrands />
        <Trust />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
