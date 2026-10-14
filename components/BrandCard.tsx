import { useEffect, useState } from "react";
import { Check, Copy, ExternalLink, Star } from "lucide-react";
import { Brand, safeWebURL } from "../lib/catalog";
import { brandImages } from "../lib/brand-images";
export function BrandCard({ brand }: { brand: Brand }) {
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const [copying, setCopying] = useState(false);
  const website = safeWebURL(brand.website_url);
  const source = safeWebURL(brand.url_image);
  let fingerprint = 5381;
  for (const character of brand.url_image ?? "")
    fingerprint = ((fingerprint * 33) ^ character.codePointAt(0)!) >>> 0;
  const thumbnail = brandImages[brand.id];
  const image =
    thumbnail?.fingerprint === fingerprint ? thumbnail.file : source;
  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 3000);
    return () => clearTimeout(timer);
  }, [copied]);
  async function copy() {
    if (!brand.code || copying) return;
    setCopying(true);
    setFailed(false);
    try {
      await navigator.clipboard.writeText(brand.code);
      setCopied(true);
    } catch {
      setCopied(false);
      setFailed(true);
    } finally {
      setCopying(false);
    }
  }
  const until =
    brand.is_temporary && brand.valid_until
      ? new Intl.DateTimeFormat("nl-NL", {
          day: "numeric",
          month: "short",
          year: "numeric",
          timeZone: "Europe/Amsterdam",
        }).format(new Date(brand.valid_until))
      : null;
  return (
    <article className="brand-card">
      <div className="brand-card-top">
        <div className="brand-image">
          {image && !imageFailed ? (
            <img
              src={image}
              alt=""
              width={60}
              height={60}
              loading="lazy"
              decoding="async"
              onError={() => setImageFailed(true)}
            />
          ) : (
            brand.name.slice(0, 2).toUpperCase()
          )}
        </div>
        {brand.category_name && (
          <span className="category-badge">{brand.category_name}</span>
        )}
      </div>
      {brand.is_featured && (
        <span className="featured-badge">
          <Star size={10} aria-hidden="true" />
          Uitgelicht
        </span>
      )}
      <h3>{brand.name}</h3>
      <p className="brand-offer">
        {brand.discount_text || "Bekijk het aanbod bij dit merk."}
      </p>
      {until && <p className="brand-validity">Geldig t/m {until}</p>}
      {brand.code ? (
        <button
          className={`coupon-button ${copied ? "copied" : ""}`}
          onClick={copy}
          disabled={copying}
          aria-label={
            copied
              ? `Code voor ${brand.name} gekopieerd; kopieer opnieuw`
              : `Kopieer kortingscode ${brand.code} voor ${brand.name}`
          }
        >
          <code>{brand.code}</code>
          {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
        </button>
      ) : (
        <p className="copy-note">Voor dit aanbod is geen code beschikbaar.</p>
      )}
      <div className="brand-card-bottom">
        {website ? (
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open de webshop van ${brand.name} in een nieuw tabblad`}
          >
            Naar de webshop
            <ExternalLink aria-hidden="true" />
          </a>
        ) : (
          <span />
        )}
        <span className="copy-note" role="status">
          {copied ? "Code gekopieerd" : brand.code ? "Tik om te kopiëren" : ""}
        </span>
      </div>
      {failed && (
        <p className="copy-error" role="alert">
          Kopiëren lukt niet. Selecteer de code hierboven en kopieer deze
          handmatig.
        </p>
      )}
    </article>
  );
}
