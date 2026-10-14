import { Link } from "react-router-dom";
import { ArrowRight, RotateCcw } from "lucide-react";
import { BrandCard } from "./BrandCard";
import { useCatalog } from "../hooks/useCatalog";
export function FeaturedBrands() {
  const { brands, loading, error, retry } = useCatalog();
  const featured = [...brands]
    .sort(
      (a, b) =>
        Number(b.is_featured) - Number(a.is_featured) ||
        a.name.localeCompare(b.name, "nl"),
    )
    .slice(0, 3);
  return (
    <section className="section featured-section" id="merken">
      <div className="site-container">
        <div className="section-heading">
          <div>
            <div className="section-label">Een beetje extra voordeel</div>
            <h2 className="section-title">Je merken. Je korting.</h2>
          </div>
          <Link to="/merken" className="text-link">
            Bekijk alle merken
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
        {error ? (
          <div className="empty-state">
            <RotateCcw aria-hidden="true" />
            <h3>Even geen verbinding.</h3>
            <p>We kunnen de kortingscodes nu niet ophalen.</p>
            <button className="button button-primary" onClick={retry}>
              Probeer opnieuw
            </button>
          </div>
        ) : (
          <div className="catalog-grid" aria-busy={loading}>
            {loading
              ? [1, 2, 3].map((n) => (
                  <div key={n} className="skeleton" aria-hidden="true" />
                ))
              : featured.map((brand) => (
                  <BrandCard key={brand.id} brand={brand} />
                ))}
          </div>
        )}
        {!error && !loading && featured.length === 0 && (
          <div className="empty-state">
            <h3>We vullen het aanbod aan.</h3>
            <p>Bekijk de merkenpagina voor het beschikbare aanbod.</p>
            <Link to="/merken" className="button button-primary">
              Bekijk merken
            </Link>
          </div>
        )}
        <p className="brand-note">
          Een code kan voorwaarden hebben. Controleer de korting altijd in de
          webshop voordat je bestelt.
        </p>
      </div>
    </section>
  );
}
