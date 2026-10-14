import { supabase } from "./supabase";
export { safeWebURL, isCurrentBrand } from "./brand-utils";
export type Category = { id: string; name: string };
export type Brand = {
  id: string;
  name: string;
  discount_text: string | null;
  code: string | null;
  website_url: string | null;
  primary_category_id: string | null;
  is_featured: boolean;
  is_temporary: boolean;
  valid_from: string | null;
  valid_until: string | null;
  url_image: string | null;
  category_name: string | null;
};
export type Catalog = { brands: Brand[]; categories: Category[] };
let request: Promise<Catalog> | null = null;
let cachedAt = 0;
export function loadCatalog(reload = false): Promise<Catalog> {
  if (!reload && request && Date.now() - cachedAt < 5 * 60 * 1000)
    return request;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  cachedAt = Date.now();
  const current = (async () => {
    try {
      const [brandsResult, categoriesResult] = await Promise.all([
        supabase
          .from("brands")
          .select(
            "id, name, discount_text, code, website_url, primary_category_id, is_featured, is_temporary, valid_from, valid_until, url_image",
          )
          .eq("is_active", true)
          .order("name")
          .abortSignal(controller.signal),
        supabase
          .from("categories")
          .select("id, name")
          .order("name")
          .abortSignal(controller.signal),
      ]);
      if (brandsResult.error || categoriesResult.error)
        throw new Error("De merken konden niet worden geladen.");
      const categories: Category[] = categoriesResult.data ?? [];
      const names = new Map(categories.map((c) => [c.id, c.name]));
      const brands = (brandsResult.data ?? []).map((b) => ({
        ...b,
        category_name: names.get(b.primary_category_id) ?? null,
      })) as Brand[];
      return { brands, categories };
    } finally {
      clearTimeout(timeout);
    }
  })();
  request = current;
  void current.catch(() => {
    if (request === current) request = null;
  });
  return current;
}
