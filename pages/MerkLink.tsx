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
import type { Brand } from "../lib/catalog";

// Merkpagina op kortio.app/m/<merk>. Hier komt 98% van het Google-verkeer binnen
// (zoekopdracht "<merk> kortingscode"), en ook de deellinks uit de app.

const dateNL = (iso: string, withYear = true) =>
  new Intl.DateTimeFormat("nl-NL", {
    day: "numeric",
    month: "long",
    ...(withYear ? { year: "numeric" } : {}),
    timeZone: "Europe/Amsterdam",
  }).format(new Date(iso.slice(0, 10) + "T12:00:00"));

const monthNL = (iso: string) =>
  new Intl.DateTimeFormat("nl-NL", {
    month: "short",
    year: "numeric",
    timeZone: "Europe/Amsterdam",
  }).format(new Date(iso.slice(0, 10) + "T12:00:00"));

// Een testdatum in de titel helpt alleen als hij vers is; "getest okt" oogt in december verouderd.
const recentlyVerified = (iso?: string | null) =>
  !!iso && Date.now() - new Date(iso.slice(0, 10) + "T12:00:00").getTime() <= 31 * 86400000;

function buildTitle(brand: Brand, discount: string) {
  const slug = slugify(brand.name);
  const end = `${discount ? `: ${discount}` : ""} | Kortio`;
  const tested = recentlyVerified(brand.last_verified_at)
    ? ` (getest ${monthNL(brand.last_verified_at!)})`
    : "";
  // Google kapt titels af rond 60 tekens; dan eerst de testdatum en daarna de andere zoeknaam laten vallen.
  const options = [
    `${nameWithAlias(brand.name, slug)} kortingscode${tested}${end}`,
    `${nameWithAlias(brand.name, slug)} kortingscode${end}`,
    ...(brandAlias(slug) ? [`${brandAlias(slug)} kortingscode${end}`] : []),
    `${brand.name} kortingscode${end}`,
  ];
  return options.find((t) => t.length <= 62) ?? options[options.length - 1];
}

export default function MerkLink() {
  const { slug = "" } = useParams();
  const { brands, allBrands, loading, error, retry } = useCatalog();
  const brand = allBrands.find((b) => slugify(b.name) === slug.toLowerCase());
  // Merk staat nog in Kortio, maar de tijdelijke code is verlopen: pagina blijft, zonder code.
  const expired = brand ? !isCurrentBrand(brand) : false;
  const discount = brand?.discount_text?.trim().toLowerCase() ?? "";
  const related = brand
    ? brands
        .filter((b) => b.id !== brand.id && b.primary_category_id === brand.primary_category_id)
        .sort((a, b) => Number(b.is_featured) - Number(a.is_featured) || a.name.localeCompare(b.name))
        .slice(0, 8)
    : [];
  const verified = brand?.last_verified_at ? dateNL(brand.last_verified_at) : null;
  const alias = brand ? brandAlias(slugify(brand.name)) : null;
  const searchName = brand ? nameWithAlias(brand.name, slugify(brand.name)) : "";
  const until = brand?.is_temporary && brand.valid_until ? dateNL(brand.valid_until) : null;

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
          a: `Tik op de code om hem te tonen; hij wordt dan meteen gekopieerd. Ga naar de webshop van ${brand.name}, leg je producten in je winkelwagen en plak de code bij het afrekenen in het veld voor de kortingscode, actiecode of promocode.`,
        },
        {
          q: `Wat levert de ${brand.name} kortingscode op?`,
          a: discount
            ? `Met deze code krijg je ${discount} bij ${brand.name}. De precieze voorwaarden zie je in de winkelwagen van de webshop.`
            : `De korting en voorwaarden zie je in de winkelwagen van ${brand.name} nadat je de code hebt ingevuld.`,
        },
      ]
    : [];

  const faqSchema = brand && !expired
    ? {
        "@type": "FAQPage",
        mainEntity: faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : undefined;

  return (
    <>
      <SEO
        title={
          brand
            ? expired
              ? `${searchName} kortingscode: nieuwe code volgt | Kortio`
              : buildTitle(brand, discount)
            : "Kortingscode | Kortio"
        }
        description={
          brand && expired
            ? `Er is nu geen geldige ${searchName} kortingscode. We controleren ${brand.name} regelmatig op nieuwe acties; bekijk intussen andere geteste kortingscodes.`
            : brand
            ? `${searchName} kortingscode${discount ? ` voor ${discount}` : ""}${verified ? `, getest op ${verified}` : ""}. Tik om de actiecode te zien, kopieer hem en plak hem bij het afrekenen. Gratis, zonder account.`
            : "Kortingscodes van je favoriete merken op één plek."
        }
        // Zonder (geladen) merk geen canonical en noindex: de terugvalpagina voor nieuwe merken en
        // codes die niet meer actief zijn horen niet in Google.
        canonical={brand ? `/m/${slugify(brand.name)}` : undefined}
        noindex={!brand}
        schema={faqSchema}
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
              <Link to="/" className="underline">Alle kortingscodes</Link>
              {brand.category_name && <> › {brand.category_name}</>}
            </nav>
            <h1 className="mb-2 text-3xl font-bold">{brand.name} kortingscode</h1>
            {alias && (
              <p className="mb-2 text-sm" style={{ color: "var(--muted)" }}>
                Ook gezocht als {alias} kortingscode
              </p>
            )}
            {expired ? (
              <div className="mb-6 rounded-xl border p-5">
                <p className="font-semibold">Op dit moment is er geen geldige {brand.name} kortingscode.</p>
                <p className="mt-2">
                  De laatste code{brand.valid_until ? ` liep af op ${dateNL(brand.valid_until)}` : " is verlopen"}.{" "}
                  {brand.name} heeft regelmatig nieuwe acties; zodra we een werkende code vinden, staat hij hier.
                </p>
                {safeWebURL(brand.website_url) && (
                  <a
                    href={safeWebURL(brand.website_url)!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block underline"
                  >
                    Bekijk de acties bij {brand.name}
                  </a>
                )}
              </div>
            ) : (
            <>
            <p className="mb-6 text-sm" style={{ color: "var(--muted)" }}>
              {discount ? `${brand.discount_text} bij ${brand.name}` : `Actuele code voor ${brand.name}`}
              {verified ? ` · getest op ${verified}` : ""}
              {until ? ` · geldig t/m ${until}` : ""}
            </p>
            <BrandCard brand={brand} />

            <section className="mt-10">
              <h2 className="mb-3 text-xl font-semibold">
                Zo gebruik je de {brand.name} kortingscode
              </h2>
              <ol className="list-decimal space-y-2 pl-5">
                <li>Tik hierboven op de code. Hij verschijnt en staat meteen op je klembord.</li>
                <li>Open de webshop van {brand.name} en leg je producten in je winkelwagen.</li>
                <li>
                  Plak de code bij het afrekenen in het veld voor de kortingscode, actiecode of
                  promocode en controleer of de korting wordt verrekend.
                </li>
              </ol>
              <p className="mt-3 text-sm">
                Meer uitleg: <Link to="/kortingscode-gebruiken" className="underline">zo gebruik je een kortingscode</Link>.
              </p>
            </section>

            <section className="mt-10">
              <h2 className="mb-3 text-xl font-semibold">Veelgestelde vragen over {brand.name}</h2>
              {faq.map((f) => (
                <div key={f.q} className="mb-4">
                  <h3 className="font-semibold">{f.q}</h3>
                  <p className="mt-1">{f.a}</p>
                </div>
              ))}
            </section>
            </>
            )}

            {related.length > 0 && (
              <section className="mt-10">
                <h2 className="mb-3 text-xl font-semibold">
                  Meer kortingscodes{brand.category_name ? ` voor ${brand.category_name.toLowerCase()}` : ""}
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
              </section>
            )}
          </>
        )}
        {!loading && !error && !brand && (
          <>
            <h1 className="mb-2 text-2xl font-bold">Deze code is niet meer actief</h1>
            <p className="mb-6">
              Bekijk de <Link to="/" className="underline">actuele kortingscodes</Link>.
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
