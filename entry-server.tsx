import { PassThrough } from "node:stream";
import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import type { HelmetServerState } from "react-helmet-async";
import App from "./App";
import { CatalogContext } from "./components/CatalogProvider";
import { isCurrentBrand, loadCatalog } from "./lib/catalog";
import type { Catalog } from "./lib/catalog";
export { serializeJSON } from "./lib/seo";
export { slugify } from "./lib/slug";
export { relatedBrands } from "./lib/brand-seo";
export { categoryPages } from "./lib/categories";

export async function getPublicCatalog(): Promise<Catalog> {
  const catalog = await loadCatalog();
  return { ...catalog, brands: catalog.brands.filter(isCurrentBrand) };
}
// Actieve merken waarvan de tijdelijke code is verlopen: hun pagina blijft bestaan (zonder code),
// zodat de plek in Google niet verloren gaat tot er een nieuwe code is. Nog niet gestarte acties niet.
export async function getExpiredBrands() {
  const catalog = await loadCatalog();
  const today = new Date().toLocaleDateString("sv-SE", { timeZone: "Europe/Amsterdam" });
  return catalog.brands.filter(
    (b) => !isCurrentBrand(b) && !(b.valid_from && b.valid_from.slice(0, 10) > today),
  );
}
export function render(url: string, catalog: Catalog | null) {
  return new Promise<{ html: string; head: string }>((resolve, reject) => {
    const context: { helmet?: HelmetServerState } = {};
    const output = new PassThrough();
    let html = "";
    let renderError: unknown;
    const timeout = setTimeout(() => {
      stream.abort();
      reject(new Error("Prerender timed out."));
    }, 15000);
    output.on("data", (chunk) => {
      html += chunk.toString();
    });
    output.on("error", reject);
    output.on("end", () => {
      clearTimeout(timeout);
      if (renderError) return reject(renderError);
      const helmet = context.helmet!;
      resolve({
        html,
        head: [helmet.title, helmet.meta, helmet.link, helmet.script]
          .map((tag) => tag.toString())
          .join("\n"),
      });
    });
    const stream = renderToPipeableStream(
      <HelmetProvider context={context}>
        <CatalogContext.Provider value={catalog}>
          <StaticRouter location={url}>
            <App />
          </StaticRouter>
        </CatalogContext.Provider>
      </HelmetProvider>,
      {
        onAllReady() {
          stream.pipe(output);
        },
        onError(error) {
          renderError = error;
        },
        onShellError(error) {
          clearTimeout(timeout);
          reject(error);
        },
      },
    );
  });
}
