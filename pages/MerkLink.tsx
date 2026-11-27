import { Link, useParams } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { SEO } from "../components/SEO";
import { BrandCard } from "../components/BrandCard";
import { AppStoreButton, PlayStoreButton } from "../components/ui/AppStoreButton";
import { useCatalog } from "../hooks/useCatalog";
import { slugify } from "../lib/slug";
import { isCurrentBrand, safeWebURL } from "../lib/catalog";
import { brandAlias, nameWithAlias } from "../lib/brand-aliases";
import { brandContent } from "../lib/brand-content";
import {
  brandDescription,
  brandTitle,
  dateNL,
  expiredTitle,
  mentionsFreeShipping,
  offerText,
  relatedBrands,
} from "../lib/brand-seo";
import { categoryPageFor } from "../lib/categories";

// Merkpagina op kortio.app/m/<merk>. Hier komt 98% van het Google-verkeer binnen
// (zoekopdracht "<merk> kortingscode"), en ook de deellinks uit de app.

export default function MerkLink() {
  const { slug = "" } = useParams();
  const { brands, allBrands, loading, error, retry } = useCatalog();
  const brand = allBrands.find((b) => slugify(b.name) === slug.toLowerCase());
  // Merk staat nog in Kortio, maar de tijdelijke code is verlopen: pagina blijft, zonder code.
  const expired = brand ? !isCurrentBrand(brand) : false;
  const key = brand ? slugify(brand.name) : "";
  const alias = brand ? brandAlias(key) : null;
  const searchName = brand ? nameWithAlias(brand.name, key) : "";
  const content = brand ? brandContent[key] : undefined;
  const offer = brand ? offerText(brand.discount_text, [brand.name, alias]) : "";
  const related = brand ? relatedBrands(brand, brands) : [];
  const verified = brand?.last_verified_at ? dateNL(brand.last_verified_at) : null;
  const until = brand?.is_temporary && brand.valid_until ? dateNL(brand.valid_until) : null;
  const category = categoryPageFor(brand?.category_name);
  const sources = content
    ? [...new Set([content.shipping, content.returns, ...(content.savings ?? [])]
        .filter((f) => f)
        .map((f) => f!.source))]
    : [];

  const faq = brand
    ? [
        {
          q: `Werkt de ${alias ?? brand.name} kortingscode nog?`,
          a: verified
            ? `We hebben deze code op ${verified} voor het laatst getest bij ${brand.name}.${until ? ` Hij is geldig tot en met ${until}.` : ""} Werkt hij bij jou niet, controleer dan of je aan de voorwaarden voldoet, zoals een minimum bestelbedrag.`
            : `Deze code staat actief in Kortio.${until ? ` Hij is geldig tot en met ${until}.` : ""} Werkt hij bij jou niet, controleer dan de voorwaarden in de webshop, zoals een minimum bestelbedrag of uitgesloten artikelen.`,
        },
        {
          q: `Hoe gebruik ik de ${brand.name} actiecode?`,
          a: `Tik op de code om hem te tonen; hij wordt dan meteen gekopieerd en de webshop van ${brand.name} opent in een nieuw tabblad. Leg daar je producten in je winkelwagen en plak de code bij het afrekenen in het veld voor de kortingscode, actiecode of promocode.`,
        },
        {
          q: `Hoeveel korting geeft de ${brand.name} code?`,
          a: offer
            ? `Met deze code krijg je ${offer} bij ${brand.name}. De precieze voorwaarden zie je in de winkelwagen van de webshop.`
            : `De korting en voorwaarden zie je in de winkelwagen van ${brand.name} nadat je de code hebt ingevuld.`,
        },
        ...(content?.shipping && mentionsFreeShipping(content.shipping.text)
          ? [{ q: `Heeft ${brand.name} gratis verzending?`, a: content.shipping.text }]
          : []),
        ...(content?.returns && /\d+ dagen/.test(content.returns.text)
          ? [{ q: `Hoe lang kun je retourneren bij ${brand.name}?`, a: content.returns.text }]
          : []),
        ...(content?.savings?.length
          ? [
              {
                q: `Kun je nog meer besparen bij ${brand.name}?`,
                a: content.savings.map((s) => s.text).join(" "),
              },
            ]
          : []),
      ]
    : [];

  const faqSchema =
    brand && !expired
      ? {
          "@type": "FAQPage",
          mainEntity: faq.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }
      : undefined;

  const facts =
    !!content && !!(content.about || content.shipping || content.returns || content.savings?.length);

  return (
    <>
      <SEO
        title={
          brand ? (expired ? expiredTitle(brand) : brandTitle(brand)) : "Kortingscode | Kortio"
        }
        description={
          brand && expired
            ? `Er is nu geen geldige ${searchName} kortingscode; zodra we een nieuwe vinden, staat hij hier. Bekijk intussen andere kortingscodes${category ? ` voor ${category.label.toLowerCase()}` : ""}.`
            : brand
              ? brandDescription(brand, content)
              : "Kortingscodes van je favoriete merken op één plek."
        }
        // Zonder (geladen) merk geen canonical en noindex: de terugvalpagina voor nieuwe merken en
        // codes die niet meer actief zijn horen niet in Google.
        canonical={brand ? `/m/${key}` : undefined}
        noindex={!brand}
        brandSuffix={false}
        schema={faqSchema}
        breadcrumbs={
          brand
            ? [
                ...(category
                  ? [
                      {
                        name: `Kortingscodes ${category.label.toLowerCase()}`,
                        path: `/kortingscodes/${category.slug}`,
                      },
                    ]
                  : []),
                { name: `${brand.name} kortingscode` },
              ]
            : undefined
        }
      />
      <Navbar />
      <main id="main-content" tabIndex={-1} className="mx-auto max-w-xl px-4 py-12">
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
            <nav className="mb-3 text-sm" aria-label="Kruimelpad">
              <Link to="/" className="underline">
                Alle kortingscodes
              </Link>
              {category ? (
                <>
                  {" › "}
                  <Link to={`/kortingscodes/${category.slug}`} className="underline">
                    {category.label}
                  </Link>
                </>
              ) : (
                brand.category_name && <> › {brand.category_name}</>
              )}
            </nav>
            <h1 className="mb-2 text-3xl font-bold">{brand.name} kortingscode</h1>
            {alias && (
              <p className="mb-2 text-sm" style={{ color: "var(--muted)" }}>
                Ook gezocht als {alias} kortingscode
              </p>
            )}
            {expired ? (
              <div className="mb-6 rounded-xl border p-5">
                <p className="font-semibold">
                  Op dit moment is er geen geldige {brand.name} kortingscode.
                </p>
                <p className="mt-2">
                  De laatste code
                  {brand.valid_until ? ` liep af op ${dateNL(brand.valid_until)}` : " is verlopen"}.{" "}
                  {brand.name} heeft regelmatig nieuwe acties; zodra we een werkende code vinden,
                  staat hij hier.
                </p>
                {safeWebURL(brand.website_url) && (
                  <a
                    href={safeWebURL(brand.website_url)!}
                    target="_blank"
                    rel="sponsored noopener noreferrer"
                    className="mt-3 inline-block underline"
                  >
                    Bekijk de acties bij {brand.name}
                  </a>
                )}
              </div>
            ) : (
              <>
                <p className="mb-6 text-sm" style={{ color: "var(--muted)" }}>
                  {offer ? `${brand.discount_text} bij ${brand.name}` : `Actuele code voor ${brand.name}`}
                  {verified ? ` · getest op ${verified}` : ""}
                  {until ? ` · geldig t/m ${until}` : ""}
                </p>
                {/* Mensen zoeken ook op "<merk> code", "korting" en "actiecode" (Search Console nov 2026). */}
                <p className="mb-6">
                  Op zoek naar korting bij {brand.name}? Met deze {brand.name} code (ook wel
                  actiecode of promocode genoemd){" "}
                  {offer ? `krijg je ${offer}.` : "bespaar je bij het afrekenen."}
                </p>
                <BrandCard
                  brand={brand}
                  logoAlt={`Logo van ${brand.name}`}
                  headingLevel="h2"
                />
                <p className="mt-2 text-xs" style={{ color: "var(--muted)" }}>
                  Kortio ontvangt mogelijk een vergoeding als je via onze link bestelt. Dat kost
                  jou niets extra.
                </p>

                <section className="mt-10">
                  <h2 className="mb-3 text-xl font-semibold">
                    Zo gebruik je de {brand.name} kortingscode of actiecode
                  </h2>
                  <ol className="list-decimal space-y-2 pl-5">
                    <li>
                      Tik hierboven op de code. Hij verschijnt, staat meteen op je klembord en de
                      webshop van {brand.name} opent in een nieuw tabblad.
                    </li>
                    <li>Leg je producten in je winkelwagen.</li>
                    <li>
                      Plak de code bij het afrekenen in het veld voor de kortingscode en controleer
                      of de korting wordt verrekend.
                    </li>
                  </ol>
                  <p className="mt-3 text-sm">
                    Webshops geven dat veld verschillende namen, zoals kortingscode, actiecode,
                    promotiecode, kortingsbon of voucher; het is steeds hetzelfde veld. Meer uitleg:{" "}
                    <Link to="/kortingscode-gebruiken" className="underline">
                      zo gebruik je een kortingscode
                    </Link>
                    .
                  </p>
                </section>
              </>
            )}

            {content && facts && (
              <>
                {content.about && (
                  <section className="mt-10">
                    <h2 className="mb-3 text-xl font-semibold">Over {brand.name}</h2>
                    <p>{content.about}</p>
                  </section>
                )}
                {(content.shipping || content.returns) && (
                  <section className="mt-10">
                    <h2 className="mb-3 text-xl font-semibold">
                      Verzending en retour bij {brand.name}
                    </h2>
                    {content.shipping && (
                      <>
                        <h3 className="font-semibold">Verzenden</h3>
                        <p className="mb-3 mt-1">{content.shipping.text}</p>
                      </>
                    )}
                    {content.returns && (
                      <>
                        <h3 className="font-semibold">Retourneren</h3>
                        <p className="mt-1">{content.returns.text}</p>
                      </>
                    )}
                  </section>
                )}
                {!!content.savings?.length && (
                  <section className="mt-10">
                    <h2 className="mb-3 text-xl font-semibold">Meer besparen bij {brand.name}</h2>
                    <ul className="list-disc space-y-2 pl-5">
                      {content.savings.map((s) => (
                        <li key={s.text}>{s.text}</li>
                      ))}
                    </ul>
                  </section>
                )}
                {sources.length > 0 && (
                  <p className="mt-4 text-xs" style={{ color: "var(--muted)" }}>
                    Bron: de website van {brand.name} (
                    {sources.map((src, i) => (
                      <span key={src}>
                        {i > 0 && ", "}
                        <a
                          href={src}
                          target="_blank"
                          rel="nofollow noopener noreferrer"
                          className="underline"
                        >
                          {i + 1}
                        </a>
                      </span>
                    ))}
                    ), bekeken op {dateNL(content.checked)}. Voorwaarden kunnen veranderen;
                    controleer ze in de webshop.
                  </p>
                )}
              </>
            )}

            {!expired && (
              <section className="mt-10">
                <h2 className="mb-3 text-xl font-semibold">Veelgestelde vragen over {brand.name}</h2>
                {faq.map((f) => (
                  <div key={f.q} className="mb-4">
                    <h3 className="font-semibold">{f.q}</h3>
                    <p className="mt-1">{f.a}</p>
                  </div>
                ))}
              </section>
            )}

            {related.length > 0 && (
              <section className="mt-10">
                <h2 className="mb-3 text-xl font-semibold">
                  Meer kortingscodes
                  {brand.category_name ? ` voor ${brand.category_name.toLowerCase()}` : ""}
                </h2>
                <ul className="grid grid-cols-2 gap-2">
                  {related.map((b) => (
                    <li key={b.id}>
                      <Link to={`/m/${slugify(b.name)}`} className="underline">
                        {b.name} kortingscode
                      </Link>
                      {b.discount_text && (
                        <span className="block text-sm" style={{ color: "var(--muted)" }}>
                          {b.discount_text}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
                {category && (
                  <p className="mt-4">
                    <Link to={`/kortingscodes/${category.slug}`} className="underline">
                      Alle kortingscodes voor {category.label.toLowerCase()}
                    </Link>
                  </p>
                )}
              </section>
            )}
          </>
        )}
        {!loading && !error && !brand && (
          <>
            <h1 className="mb-2 text-2xl font-bold">Deze code is niet meer actief</h1>
            <p className="mb-6">
              Bekijk de{" "}
              <Link to="/" className="underline">
                actuele kortingscodes
              </Link>
              .
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
