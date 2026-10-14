import { useEffect, useState } from "react";
import { Catalog, isCurrentBrand, loadCatalog } from "../lib/catalog";
const empty: Catalog = { brands: [], categories: [] };
export function useCatalog() {
  const [catalog, setCatalog] = useState<Catalog>(empty);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(false);
    loadCatalog(attempt > 0)
      .then((data) => {
        if (active) setCatalog(data);
      })
      .catch(() => {
        if (active) setError(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [attempt]);
  return {
    brands: catalog.brands.filter(isCurrentBrand),
    categories: catalog.categories,
    loading,
    error,
    retry: () => setAttempt((n) => n + 1),
  };
}
