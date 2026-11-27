import { Link, useParams } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { SEO } from "../components/SEO";
import { BrandCard } from "../components/BrandCard";
import { CTA } from "../components/CTA";
import { CategoryLinks } from "../components/CategoryLinks";
import { useCatalog } from "../hooks/useCatalog";
import { slugify } from "../lib/slug";
import { categoryPages } from "../lib/categories";
import { SITE_URL } from "../lib/seo";
import type { Brand } from "../lib/catalog";
import NotFound from "./NotFound";

// Categoriepagina op /kortingscodes/<categorie>. Vangt zoekopdrachten als "kortingscode kleding"
// en geeft elke merkpagina een tweede interne link vanaf een sterke pagina.

const year = () =>
  new Intl.DateTimeFormat("nl-NL", { year: "numeric", timeZone: "Europe/Amsterdam" }).format(
    new Date(),
  );
const listNL = (names: string[]) =>
  names.length < 2 ? names.join("") : `${names.slice(0, -1).join(", ")} en ${names.at(-1)}`;
const byFeatured = (a: Brand, b: Brand) =>
  Number(b.is_featured) - Number(a.is_featured) || a.name.localeCompare(b.name, "nl");

export default function CategoryPage() {
  const { slug = "" } = useParams();
  const page = categoryPages.find((c) => c.slug === slug.toLowerCase());
  const { brands, categories, loading, error, retry } = useCatalog();
  if (!page) return <NotFound />;
  const topic = page.heading.replace(/^Kortingscodes voor /, "");
  const dbCategory = categories.find((c) => c.name === page.dbName);
  const list = dbCategory
    ? brands.filter((b) => b.primary_category_id === dbCategory.id).sort(byFeatured)
    : [];
  const count = list.length;
  // Voorbeelden in de beschrijving: eerst bekende merken, dan recent geteste.
  const rank = (b: Brand) => {
    const i = page.popular.indexOf(slugify(b.name));
    return i === -1 ? 99 : i;
  };
  const examples = [...list]
    .sort(
      (a, b) =>
        rank(a) - rank(b) ||
        (b.last_verified_at ?? "").localeCompare(a.last_verified_at ?? "") ||
        byFeatured(a, b),
    )
    .slice(0, 3)
    .map((b) => b.name);
  const titles = [
    ...(count ? [`${page.titleTerm} ${year()}: ${count} webshops | Kortio`] : []),
    `${page.titleTerm} ${year()} | Kortio`,
  ];
  const title = titles.find((t) => t.length <= 62) ?? titles[titles.length - 1];
  // Max. 160 tekens: zo nodig minder voorbeeldmerken, daarna zonder slotzin.
  const lead = (n: number) =>
    `${count ? `${count} kortingscodes` : "Kortingscodes"} voor ${topic}${n ? `, zoals ${listNL(examples.slice(0, n))}` : ""}.`;
  const descriptions = [3, 2, 1, 0].flatMap((n) => [
    `${lead(n)} Tik op een code, kopieer hem en plak hem bij het afrekenen. Gratis, zonder account.`,
    `${lead(n)} Tik op een code, kopieer hem en plak hem bij het afrekenen.`,
  ]);
  const description =
    descriptions.find((d) => d.length <= 160) ?? descriptions[descriptions.length - 1];
  const faq = [
    ...page.faq,
    {
      q: "Hoe gebruik ik een kortingscode?",
      a: "Tik op de code om hem te zien; hij wordt meteen gekopieerd en de webshop opent. Plak de code bij het afrekenen in het veld voor de kortingscode, actiecode of promotiecode en controleer of de korting is verrekend voordat je betaalt.",
    },
  ];
  const schema = [
    {
      "@type": "ItemList",
      name: page.heading,
      numberOfItems: count,
      itemListElement: list.map((b, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE_URL}/m/${slugify(b.name)}`,
        name: `${b.name} kortingscode`,
      })),
    },
    {
      "@type": "FAQPage",
      mainEntity: faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];
  return (
    <>
      <SEO
        title={title}
        description={description}
        canonical={`/kortingscodes/${page.slug}`}
        pageType="CollectionPage"
        // Zonder merken (categorie tijdelijk leeg) hoort de pagina niet in Google.
        noindex={!loading && !error && count === 0}
        schema={schema}
        breadcrumbs={[{ name: `Kortingscodes ${page.label.toLowerCase()}` }]}
      />
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <section className="page-intro catalog-intro">
          <div className="site-container">
            <nav className="breadcrumb" aria-label="Kruimelpad">
              <Link to="/">Kortio</Link>
              <ChevronRight aria-hidden="true" />
              <span>Kortingscodes {page.label.toLowerCase()}</span>
            </nav>
            <div className="section-label">
              {count ? `${count} webshops met een kortingscode` : "Kortingscodes"}
            </div>
            <h1>{page.heading}</h1>
            <p className="section-copy">{page.intro}</p>
          </div>
        </section>
        <section className="catalog-body" aria-label={`Kortingscodes voor ${topic}`}>
          <div className="site-container">
            <h2 className="sr-only">Kortingscodes voor {topic}</h2>
            {error ? (
              <div className="empty-state">
                <h2>We krijgen even geen verbinding.</h2>
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
                  : list.map((b) => (
                      <BrandCard brand={b} key={b.id} href={`/m/${slugify(b.name)}`} />
                    ))}
                {!loading && count === 0 && (
                  <div className="empty-state">
                    <h2>Er zijn nu geen actieve kortingscodes in deze categorie.</h2>
                    <Link to="/" className="text-link">
                      Bekijk alle merken
                    </Link>
                  </div>
                )}
              </div>
            )}
            <p className="brand-note">
              Kortio ontvangt mogelijk een vergoeding als je via onze link bestelt. Dat kost jou
              niets extra.
            </p>
          </div>
        </section>
        <section className="section">
          <div className="site-container privacy-content">
            <h2>Waar let je op bij kortingscodes voor {topic}?</h2>
            <p>{page.tip}</p>
            {list.length > 0 && (
              <>
                <h2>Alle kortingscodes voor {topic} op een rij</h2>
                <ul className="category-brand-list">
                  {[...list]
                    .sort((a, b) => a.name.localeCompare(b.name, "nl"))
                    .map((b) => (
                      <li key={b.id}>
                        <Link to={`/m/${slugify(b.name)}`}>{b.name} kortingscode</Link>
                        {b.discount_text ? ` – ${b.discount_text}` : ""}
                      </li>
                    ))}
                </ul>
              </>
            )}
            <h2>Veelgestelde vragen</h2>
            {faq.map((f) => (
              <div key={f.q}>
                <h3 className="category-faq-q">{f.q}</h3>
                <p>{f.a}</p>
              </div>
            ))}
            <p>
              Meer uitleg vind je op{" "}
              <Link to="/kortingscode-gebruiken">zo gebruik je een kortingscode</Link>.
            </p>
          </div>
        </section>
        <CategoryLinks current={page.slug} />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
