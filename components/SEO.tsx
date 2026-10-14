import { Helmet } from "react-helmet-async";
import { organization, serializeJSON, SITE_URL, website } from "../lib/seo";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  noindex?: boolean;
  ogImage?: string;
  schema?: object;
  pageType?: "WebPage" | "CollectionPage";
}
export function SEO({
  title,
  description,
  canonical,
  noindex = false,
  ogImage = `${SITE_URL}/social-card.png`,
  schema,
  pageType = "WebPage",
}: SEOProps) {
  const fullTitle = title.includes("Kortio") ? title : `${title} | Kortio`;
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
    });
    if (canonical !== "/")
      graph.push({
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Kortio",
            item: `${SITE_URL}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: fullTitle.replace(/ — Kortio$/, ""),
            item: url,
          },
        ],
      });
  }
  if (schema) graph.push(schema);
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta
        name="robots"
        content={
          noindex
            ? "noindex, nofollow"
            : "index, follow, max-image-preview:large"
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
