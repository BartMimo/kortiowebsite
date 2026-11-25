import { useEffect, useState } from "react";
import { Check, Copy, ExternalLink, Scissors, Star } from "lucide-react";
import { track } from "../lib/track";
import { Brand, safeWebURL } from "../lib/catalog";
import { imageKey } from "../lib/brand-utils";
import { brandImages } from "../lib/brand-images";
export function BrandCard({ brand }: { brand: Brand }) {
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const [copying, setCopying] = useState(false);
  // Code zit verborgen achter een strook die openscheurt; zo weten we hoeveel mensen de
  // code echt bekijken. Eenmaal onthuld blijft hij open voor de rest van de sessie.
  const [revealed, setRevealed] = useState(false);
  const [tearing, setTearing] = useState(false);
  const revealKey = `kortio-open-${brand.id}`;
  useEffect(() => {
    try {
      if (sessionStorage.getItem(revealKey)) setRevealed(true);
    } catch {}
  }, [revealKey]);
  const website = safeWebURL(brand.website_url);
  const source = safeWebURL(brand.url_image);
  let fingerprint = 5381;
  for (const character of imageKey(brand.url_image))
    fingerprint = ((fingerprint * 33) ^ character.codePointAt(0)!) >>> 0;
  const thumbnail = brandImages[brand.id];
  const image =
    thumbnail?.fingerprint === fingerprint ? thumbnail.file : source;
  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 3000);
    return () => clearTimeout(timer);
  }, [copied]);
  async function copy(event: "copy" | "reveal" = "copy") {
    if (!brand.code || copying) return;
    if (event === "copy") track("copy", brand.id);
    setCopying(true);
    setFailed(false);
    try {
      await navigator.clipboard.writeText(brand.code);
      setCopied(true);
    } catch {
      setCopied(false);
      // Bij onthullen is de code gewoon zichtbaar; dan geen foutmelding.
      if (event === "copy") setFailed(true);
    } finally {
      setCopying(false);
    }
  }
  function reveal() {
    if (tearing || revealed) return;
    track("reveal", brand.id);
    try {
      sessionStorage.setItem(revealKey, "1");
    } catch {}
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setTearing(true);
    // Onthullen kopieert meteen: de klik is een gebruikersactie, dus het klembord mag.
    void copy("reveal");
    setTimeout(() => {
      setRevealed(true);
      setTearing(false);
    }, reduced ? 150 : 650);
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
        <div className={`coupon-wrap ${revealed ? "is-open" : ""}`}>
          <button
            className={`coupon-button ${copied ? "copied" : ""}`}
            onClick={() => copy()}
            disabled={copying || !revealed}
            tabIndex={revealed ? 0 : -1}
            aria-hidden={!revealed}
            aria-label={
              copied
                ? `Code voor ${brand.name} gekopieerd; kopieer opnieuw`
                : `Kopieer kortingscode ${brand.code} voor ${brand.name}`
            }
          >
            <code>{brand.code}</code>
            {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
          </button>
          {!revealed && (
            <button
              type="button"
              className={`coupon-cover ${tearing ? "tearing" : ""}`}
              onClick={reveal}
              aria-label={`Toon kortingscode voor ${brand.name}`}
            >
              {(["left", "right"] as const).map((side) => (
                <span key={side} className={`tear tear-${side}`} aria-hidden="true">
                  <span className="tear-label">
                    <Scissors />
                    Tik om de code te zien
                  </span>
                </span>
              ))}
            </button>
          )}
        </div>
      ) : (
        <p className="copy-note">Voor dit aanbod is geen code beschikbaar.</p>
      )}
      <div className="brand-card-bottom">
        {website ? (
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("shop", brand.id)}
            aria-label={`Open de webshop van ${brand.name} in een nieuw tabblad`}
          >
            Naar de webshop
            <ExternalLink aria-hidden="true" />
          </a>
        ) : (
          <span />
        )}
        <span className="copy-note" role="status">
          {copied
            ? "Code gekopieerd"
            : brand.code
              ? revealed
                ? "Tik om te kopiëren"
                : ""
              : ""}
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
