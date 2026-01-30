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
  Clock,
  Star,
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

  is_temporary: boolean;
  valid_from: string | null;
  valid_until: string | null;

  is_featured: boolean;

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
  | "reported"
  | "is_temporary"
  | "is_featured";

/* ───────────────── Utils ───────────────── */

const formatDate = (d: string | null) =>
  d ? new Date(d).toLocaleDateString("nl-NL") : "—";

/* ───────────────── Component ───────────────── */

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [brands, setBrands] = useState<BrandRow[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState("");

  const [sortKey, setSortKey] = useState<SortKey>("copied");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState<Partial<BrandRow>>({
    is_active: true,
    is_temporary: false,
    valid_from: null,
    valid_until: null,
    is_featured: false,
  });

  /* ───────── Auth ───────── */
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) navigate("/login");
    });
  }, [navigate]);

  /* ───────── Data ───────── */
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
  const totals = useMemo(() => ({
    brands: brands.length,
    favorites: brands.reduce((s, b) => s + b.favorites, 0),
    copied: brands.reduce((s, b) => s + b.copied, 0),
    shared: brands.reduce((s, b) => s + b.shared, 0),
    reported: brands.reduce((s, b) => s + b.reported, 0),
  }), [brands]);

  /* ───────── Sorting ───────── */
  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(d => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir(key === "name" ? "asc" : "desc");
    }
  };

  const visibleBrands = useMemo(() => {
    const filtered = brands.filter(b =>
      [b.name, b.code, b.discount_text]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
    );

    const dir = sortDir === "asc" ? 1 : -1;

    return filtered.sort((a, b) => {
      if (sortKey === "name") {
        return dir * a.name.localeCompare(b.name);
      }
      if (sortKey === "is_featured") {
        return dir * (Number(a.is_featured) - Number(b.is_featured));
      }
      if (sortKey === "is_temporary") {
        return dir * (Number(a.is_temporary) - Number(b.is_temporary));
      }
      return dir * ((a as any)[sortKey] - (b as any)[sortKey]);
    });
  }, [brands, search, sortKey, sortDir]);

  /* ───────── CRUD ───────── */
  const openCreate = () => {
    setForm({
      is_active: true,
      is_temporary: false,
      valid_from: null,
      valid_until: null,
      is_featured: false,
    });
    setModalOpen(true);
  };

  const openEdit = (b: BrandRow) => {
    setForm(b);
    setModalOpen(true);
    setMenuOpen(null);
  };

  const save = async () => {
    if (!form.name || !form.discount_text || !form.primary_category_id) {
      alert("Naam, korting en categorie zijn verplicht");
      return;
    }

    if (form.is_temporary && (!form.valid_from || !form.valid_until)) {
      alert("Vul een geldige periode in");
      return;
    }

    setSaving(true);

    const payload = {
      name: form.name,
      code: form.code ?? null,
      discount_text: form.discount_text,
      website_url: form.website_url ?? null,
      primary_category_id: form.primary_category_id,
      is_active: true,
      is_temporary: form.is_temporary ?? false,
      is_featured: form.is_featured ?? false,
      valid_from: form.is_temporary ? form.valid_from : null,
      valid_until: form.is_temporary ? form.valid_until : null,
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

  /* ───────── Render ───────── */
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
                  <Th onClick={() => toggleSort("name")}>Merk</Th>
                  <th className="px-6 py-3">Categorie</th>
                  <th className="px-6 py-3">Code</th>
                      <Th onClick={() => toggleSort("is_featured")}>Uitgelicht</Th>
                      <Th onClick={() => toggleSort("is_temporary")}>Tijdelijk</Th>
                  <th className="px-6 py-3">Periode</th>
                  <Th onClick={() => toggleSort("favorites")}>❤️</Th>
                  <Th onClick={() => toggleSort("copied")}>📋</Th>
                  <Th onClick={() => toggleSort("shared")}>🔗</Th>
                  <Th onClick={() => toggleSort("reported")}>⚠️</Th>
                  <th />
                </tr>
              </thead>

              <tbody>
                {visibleBrands.map(b => (
                  <tr key={b.id} className="border-t">
                    <td className="px-6 py-4 font-bold">{b.name}</td>
                    <td className="px-6 py-4">{b.category_name ?? "—"}</td>
                    <td className="px-6 py-4 font-mono">{b.code ?? "—"}</td>
                    <td className="px-6 py-4">
                      {b.is_featured ? (
                        <span className="inline-flex items-center gap-1 text-yellow-500">
                          <Star size={14} /> Ja
                        </span>
                      ) : (
                        "Nee"
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {b.is_temporary ? (
                        <span className="inline-flex items-center gap-1 text-orange-600">
                          <Clock size={14} /> Ja
                        </span>
                      ) : "Nee"}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {b.is_temporary
                        ? `${formatDate(b.valid_from)} – ${formatDate(b.valid_until)}`
                        : "—"}
                    </td>
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
                    <td colSpan={12} className="px-6 py-6 text-slate-500">
                      Laden…
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {modalOpen && (
        <BrandModal
          form={form}
          setForm={setForm}
          categories={categories}
          saving={saving}
          onClose={() => setModalOpen(false)}
          onSave={save}
        />
      )}
    </div>
  );
};

/* ───────────────── Modal ───────────────── */

const BrandModal = ({
  form,
  setForm,
  categories,
  saving,
  onClose,
  onSave,
}: any) => (
  <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
    <div className="bg-white w-full max-w-lg rounded-xl p-6">
      <h2 className="font-bold mb-4">
        {form.id ? "Merk bewerken" : "Nieuw merk"}
      </h2>

      <Input label="Naam" value={form.name} onChange={v => setForm((f:any)=>({...f,name:v}))} />
      <Input label="Website" value={form.website_url} onChange={v => setForm((f:any)=>({...f,website_url:v}))} />
      <Input label="Korting uitleg" value={form.discount_text} onChange={v => setForm((f:any)=>({...f,discount_text:v}))} />
      <Input label="Code" value={form.code} onChange={v => setForm((f:any)=>({...f,code:v}))} />

      <label className="text-sm font-bold">Categorie</label>
      <select
        value={form.primary_category_id ?? ""}
        onChange={e => setForm((f:any)=>({...f,primary_category_id:e.target.value}))}
        className="w-full mb-4 px-3 py-2 border rounded"
      >
        <option value="">Kies categorie</option>
        {categories.map((c:any)=>(
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>

      <label className="flex items-center gap-2 mb-4 text-sm font-bold">
        <input
          type="checkbox"
          checked={form.is_temporary ?? false}
          onChange={e =>
            setForm((f:any)=>({
              ...f,
              is_temporary: e.target.checked,
              ...(e.target.checked ? {} : { valid_from: null, valid_until: null })
            }))
          }
        />
        Tijdelijke actie
      </label>

      {form.is_temporary && (
        <div className="grid grid-cols-2 gap-4 mb-4">
          <Input type="date" label="Geldig van" value={form.valid_from} onChange={v => setForm((f:any)=>({...f,valid_from:v}))} />
          <Input type="date" label="Geldig t/m" value={form.valid_until} onChange={v => setForm((f:any)=>({...f,valid_until:v}))} />
        </div>
      )}

      <label className="flex items-center gap-2 mb-4 text-sm font-bold">
        <input
          type="checkbox"
          checked={form.is_featured ?? false}
          onChange={e => setForm((f:any)=>({...f, is_featured: e.target.checked}))}
        />
        Uitgelicht
      </label>

      <div className="flex justify-end gap-3">
        <button onClick={onClose}>Annuleren</button>
        <button onClick={onSave} disabled={saving} className="bg-blue-600 text-white px-4 py-2 rounded">
          <Save size={16}/> Opslaan
        </button>
      </div>
    </div>
  </div>
);

/* ───────────────── Helpers ───────────────── */

const Kpi = ({ label, value, icon: Icon }: any) => (
  <div className="bg-white p-6 rounded-xl border">
    <Icon className="text-blue-600 mb-2" />
    <div className="text-2xl font-black">{value}</div>
    <div className="text-slate-500">{label}</div>
  </div>
);

const Th = ({ children, onClick }: any) => (
  <th onClick={onClick} className="px-6 py-3 cursor-pointer">
    {children}
  </th>
);

const Input = ({ label, value, onChange, type="text" }: any) => (
  <>
    <label className="text-sm font-bold">{label}</label>
    <input
      type={type}
      value={value ?? ""}
      onChange={e => onChange(e.target.value)}
      className="w-full mb-3 px-3 py-2 border rounded"
    />
  </>
);