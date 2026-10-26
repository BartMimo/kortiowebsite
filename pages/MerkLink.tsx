import { Link, useParams } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { SEO } from "../components/SEO";
import { BrandCard } from "../components/BrandCard";
import { AppStoreButton, PlayStoreButton } from "../components/ui/AppStoreButton";
import { useCatalog } from "../hooks/useCatalog";
import { slugify } from "../lib/slug";

// Bestemming van deellinks uit de app: kortio.app/m/<merk>.
// Met de app geinstalleerd opent iOS het merk direct in de app; anders landt men hier.
export default function MerkLink() {
  const { slug = "" } = useParams();
  const { brands, loading, error, retry } = useCatalog();
  const brand = brands.find((b) => slugify(b.name) === slug.toLowerCase());
  const discount = brand?.discount_text?.trim().toLowerCase() ?? "";

  return (
    <>
      <SEO
        title={
          brand
            ? `${brand.name} kortingscode${discount ? `: ${discount}` : ""} | Kortio`
            : "Kortingscode | Kortio"
        }
        description={
          brand
            ? `Actuele ${brand.name} kortingscode${discount ? ` voor ${discount}` : ""}. Kopieer de code en plak hem bij het afrekenen.`
            : "Kortingscodes van je favoriete merken op één plek."
        }
        // Zonder (geladen) merk geen canonical en noindex: de terugvalpagina voor nieuwe merken en
        // codes die niet meer actief zijn horen niet in Google.
        canonical={brand ? `/m/${slugify(brand.name)}` : undefined}
        noindex={!brand}
      />
      <Navbar />
      <main className="mx-auto max-w-xl px-4 py-16">
        {loading && <p role="status">Een momentje…</p>}
        {!loading && error && (
          <p>
            Laden lukt niet.{" "}
            <button type="button" onClick={retry} className="underline">
              Opnieuw proberen
            </button>
          </p>
        )}
        {!loading && !error && brand && (
          <>
            <p className="mb-1 text-sm">Gedeeld via Kortio</p>
            <h1 className="mb-4 text-2xl font-bold">{brand.name} kortingscode</h1>
            <BrandCard brand={brand} />
          </>
        )}
        {!loading && !error && !brand && (
          <>
            <h1 className="mb-2 text-2xl font-bold">Deze code is niet meer actief</h1>
            <p className="mb-6">
              Bekijk de <Link to="/merken" className="underline">actuele kortingscodes</Link>.
            </p>
          </>
        )}
        <section className="mt-10">
          <h2 className="mb-3 text-lg font-semibold">Alle codes altijd bij de hand</h2>
          <div className="flex flex-wrap gap-3">
            <AppStoreButton />
            <PlayStoreButton />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
