import path from "path";
import { readFile, writeFile } from "node:fs/promises";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: { port: 3000, host: "localhost" },
  plugins: [
    react(),
    {
      name: "kortio-not-found-page",
      apply: "build",
      async closeBundle() {
        const index = await readFile(
          path.resolve(__dirname, "dist/index.html"),
          "utf8",
        );
        const notFound = index
          .replace(
            /<title>[^<]*<\/title>/,
            "<title>Pagina niet gevonden — Kortio</title>",
          )
          .replace(/<link\s+rel="canonical"[^>]*>/, "")
          .replace(
            "</head>",
            '<meta name="robots" content="noindex, nofollow" /></head>',
          );
        await writeFile(path.resolve(__dirname, "dist/404.html"), notFound);
      },
    },
  ],
  resolve: { alias: { "@": path.resolve(__dirname, ".") } },
  build: {
    sourcemap: false,
    minify: "esbuild",
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          icons: ["lucide-react"],
          supabase: ["@supabase/supabase-js"],
        },
      },
    },
  },
});
