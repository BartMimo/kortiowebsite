import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ isSsrBuild }) => ({
  server: { port: 3000, host: "localhost" },
  publicDir: isSsrBuild ? false : "public",
  plugins: [react()],
  resolve: { alias: { "@": path.resolve(__dirname, ".") } },
  build: {
    sourcemap: false,
    minify: "esbuild",
    chunkSizeWarningLimit: 600,
    rollupOptions: isSsrBuild
      ? {}
      : {
          output: {
            manualChunks: {
              vendor: ["react", "react-dom", "react-router-dom"],
              icons: ["lucide-react"],
              supabase: ["@supabase/supabase-js"],
            },
          },
        },
  },
}));
