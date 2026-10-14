import { useEffect, useMemo, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { ArrowRight, ChevronRight, RotateCcw, Search, X } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { SEO } from "../components/SEO";
import { BrandCard } from "../components/BrandCard";
import { CTA } from "../components/CTA";
import { useCatalog } from "../hooks/useCatalog";
const normalize = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("nl")
    .trim();
export default function MerkenPage() {
  const [params] = useSearchParams();
  const [search, setSearch] = useState("");
  useEffect(() => setSearch(params.get("q") ?? ""), [params]);
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("featured");
  const { brands, categories, loading, error, retry } = useCatalog();
  const availableCategories = categories.filter((c) =>
    brands.some((b) => b.primary_category_id === c.id),
  );
  const filtered = useMemo(() => {
    const term = normalize(search);
    return brands
      .filter(
        (b) =>
          (!category || b.primary_category_id === category) &&
          normalize(
            `${b.name} ${b.discount_text ?? ""} ${b.category_name ?? ""}`,
          ).includes(term),
      )
      .sort(
        (a, b) =>
          (sort === "featured"
            ? Number(b.is_featured) - Number(a.is_featured)
            : 0) ||
          (sort === "za"
            ? b.name.localeCompare(a.name, "nl")
            : a.name.localeCompare(b.name, "nl")),
      );
  }, [brands, search, category, sort]);
  const reset = () => {
    setSearch("");
    setCategory("");
  };
  return (
    <>
      <SEO
        title="Gratis kortingscodes voor merken & webshops — Kortio"
        description="Zoek je favoriete merk, bekijk de korting en kopieer de code. Vind gratis kortingscodes voor mode, sport, eten en meer."
        canonical="/merken"
        pageType="CollectionPage"
      />
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <section className="page-intro catalog-intro">
          <div className="site-container">
            <div className="breadcrumb">
              <Link to="/">Kortio</Link>
              <ChevronRight aria-hidden="true" />
              <span>Alle merken</span>
            </div>
            <div className="section-label">
              Gratis kortingscodes voor merken &amp; webshops
            </div>
            <h1>
              Jouw favoriete merk.
              <br />
              <span>Met extra voordeel.</span>
            </h1>
            <div className="catalog-intro-bottom">
              <p className="section-copy">
                Zoek gratis kortingscodes voor mode, sport, beauty, eten en
                meer. Kies je merk, kopieer de code en bekijk de voorwaarden in
                de webshop.
              </p>
              <div className="catalog-intro-illustration" aria-hidden="true">
                <div className="small-ticket">%</div>
                <div className="small-ticket">€</div>
              </div>
            </div>
          </div>
        </section>
        <section className="catalog-body" aria-label="Merken en kortingscodes">
          <div className="site-container">
            <h2 className="sr-only">Vind je merk en kortingscode</h2>
            <div className="catalog-toolbar">
              <div className="search-field">
                <Search aria-hidden="true" />
                <label className="sr-only" htmlFor="brand-search">
                  Zoek een merk of kortingscode
                </label>
                <input
                  id="brand-search"
                  type="search"
                  autoComplete="off"
                  placeholder="Welk merk zoek je?"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                {search && (
                  <button
                    aria-label="Zoekopdracht wissen"
                    onClick={() => setSearch("")}
                  >
                    <X aria-hidden="true" />
                  </button>
                )}
              </div>
              <div className="sort-control">
                <label htmlFor="brand-sort">Sorteer op</label>
                <select
                  id="brand-sort"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                >
                  <option value="featured">Uitgelicht eerst</option>
                  <option value="az">Naam A–Z</option>
                  <option value="za">Naam Z–A</option>
                </select>
              </div>
            </div>
            <div
              className="filter-chips"
              role="group"
              aria-label="Filter op categorie"
            >
              <button
                className="filter-chip"
                aria-pressed={!category}
                onClick={() => setCategory("")}
              >
                Alle merken
              </button>
              {availableCategories.map((c) => (
                <button
                  className="filter-chip"
                  aria-pressed={category === c.id}
                  key={c.id}
                  onClick={() => setCategory(category === c.id ? "" : c.id)}
                >
                  {c.name}
                </button>
              ))}
            </div>
            <div className="catalog-result-count">
              <p role="status">
                {loading
                  ? "Merken laden…"
                  : error
                    ? "Merken niet beschikbaar"
                    : `${filtered.length} ${filtered.length === 1 ? "merk" : "merken"} gevonden`}
              </p>
              {(search || category) && (
                <button onClick={reset}>Wis zoekopdracht &amp; filters</button>
              )}
            </div>
            {error ? (
              <div className="empty-state">
                <RotateCcw aria-hidden="true" />
                <h2>We krijgen even geen verbinding.</h2>
                <p>
                  De merken kunnen nu niet worden opgehaald. Probeer het nog
                  eens.
                </p>
                <button onClick={retry} className="button button-primary">
                  Opnieuw proberen
                </button>
              </div>
            ) : (
              <div className="catalog-grid" aria-busy={loading}>
                {loading
                  ? [1, 2, 3, 4, 5, 6].map((n) => (
                      <div className="skeleton" key={n} aria-hidden="true" />
                    ))
                  : filtered.map((b) => <BrandCard brand={b} key={b.id} />)}
                {!loading && filtered.length === 0 && (
                  <div className="empty-state">
                    <Search aria-hidden="true" />
                    <h2>
                      {search || category
                        ? "Dat merk hebben we niet gevonden."
                        : "Er zijn nu geen actieve kortingscodes."}
                    </h2>
                    <p>
                      {search || category
                        ? "Probeer een andere naam of bekijk alle merken."
                        : "Kom later terug voor nieuw aanbod."}
                    </p>
                    {(search || category) && (
                      <button className="button button-primary" onClick={reset}>
                        Bekijk alle merken
                      </button>
                    )}
                    <Link to="/merk-toevoegen" className="text-link">
                      Merk aanmelden
                      <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                  </div>
                )}
              </div>
            )}
            <p className="brand-note">
              Kortingscodes kunnen een einddatum, minimum bestelbedrag of andere
              voorwaarden hebben. Controleer deze altijd in de webshop.{" "}
              <Link to="/kortingscode-gebruiken">
                Lees hoe je een kortingscode gebruikt.
              </Link>
            </p>
          </div>
        </section>
        <CTA />
      </main>
      <Footer />
    </>
  );
}
