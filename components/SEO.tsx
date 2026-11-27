import { Helmet } from "react-helmet-async";
import { organization, serializeJSON, SITE_URL, website } from "../lib/seo";

export type Crumb = { name: string; path?: string };
interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  noindex?: boolean;
  ogImage?: string;
  schema?: object | object[];
  pageType?: "WebPage" | "CollectionPage" | "AboutPage";
  // Kruimelpad na "Kortio"; het laatste item zonder path is de pagina zelf.
  breadcrumbs?: Crumb[];
  dateModified?: string;
  // false: de titel is al op lengte gemaakt (merkpagina's); dan niets meer achter plakken.
  brandSuffix?: boolean;
}
const shortName = (title: string) => title.replace(/ (\||—) Kortio$/, "");
export function SEO({
  title,
  description,
  canonical,
  noindex = false,
  ogImage = `${SITE_URL}/social-card.png`,
  schema,
  pageType = "WebPage",
  breadcrumbs,
  dateModified,
  brandSuffix = true,
}: SEOProps) {
  const fullTitle =
    !brandSuffix || title.includes("Kortio") ? title : `${title} | Kortio`;
  const url = canonical ? `${SITE_URL}${canonical}` : undefined;
  const graph: object[] = [organization, website];
  if (url && !noindex) {
    graph.push({
      "@type": pageType,
      "@id": `${url}#webpage`,
      name: fullTitle,
      description,
      url,
      inLanguage: "nl-NL",
      isPartOf: { "@id": website["@id"] },
      publisher: { "@id": organization["@id"] },
      ...(dateModified ? { dateModified } : {}),
    });
    if (canonical !== "/") {
      const crumbs = breadcrumbs ?? [{ name: shortName(fullTitle) }];
      graph.push({
        "@type": "BreadcrumbList",
        itemListElement: [{ name: "Kortio", path: "/" }, ...crumbs].map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: c.name,
          item: c.path ? `${SITE_URL}${c.path}` : url,
        })),
      });
    }
  }
  if (schema) graph.push(...(Array.isArray(schema) ? schema : [schema]));
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta
        name="robots"
        content={
          noindex
            ? "noindex, nofollow"
            : "index, follow, max-image-preview:large, max-snippet:-1"
        }
      />
      {url && <link rel="canonical" href={url} />}
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="nl_NL" />
      <meta property="og:site_name" content="Kortio" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta
        property="og:image:alt"
        content="Kortio: gratis kortingscodes van je favoriete merken"
      />
      {url && <meta property="og:url" content={url} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta
        name="twitter:image:alt"
        content="Kortio: gratis kortingscodes van je favoriete merken"
      />
      {!noindex && (
        <script type="application/ld+json">
          {serializeJSON({ "@context": "https://schema.org", "@graph": graph })}
        </script>
      )}
    </Helmet>
  );
}
