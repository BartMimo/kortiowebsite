import { useEffect } from "react";
import { useLocation } from "react-router-dom";
export function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let timer: ReturnType<typeof setTimeout>;
    let disposed = false;
    let attempts = 0;
    const scroll = () => {
      if (disposed) return;
      if (!hash) {
        window.scrollTo({ top: 0, behavior: "instant" });
        return;
      }
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (target) {
        target.scrollIntoView({
          behavior: reduced ? "instant" : "smooth",
          block: "start",
        });
      } else if (attempts++ < 20) timer = setTimeout(scroll, 80);
    };
    timer = setTimeout(scroll, 0);
    return () => {
      disposed = true;
      clearTimeout(timer);
    };
  }, [pathname, hash]);
  return null;
}
