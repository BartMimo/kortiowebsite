import { useEffect, useMemo, useState } from "react";
import { AdminLayout } from "./components/AdminLayout";
import { StatsRow } from "./components/StatsRow";
import { BrandGrid } from "./components/BrandGrid";
import { supabase } from "../lib/supabase";

export const AdminDashboard = () => {
  const [brands, setBrands] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any | null>(null);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from("admin_brands_overview").select("*");
    setBrands(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(
    () =>
      brands.filter(b =>
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
              onClick={() => setEditing({})}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-md"
            >
              Nieuw merk
            </button>
          </div>
        </header>

        <StatsRow totals={totals} />

        <section>
          {loading ? (
            <div className="text-slate-400">Laden…</div>
          ) : (
            <BrandGrid brands={filtered} onEdit={setEditing} />
          )}
        </section>

        {/* volgende stap: BrandDrawer hier */}
      </div>
    </AdminLayout>
  );
};