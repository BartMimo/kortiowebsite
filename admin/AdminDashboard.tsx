import { useEffect, useMemo, useState } from "react";
import { AdminLayout } from "./components/AdminLayout";
import StatsRow from "./components/StatsRow";
import StatisticsPanel from "./components/StatisticsPanel";
import { supabase } from "../lib/supabase";

export const AdminDashboard = () => {
  const [brands, setBrands] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [sortKey, setSortKey] = useState<any>('copied');
  const [sortDir, setSortDir] = useState<'asc'|'desc'>('desc');
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<any>({ is_active: true, is_temporary:false, valid_from:null, valid_until:null, is_featured:false });
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'stats'>('overview');

  const load = async () => {
    setLoading(true);
    const [{ data: brandsData }, { data: categoriesData }] = await Promise.all([
      supabase.from("admin_brands_overview").select("*"),
      supabase.from("categories").select('id,name').order('name'),
    ]);
    setBrands(brandsData ?? []);
    setCategories(categoriesData ?? []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(
    () =>
      brands.filter((b:any) =>
        [b.name, b.code, b.discount_text]
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase())
      ),
    [brands, search]
  );

  const totals = useMemo(
    () => ({
      brands: brands.length,
      favorites: brands.reduce((s, b) => s + b.favorites, 0),
      copied: brands.reduce((s, b) => s + b.copied, 0),
      shared: brands.reduce((s, b) => s + b.shared, 0),
      reported: brands.reduce((s, b) => s + b.reported, 0),
    }),
    [brands]
  );

  const save = async () => {
    if (!form.name || !form.discount_text || !form.primary_category_id) {
      alert('Naam, korting en categorie zijn verplicht');
      return;
    }
    if (form.is_temporary && (!form.valid_from || !form.valid_until)) {
      alert('Vul een geldige periode in');
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
      is_temporary: Boolean(form.is_temporary),
      is_featured: Boolean(form.is_featured),
      valid_from: form.is_temporary ? form.valid_from || null : null,
      valid_until: form.is_temporary ? form.valid_until || null : null,
    };

    try {
      let res;
      if (form.id) {
        res = await supabase.from('brands').update(payload).eq('id', form.id).select();
      } else {
        res = await supabase.from('brands').insert(payload).select();
      }
      if (res.error) {
        alert('Opslaan mislukt: ' + res.error.message);
        setSaving(false);
        return;
      }
    } catch (err:any) {
      alert('Onverwachte fout: ' + (err?.message ?? String(err)));
      setSaving(false);
      return;
    }

    setSaving(false);
    setModalOpen(false);
    await load();
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto w-full p-6">
        <header className="flex items-center justify-between gap-6 mb-6">
          <div>
            <h1 className="text-2xl font-extrabold">Dashboard</h1>
            <p className="text-sm text-slate-400">Beheer je merken en acties</p>
          </div>

            <div className="flex items-center gap-3">
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Zoek merk, code of korting"
              className="bg-white/5 px-4 py-2 rounded-lg border border-white/10 shadow-sm w-64"
            />
            <button
              onClick={() => {
                setForm({ is_active: true, is_temporary: false, valid_from: null, valid_until: null, is_featured: false });
                setModalOpen(true);
              }}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-md"
            >
              Nieuw merk
            </button>
          </div>
        </header>

        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <button onClick={() => setActiveTab('overview')} className={`px-3 py-2 rounded-lg ${activeTab === 'overview' ? 'bg-white/6' : 'bg-transparent'}`}>
              Dashboard
            </button>
            <button onClick={() => setActiveTab('stats')} className={`px-3 py-2 rounded-lg ${activeTab === 'stats' ? 'bg-white/6' : 'bg-transparent'}`}>
              Statistieken
            </button>
          </div>

          {activeTab === 'overview' && (
            <>
              <StatsRow totals={totals} />

              <section>
                {loading ? (
                  <div className="text-slate-400">Laden…</div>
                ) : (
                  <div className="bg-white/80 rounded-2xl border overflow-hidden shadow-sm">
                    <table className="w-full">
                      <thead className="bg-slate-100 text-xs uppercase text-slate-600 tracking-wide">
                        <tr>
                          <th className="px-6 py-3">Merk</th>
                          <th className="px-6 py-3">Categorie</th>
                          <th className="px-6 py-3">Code</th>
                          <th className="px-6 py-3">Uitgelicht</th>
                          <th className="px-6 py-3">Tijdelijk</th>
                          <th className="px-6 py-3">Periode</th>
                          <th className="px-6 py-3">❤️</th>
                          <th className="px-6 py-3">📋</th>
                          <th className="px-6 py-3">🔗</th>
                          <th className="px-6 py-3">⚠️</th>
                          <th />
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {filtered.map((b:any, idx:number) => (
                          <tr key={b.id} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                            <td className="px-6 py-4 font-semibold text-slate-800">{b.name}</td>
                            <td className="px-6 py-4 text-slate-600">{b.category_name ?? '—'}</td>
                            <td className="px-6 py-4 font-mono text-slate-700">{b.code ?? '—'}</td>
                            <td className="px-6 py-4">{b.is_featured ? 'Ja' : 'Nee'}</td>
                            <td className="px-6 py-4">{b.is_temporary ? 'Ja' : 'Nee'}</td>
                            <td className="px-6 py-4 text-sm text-slate-600">{b.is_temporary ? b.valid_from + ' – ' + b.valid_until : '—'}</td>
                            <td className="px-6 py-4 text-slate-700">{b.favorites}</td>
                            <td className="px-6 py-4 text-slate-700">{b.copied}</td>
                            <td className="px-6 py-4 text-slate-700">{b.shared}</td>
                            <td className="px-6 py-4 text-slate-700">{b.reported}</td>
                            <td className="px-6 py-4 text-right relative">
                              <button onClick={() => setMenuOpen(b.id)} className="p-2 rounded hover:bg-slate-100">⋯</button>
                              {menuOpen === b.id && (
                                <div className="absolute right-4 mt-2 bg-white border rounded-lg shadow-lg z-10">
                                  <button onClick={() => { setForm({ ...b, is_featured: b.is_featured ?? false }); setModalOpen(true); setMenuOpen(null); }} className="px-4 py-2 w-full text-left">Bewerken</button>
                                  <button onClick={async ()=>{ if(confirm('Merk deactiveren?')){ await supabase.from('brands').update({ is_active:false }).eq('id', b.id); await load(); }}} className="px-4 py-2 w-full text-left text-red-600">Deactiveren</button>
                                </div>
                              )}
                            </td>
                          </tr>
                        ))}

                        {loading && (
                          <tr>
                            <td colSpan={12} className="px-6 py-6 text-slate-500 text-center">Laden…</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
            </>
          )}

          {activeTab === 'stats' && (
            <div>
              <StatisticsPanel />
            </div>
          )}
        </div>

        {/* volgende stap: BrandDrawer hier */}
        {modalOpen && (
          <BrandModal form={form} setForm={setForm} categories={categories} saving={saving} onClose={() => setModalOpen(false)} onSave={save} />
        )}
      </div>
    </AdminLayout>
  );
};

const Input = ({ label, value, onChange, type = 'text' }: any) => (
  <>
    <label className="text-sm font-bold">{label}</label>
    <input type={type} value={value ?? ''} onChange={e => onChange(e.target.value)} className="w-full mb-3 px-3 py-2 border rounded" />
  </>
);

const BrandModal = ({ form, setForm, categories, saving, onClose, onSave }: any) => (
  <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
    <div className="bg-white w-full max-w-lg rounded-xl p-6">
      <h2 className="font-bold mb-4">{form.id ? 'Merk bewerken' : 'Nieuw merk'}</h2>

      <Input label="Naam" value={form.name} onChange={(v:any) => setForm((f:any)=>({...f,name:v}))} />
      <Input label="Website" value={form.website_url} onChange={(v:any) => setForm((f:any)=>({...f,website_url:v}))} />
      <Input label="Korting uitleg" value={form.discount_text} onChange={(v:any) => setForm((f:any)=>({...f,discount_text:v}))} />
      <Input label="Code" value={form.code} onChange={(v:any) => setForm((f:any)=>({...f,code:v}))} />

      <label className="text-sm font-bold">Categorie</label>
      <select value={form.primary_category_id ?? ''} onChange={e => setForm((f:any)=>({...f,primary_category_id:e.target.value}))} className="w-full mb-4 px-3 py-2 border rounded">
        <option value="">Kies categorie</option>
        {categories.map((c:any)=>(<option key={c.id} value={c.id}>{c.name}</option>))}
      </select>

      <label className="flex items-center gap-2 mb-4 text-sm font-bold">
        <input type="checkbox" checked={form.is_temporary ?? false} onChange={e => setForm((f:any)=>({...f,is_temporary:e.target.checked, ...(e.target.checked?{}:{valid_from:null,valid_until:null})}))} />
        Tijdelijke actie
      </label>

      {form.is_temporary && (
        <div className="grid grid-cols-2 gap-4 mb-4">
          <Input type="date" label="Geldig van" value={form.valid_from} onChange={(v:any)=>setForm((f:any)=>({...f,valid_from:v}))} />
          <Input type="date" label="Geldig t/m" value={form.valid_until} onChange={(v:any)=>setForm((f:any)=>({...f,valid_until:v}))} />
        </div>
      )}

      <label className="flex items-center gap-2 mb-4 text-sm font-bold">
        <input type="checkbox" checked={form.is_featured ?? false} onChange={e => setForm((f:any)=>({...f,is_featured:e.target.checked}))} />
        Uitgelicht
      </label>

      <div className="flex justify-end gap-3">
        <button onClick={onClose}>Annuleren</button>
        <button onClick={onSave} disabled={saving} className="bg-blue-600 text-white px-4 py-2 rounded">Opslaan</button>
      </div>
    </div>
  </div>
);