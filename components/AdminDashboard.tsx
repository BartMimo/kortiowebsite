import React, { useEffect, useMemo, useState } from "react";
import {
  LayoutDashboard,
  Tag,
  Users,
  BarChart3,
  Plus,
  Search,
  MoreVertical,
  LogOut,
  Pencil,
  Trash2,
  Save,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { Logo } from "./ui/Logo";

/* ───────────────── Types ───────────────── */

type BrandRow = {
  id: string;
  name: string;
  code: string | null;
  discount_text: string;
  website_url: string | null;
  is_active: boolean;
  primary_category_id: string;
  created_at: string;

  favorites: number;
  copied: number;
  shared: number;
  reported: number;

  category_name: string | null;
};

type Category = {
  id: string;
  name: string;
};

type SortKey =
  | "name"
  | "favorites"
  | "copied"
  | "shared"
  | "reported";

/* ───────────────── Component ───────────────── */

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  /* ───────── State ───────── */
  const [loading, setLoading] = useState(true);
  const [brands, setBrands] = useState<BrandRow[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState<string | null>(null);

  const [sortKey, setSortKey] = useState<SortKey>("copied");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<Partial<BrandRow>>({ is_active: true });

  /* ───────── Auth guard ───────── */
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) navigate("/login");
    });
  }, [navigate]);

  /* ───────── Data load ───────── */
  const load = async () => {
    setLoading(true);

    const [{ data: brandsData }, { data: categoriesData }] = await Promise.all([
      supabase.from("admin_brands_overview").select("*"),
      supabase.from("categories").select("id, name").order("name"),
    ]);

    setBrands((brandsData ?? []) as BrandRow[]);
    setCategories((categoriesData ?? []) as Category[]);
    setLoading(false);
  };

  useEffect(() => {
    load();

    const channel = supabase
      .channel("brands-admin-live")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "brands" },
        load
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  /* ───────── KPIs ───────── */
  const totals = useMemo(() => {
    return {
      brands: brands.length,
      favorites: brands.reduce((s, b) => s + b.favorites, 0),
      copied: brands.reduce((s, b) => s + b.copied, 0),
      shared: brands.reduce((s, b) => s + b.shared, 0),
      reported: brands.reduce((s, b) => s + b.reported, 0),
    };
  }, [brands]);

  /* ───────── Sorting logic ───────── */
  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(d => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir(key === "name" ? "asc" : "desc");
    }
  };

  const sortedAndFiltered = useMemo(() => {
    const filtered = brands.filter(b =>
      [b.name, b.code, b.discount_text]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
    );

    return [...filtered].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];

      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortDir === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }

      return sortDir === "asc"
        ? (aVal as number) - (bVal as number)
        : (bVal as number) - (aVal as number);
    });
  }, [brands, search, sortKey, sortDir]);

  /* ───────── CRUD ───────── */
  const openCreate = () => {
    setForm({ is_active: true });
    setModalOpen(true);
  };

  const openEdit = (b: BrandRow) => {
    setForm(b);
    setModalOpen(true);
    setMenuOpen(null);
  };

  const save = async () => {
    if (!form.name || !form.discount_text || !form.primary_category_id) {
      alert("Naam, korting en categorie zijn verplicht.");
      return;
    }

    setSaving(true);

    const payload = {
      name: form.name,
      code: form.code ?? null,
      discount_text: form.discount_text,
      website_url: form.website_url ?? null,
      is_active: form.is_active ?? true,
      primary_category_id: form.primary_category_id,
    };

    if (form.id) {
      await supabase.from("brands").update(payload).eq("id", form.id);
    } else {
      await supabase.from("brands").insert(payload);
    }

    setSaving(false);
    setModalOpen(false);
    load();
  };

  const deactivate = async (id: string) => {
    if (!confirm("Merk deactiveren?")) return;
    await supabase.from("brands").update({ is_active: false }).eq("id", id);
    load();
  };

  /* ───────── UI ───────── */
  const SortIcon = ({ col }: { col: SortKey }) =>
    sortKey === col ? (
      sortDir === "asc" ? (
        <ChevronUp size={14} />
      ) : (
        <ChevronDown size={14} />
      )
    ) : null;

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r hidden lg:flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <Logo className="w-8 h-8" />
          <span className="font-bold text-xl">Kortio Admin</span>
        </div>
        <nav className="flex-1 px-4">
          <div className="px-4 py-3 bg-blue-50 text-blue-600 rounded-xl font-bold flex gap-3">
            <LayoutDashboard size={20} /> Dashboard
          </div>
        </nav>
        <button
          onClick={() => supabase.auth.signOut().then(() => navigate("/login"))}
          className="m-4 px-4 py-3 flex gap-3 hover:bg-red-50 text-slate-500 hover:text-red-600 rounded-xl"
        >
          <LogOut size={20} /> Uitloggen
        </button>
      </aside>

      {/* Main */}
      <main className="flex-1">
        <header className="h-20 bg-white border-b flex items-center justify-between px-8">
          <h1 className="text-xl font-bold">Overzicht</h1>
          <div className="flex gap-4 items-center">
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Zoek merk of code"
              className="px-4 py-2 rounded-lg bg-slate-100"
            />
            <button
              onClick={openCreate}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex gap-2"
            >
              <Plus size={18} /> Nieuw merk
            </button>
          </div>
        </header>

        <div className="p-8">
          {/* KPIs */}
          <div className="grid grid-cols-5 gap-6 mb-8">
            <Kpi label="Merken" value={totals.brands} icon={Tag} />
            <Kpi label="Favorieten" value={totals.favorites} icon={Users} />
            <Kpi label="Gekopieerd" value={totals.copied} icon={BarChart3} />
            <Kpi label="Gedeeld" value={totals.shared} icon={BarChart3} />
            <Kpi label="Gerapporteerd" value={totals.reported} icon={BarChart3} />
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl border overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                <tr>
                  <Th onClick={() => toggleSort("name")}>
                    Merk <SortIcon col="name" />
                  </Th>
                  <th className="px-6 py-3">Categorie</th>
                  <th className="px-6 py-3">Code</th>
                  <Th onClick={() => toggleSort("favorites")}>
                    Favorieten <SortIcon col="favorites" />
                  </Th>
                  <Th onClick={() => toggleSort("copied")}>
                    Gekopieerd <SortIcon col="copied" />
                  </Th>
                  <Th onClick={() => toggleSort("shared")}>
                    Gedeeld <SortIcon col="shared" />
                  </Th>
                  <Th onClick={() => toggleSort("reported")}>
                    Reports <SortIcon col="reported" />
                  </Th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {sortedAndFiltered.map(b => (
                  <tr key={b.id} className="border-t">
                    <td className="px-6 py-4 font-bold">{b.name}</td>
                    <td className="px-6 py-4">{b.category_name ?? "—"}</td>
                    <td className="px-6 py-4 font-mono">{b.code ?? "—"}</td>
                    <td className="px-6 py-4">{b.favorites}</td>
                    <td className="px-6 py-4">{b.copied}</td>
                    <td className="px-6 py-4">{b.shared}</td>
                    <td className="px-6 py-4">{b.reported}</td>
                    <td className="px-6 py-4 text-right relative">
                      <button onClick={() => setMenuOpen(b.id)}>
                        <MoreVertical />
                      </button>
                      {menuOpen === b.id && (
                        <div className="absolute right-4 mt-2 bg-white border rounded-lg shadow">
                          <button
                            onClick={() => openEdit(b)}
                            className="px-4 py-2 flex gap-2"
                          >
                            <Pencil size={16} /> Bewerken
                          </button>
                          <button
                            onClick={() => deactivate(b.id)}
                            className="px-4 py-2 flex gap-2 text-red-600"
                          >
                            <Trash2 size={16} /> Deactiveren
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
                {loading && (
                  <tr>
                    <td colSpan={8} className="px-6 py-6 text-slate-500">
                      Laden…
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
          <div className="bg-white w-full max-w-lg rounded-xl p-6">
            <h2 className="font-bold mb-4">
              {form.id ? "Merk bewerken" : "Nieuw merk"}
            </h2>

            <Input label="Naam" value={form.name} onChange={v => setForm(f => ({ ...f, name: v }))} />
            <Input label="Website" value={form.website_url} onChange={v => setForm(f => ({ ...f, website_url: v }))} />
            <Input label="Korting uitleg" value={form.discount_text} onChange={v => setForm(f => ({ ...f, discount_text: v }))} />
            <Input label="Code" value={form.code} onChange={v => setForm(f => ({ ...f, code: v }))} />

            <label className="text-sm font-bold">Categorie</label>
            <select
              value={form.primary_category_id ?? ""}
              onChange={e =>
                setForm(f => ({ ...f, primary_category_id: e.target.value }))
              }
              className="w-full mb-4 px-3 py-2 border rounded"
            >
              <option value="">Kies categorie</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>

            <div className="flex justify-end gap-3">
              <button onClick={() => setModalOpen(false)}>Annuleren</button>
              <button onClick={save} disabled={saving} className="bg-blue-600 text-white px-4 py-2 rounded">
                <Save size={16} /> Opslaan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ───────────────── Helpers ───────────────── */

const Kpi = ({ label, value, icon: Icon }: any) => (
  <div className="bg-white p-6 rounded-xl border">
    <Icon className="text-blue-600 mb-2" />
    <div className="text-2xl font-black">{value}</div>
    <div className="text-slate-500">{label}</div>
  </div>
);

const Th = ({ children, onClick }: any) => (
  <th
    onClick={onClick}
    className="px-6 py-3 cursor-pointer select-none hover:text-slate-900"
  >
    <div className="flex items-center gap-1">{children}</div>
  </th>
);

const Input = ({ label, value, onChange }: any) => (
  <>
    <label className="text-sm font-bold">{label}</label>
    <input
      value={value ?? ""}
      onChange={e => onChange(e.target.value)}
      className="w-full mb-3 px-3 py-2 border rounded"
    />
  </>
);