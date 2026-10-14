import { useContext, useEffect, useState } from "react";
import { Catalog, isCurrentBrand, loadCatalog } from "../lib/catalog";
import { CatalogContext } from "../components/CatalogProvider";
const empty: Catalog = { brands: [], categories: [] };
export function useCatalog() {
  const initial = useContext(CatalogContext);
  const [catalog, setCatalog] = useState<Catalog>(initial ?? empty);
  const [loading, setLoading] = useState(initial === null);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    let active = true;
    if (!initial || attempt > 0) setLoading(true);
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
  }, [attempt, initial]);
  return {
    brands: catalog.brands.filter(isCurrentBrand),
    categories: catalog.categories,
    loading,
    error,
    retry: () => setAttempt((n) => n + 1),
  };
}
