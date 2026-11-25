import { supabase } from "./supabase";

// Eigen, privacyvriendelijke statistiek: geen cookies, geen IP. Alleen een willekeurige id
// per browsersessie (sessionStorage), zodat we unieke bezoekers per dag kunnen tellen.
export type WebEvent = "view" | "reveal" | "copy" | "shop";

function visitor(): string {
  try {
    let id = sessionStorage.getItem("kortio-v");
    if (!id) {
      id = crypto.randomUUID().replace(/-/g, "").slice(0, 20);
      sessionStorage.setItem("kortio-v", id);
    }
    return id;
  } catch {
    return "anon-" + Math.random().toString(36).slice(2, 12);
  }
}

function referrer(): string | null {
  try {
    if (!document.referrer) return null;
    const host = new URL(document.referrer).hostname.replace(/^www\./, "");
    if (host === location.hostname.replace(/^www\./, "")) return null;
    return host.slice(0, 100);
  } catch {
    return null;
  }
}

// Herkomst van de sessie (google.com, instagram.com of leeg = direct), bewaard voor alle
// pagina's in die sessie zodat elke bezoeker bij precies één bron hoort.
function sessionReferrer(): string | null {
  try {
    let value = sessionStorage.getItem("kortio-r");
    if (value === null) {
      value = referrer() ?? "";
      sessionStorage.setItem("kortio-r", value);
    }
    return value || null;
  } catch {
    return referrer();
  }
}

export function track(event: WebEvent, brandId?: string) {
  if (typeof window === "undefined") return;
  if (navigator.webdriver) return; // bots en automatische tests niet meetellen
  if (location.pathname.startsWith("/admin") || location.pathname.startsWith("/login")) return;
  if (!/(^|\.)kortio\.app$/.test(location.hostname)) return; // geen lokale/preview-builds
  const payload = {
    event,
    path: location.pathname.slice(0, 200) || "/",
    brand_id: brandId ?? null,
    visitor: visitor(),
    referrer: sessionReferrer(),
    device: matchMedia("(pointer: coarse)").matches ? "mobile" : "desktop",
  };
  supabase
    .from("web_events")
    .insert(payload)
    .then(
      () => undefined,
      () => undefined,
    );
}
