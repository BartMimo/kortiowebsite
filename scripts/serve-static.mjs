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
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".apk": "application/vnd.android.package-archive",
};
createServer(async (req, res) => {
  try {
    const url = new URL(req.url, "http://127.0.0.1");
    const path = decodeURIComponent(url.pathname);
    const redirect = config.redirects.find((r) => r.source === path);
    if (redirect) {
      res.writeHead(308, { Location: redirect.destination + url.search });
      res.end();
      return;
    }
    const rewrite = config.rewrites.find((r) => r.source === path);
    const file = resolve(
      root,
      `.${rewrite?.destination ?? (path === "/" ? "/index.html" : path)}`,
    );
    if (!file.startsWith(root + "/")) {
      res.writeHead(400);
      res.end();
      return;
    }
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
    if (["/admin", "/login", "/privacy"].includes(path) || status === 404)
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
