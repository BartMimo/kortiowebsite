import { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabase";
import BrandDrawer from "./BrandDrawer";

/* ───────── Types ───────── */

type Brand = {
  id: string;
  name: string;
  category_name: string | null;
  primary_category_id: string | null;
  website_url: string | null;
  code: string | null;
  discount_text: string | null;

  favorited: number;
  copied: number;
  open_website: number;
  reported: number;

  is_temporary: boolean;
  valid_from: string | null;
  valid_until: string | null;
  is_featured: boolean;
  is_active: boolean;
};

type Category = {
  id: string;
  name: string;
};

type SortState = {
  key: keyof Brand;
  dir: "asc" | "desc";
};

/* ───────── Component ───────── */

export default function AdminDashboard() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editing, setEditing] = useState<Brand | null>(null);
  const [appDownloads, setAppDownloads] = useState<{ ios: number; android: number }>({ ios: 0, android: 0 });

  const [sort, setSort] = useState<SortState>({
    key: "name",
    dir: "asc",
  });

  const [form, setForm] = useState<any>({});

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const [{ data: brandsData }, { data: categoriesData }, { data: downloadsData }] =
      await Promise.all([
        supabase.from("admin_brands_overview").select("*"),
        supabase.from("categories").select("id, name").order("name"),
        supabase.from("app_downloads").select("platform"),
      ]);

    setBrands(Array.isArray(brandsData) ? brandsData : []);
    setCategories(Array.isArray(categoriesData) ? categoriesData : []);

    // Count downloads
    const counts = { ios: 0, android: 0 };
    if (downloadsData) {
      downloadsData.forEach(item => {
        if (item.platform === 'ios') counts.ios++;
        if (item.platform === 'android') counts.android++;
      });
    }
    setAppDownloads(counts);
  }

  /* ───────── Totals ───────── */

  const totals = useMemo(() => ({
    favorited: brands.reduce((s, b) => s + b.favorited, 0),
    copied: brands.reduce((s, b) => s + b.copied, 0),
    open_website: brands.reduce((s, b) => s + b.open_website, 0),
    reported: brands.reduce((s, b) => s + b.reported, 0),
  }), [brands]);

  /* ───────── Sorting ───────── */

  const sortedBrands = useMemo(() => {
    const dir = sort.dir === "asc" ? 1 : -1;

    return [...brands].sort((a, b) => {
      const av = a[sort.key];
      const bv = b[sort.key];

      if (av == null && bv == null) return 0;
      if (av == null) return 1;
      if (bv == null) return -1;

      if (typeof av === "string") {
        return dir * av.localeCompare(String(bv));
      }

      return dir * ((av as number) - (bv as number));
    });
  }, [brands, sort]);

  function toggleSort(key: keyof Brand) {
    setSort(s =>
      s.key === key
        ? { key, dir: s.dir === "asc" ? "desc" : "asc" }
        : { key, dir: "asc" }
    );
  }

  /* ───────── Drawer ───────── */

  function openCreate() {
    setEditing(null);
    setForm({
      name: "",
      primary_category_id: "",
      website_url: "",
      code: "",
      discount_text: "",
      is_temporary: false,
      valid_from: "",
      valid_until: "",
      is_featured: false,
      is_active: true,
    });
    setDrawerOpen(true);
  }

  function openEdit(b: Brand) {
    setEditing(b);
    setForm({ ...b });
    setDrawerOpen(true);
  }

  async function saveBrand(e: React.FormEvent) {
    e.preventDefault();

    const payload = {
      name: form.name,
      primary_category_id: form.primary_category_id,
      website_url: form.website_url || null,
      code: form.code || null,
      discount_text: form.discount_text || null,
      is_temporary: form.is_temporary,
      valid_from: form.is_temporary ? form.valid_from || null : null,
      valid_until: form.is_temporary ? form.valid_until || null : null,
      is_featured: form.is_featured,
      is_active: form.is_active,
    };

    if (editing) {
      await supabase.from("brands").update(payload).eq("id", editing.id);
    } else {
      await supabase.from("brands").insert(payload);
    }

    setDrawerOpen(false);
    load();
  }

  /* ───────── Render ───────── */

  return (
    <div className="min-h-screen bg-slate-50 p-8 max-w-[1600px] mx-auto">
      <h1 className="text-2xl font-bold mb-6">Admin dashboard</h1>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <Kpi label="Favorieten" value={totals.favorited} />
        <Kpi label="Gekopieerd" value={totals.copied} />
        <Kpi label="Website geopend" value={totals.open_website} />
        <Kpi label="Gerapporteerd" value={totals.reported} />
      </div>

      {/* App Downloads */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <Kpi label="iOS Downloads" value={appDownloads.ios} />
        <Kpi label="Android Downloads" value={appDownloads.android} />
      </div>
        <header className="flex items-center justify-between gap-6 mb-6">
          <div>
            <a href="/" className="inline-flex items-center text-sm text-slate-600 hover:text-slate-800 mb-2">← Terug naar website</a>
            <h1 className="text-2xl font-extrabold">Dashboard</h1>
            <p className="text-sm text-slate-400">Beheer je merken en acties</p>
          </div>
        </header>

      <div className="flex justify-end mb-4">
        <button
          onClick={openCreate}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white"
        >
          Nieuw merk
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <Th onClick={() => toggleSort("name")}>Naam</Th>
              <Th onClick={() => toggleSort("category_name")}>Categorie</Th>
              <Th>Website</Th>
              <Th>Code</Th>
              <Th onClick={() => toggleSort("is_temporary")}>Tijdelijk</Th>
              <Th onClick={() => toggleSort("is_featured")}>⭐</Th>
              <Th onClick={() => toggleSort("favorited")}>❤️</Th>
              <Th onClick={() => toggleSort("copied")}>📋</Th>
              <Th onClick={() => toggleSort("open_website")}>🔗</Th>
              <Th onClick={() => toggleSort("reported")}>⚠️</Th>
              <Th onClick={() => toggleSort("is_active")}>Actief</Th>
              <Th />
            </tr>
          </thead>

          <tbody>
            {sortedBrands.map(b => (
              <tr key={b.id} className="border-t hover:bg-slate-50">
                <td className="px-6 py-3 font-medium">{b.name}</td>
                <td className="px-6 py-3">{b.category_name ?? "-"}</td>
                <td className="px-6 py-3">
                  {b.website_url ? (
                    <a
                      href={b.website_url}
                      target="_blank"
                      className="text-blue-600 hover:underline"
                    >
                      {new URL(b.website_url).hostname}
                    </a>
                  ) : "-"}
                </td>
                <td className="px-6 py-3 font-mono">{b.code ?? "-"}</td>
                <td className="px-6 py-3">
                  {b.is_temporary
                    ? `⏱️ ${b.valid_from ?? "?"} → ${b.valid_until ?? "?"}`
                    : "—"}
                </td>
                <td className="px-6 py-3">{b.is_featured ? "⭐" : ""}</td>
                <td className="px-6 py-3">{b.favorited}</td>
                <td className="px-6 py-3">{b.copied}</td>
                <td className="px-6 py-3">{b.open_website}</td>
                <td className="px-6 py-3">{b.reported}</td>
                <td className="px-6 py-3">{b.is_active ? "Ja" : "Nee"}</td>
                <td className="px-6 py-3 text-right">
                  <button
                    onClick={() => openEdit(b)}
                    className="text-blue-600 hover:underline"
                  >
                    Bewerken
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <BrandDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSave={saveBrand}
        form={form}
        setForm={setForm}
        categories={categories}
        editing={!!editing}
      />
    </div>
  );
}

/* ───────── UI helpers ───────── */

function Kpi({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow">
      <div className="text-xs text-slate-500 mb-1">{label}</div>
      <div className="text-3xl font-bold">{value}</div>
    </div>
  );
}

function Th({
  children,
  onClick,
}: {
  children?: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <th
      onClick={onClick}
      className={`px-6 py-3 text-left text-xs font-semibold ${
        onClick ? "cursor-pointer hover:text-blue-600" : ""
      }`}
    >
      {children}
    </th>
  );
}