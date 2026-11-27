import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { resolve, extname } from "node:path";

const config = JSON.parse(await readFile("vercel.json", "utf8"));
const root = resolve("dist");
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".json": "application/json",
  ".xml": "application/xml",
  ".txt": "text/plain",
  ".webp": "image/webp",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".apk": "application/vnd.android.package-archive",
};
createServer(async (req, res) => {
  try {
    const url = new URL(req.url, "http://127.0.0.1");
    const path = decodeURIComponent(url.pathname);
    // Zelfde volgorde als Vercel: slash aan het eind weg, redirects, dan rewrites (met :slug).
    if (config.trailingSlash === false && path.length > 1 && path.endsWith("/")) {
      res.writeHead(308, { Location: path.slice(0, -1) + url.search });
      res.end();
      return;
    }
    const redirect = config.redirects.find((r) => r.source === path);
    if (redirect) {
      res.writeHead(308, { Location: redirect.destination + url.search });
      res.end();
      return;
    }
    const candidates = [];
    for (const r of config.rewrites) {
      const pattern = new RegExp(
        "^" + r.source.replace(/:([a-z]+)/g, "(?<$1>[^/]+)") + "$",
      );
      const m = path.match(pattern);
      if (m)
        candidates.push(
          r.destination.replace(/:([a-z]+)/g, (_, k) => m.groups?.[k] ?? ""),
        );
    }
    candidates.push(path === "/" ? "/index.html" : path);
    let file = null;
    for (const c of candidates) {
      const f = resolve(root, `.${c}`);
      if (!f.startsWith(root + "/")) {
        res.writeHead(400);
        res.end();
        return;
      }
      try {
        await readFile(f);
        file = f;
        break;
      } catch {}
    }
    file ??= resolve(root, "404-missing");
    let body;
    let status = 200;
    let mime = types[extname(file)] ?? "application/octet-stream";
    try {
      body = await readFile(file);
    } catch {
      body = await readFile(resolve(root, "404.html"));
      status = 404;
      mime = types[".html"];
    }
    const headers = { "Content-Type": mime, "Cache-Control": "no-cache" };
    if (["/admin", "/login", "/privacy", "/voorwaarden"].includes(path) || status === 404)
      headers["X-Robots-Tag"] = "noindex, nofollow";
    res.writeHead(status, headers);
    res.end(req.method === "HEAD" ? undefined : body);
  } catch {
    res.writeHead(400);
    res.end();
  }
}).listen(4173, "127.0.0.1", () =>
  console.log("Kortio static production preview: http://127.0.0.1:4173"),
);
