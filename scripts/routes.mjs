// The build, local production server and artifact audit share these paths.
export const routes = [
  { path: "/", file: "index.html", indexable: true, catalog: true },
  { path: "/merken", file: "merken.html", indexable: true, catalog: true },
  { path: "/merk-toevoegen", file: "merk-toevoegen.html", indexable: true },
  {
    path: "/kortingscode-gebruiken",
    file: "kortingscode-gebruiken.html",
    indexable: true,
  },
  { path: "/privacy", file: "privacy.html", indexable: false },
  { path: "/login", file: "login.html", indexable: false },
  { path: "/admin", file: "admin.html", indexable: false },
  { path: "/404-not-found", file: "404.html", indexable: false },
];
