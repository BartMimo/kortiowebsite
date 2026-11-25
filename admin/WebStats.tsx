import { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabase";
import { slugify } from "../lib/slug";

// Websitestatistiek uit web_events (via admin_web_stats / admin_web_referrers).

type Row = {
  day: string;
  path: string | null; // null = hele site die dag
  views: number;
  visitors: number;
  reveals: number;
  copies: number;
  shops: number;
};
type BrandRow = {
  brand_id: string;
  name: string;
  reveals: number;
  copies: number;
  shops: number;
  visitors: number;
  pageViews: number; // weergaven van de eigen merkpagina /m/<merk>
};
type Referrer = { referrer: string; views: number; visitors: number };
type Metric = "views" | "visitors" | "reveals" | "copies" | "shops";
type PageTotals = Omit<Row, "day">;

const METRICS: { key: Metric; label: string }[] = [
  { key: "visitors", label: "Bezoekers" },
  { key: "views", label: "Weergaven" },
  { key: "reveals", label: "Code onthuld" },
  { key: "copies", label: "Opnieuw gekopieerd" },
  { key: "shops", label: "Naar webshop" },
];

const RANGES = [7, 30, 90];

function dayLabel(day: string) {
  return new Intl.DateTimeFormat("nl-NL", {
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(new Date(day + "T12:00:00"));
}

function pageLabel(path: string) {
  if (path === "/") return "Home";
  const m = path.match(/^\/m\/(.+)$/);
  return m ? `Merk: ${decodeURIComponent(m[1])}` : path;
}

function lastDays(days: number) {
  const out: string[] = [];
  const today = new Date(
    new Date().toLocaleDateString("sv-SE", { timeZone: "Europe/Amsterdam" }) + "T12:00:00",
  );
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    out.push(d.toLocaleDateString("sv-SE"));
  }
  return out;
}

function pct(part: number, whole: number) {
  return whole ? `${Math.round((part / whole) * 100)}%` : "–";
}

export default function WebStats() {
  const [days, setDays] = useState(30);
  const [rows, setRows] = useState<Row[]>([]);
  const [referrers, setReferrers] = useState<Referrer[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [metric, setMetric] = useState<Metric>("visitors");
  const [page, setPage] = useState<string | null>(null);
  const [sort, setSort] = useState<keyof PageTotals>("visitors");
  const [filter, setFilter] = useState("");
  const [brandRows, setBrandRows] = useState<Omit<BrandRow, "pageViews">[]>([]);
  const [brandError, setBrandError] = useState("");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    Promise.all([
      supabase.rpc("admin_web_stats", { days }),
      supabase.rpc("admin_web_referrers", { days }),
      supabase.rpc("admin_web_brands", { days }),
    ]).then(([stats, refs, brandsRes]) => {
      if (cancelled) return;
      if (stats.error) setError(stats.error.message);
      else setError("");
      const num = (r: any): Row => ({
        ...r,
        views: Number(r.views),
        visitors: Number(r.visitors),
        reveals: Number(r.reveals),
        copies: Number(r.copies),
        shops: Number(r.shops),
      });
      setRows((stats.data ?? []).map(num));
      setReferrers(
        (refs.data ?? []).map((r: any) => ({
          referrer: r.referrer,
          views: Number(r.views),
          visitors: Number(r.visitors),
        })),
      );
      setBrandError(brandsRes.error ? brandsRes.error.message : "");
      setBrandRows(
        (brandsRes.data ?? []).map((r: any) => ({
          brand_id: r.brand_id,
          name: r.name,
          reveals: Number(r.reveals),
          copies: Number(r.copies),
          shops: Number(r.shops),
          visitors: Number(r.visitors),
        })),
      );
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [days]);

  // Zonder gekozen pagina: de site-rijen (path null), zodat een bezoeker die 3 pagina's
  // bekijkt één keer telt. Totaal over meerdere dagen = som van de unieke bezoekers per dag.
  const scoped = useMemo(() => rows.filter((r) => r.path === page), [rows, page]);
  const totals = useMemo(() => {
    const t = { views: 0, visitors: 0, reveals: 0, copies: 0, shops: 0 };
    for (const r of scoped) for (const m of METRICS) t[m.key] += r[m.key];
    return t;
  }, [scoped]);

  const perDay = useMemo(() => {
    const map = new Map<string, Record<Metric, number>>();
    for (const d of lastDays(days))
      map.set(d, { views: 0, visitors: 0, reveals: 0, copies: 0, shops: 0 });
    for (const r of scoped) {
      const e = map.get(r.day);
      if (!e) continue;
      for (const m of METRICS) e[m.key] += r[m.key];
    }
    return [...map.entries()];
  }, [scoped, days]);

  const pages = useMemo(() => {
    const map = new Map<string, PageTotals>();
    for (const r of rows) {
      if (r.path === null) continue;
      const e =
        map.get(r.path) ??
        { path: r.path, views: 0, visitors: 0, reveals: 0, copies: 0, shops: 0 };
      for (const m of METRICS) e[m.key] += r[m.key];
      map.set(r.path, e);
    }
    const q = filter.trim().toLowerCase();
    return [...map.values()]
      .filter((p) => !q || p.path.toLowerCase().includes(q))
      .sort((a, b) =>
        sort === "path" ? a.path.localeCompare(b.path) : (b[sort] as number) - (a[sort] as number),
      );
  }, [rows, sort, filter]);

  // Merken: acties (alle pagina's) plus weergaven van de eigen merkpagina.
  const brandTable = useMemo<BrandRow[]>(() => {
    const views = new Map<string, number>();
    for (const r of rows)
      if (r.path?.startsWith("/m/")) views.set(r.path, (views.get(r.path) ?? 0) + r.views);
    return brandRows.map((b) => ({ ...b, pageViews: views.get(`/m/${slugify(b.name)}`) ?? 0 }));
  }, [brandRows, rows]);

  const max = Math.max(1, ...perDay.map(([, v]) => v[metric]));

  return (
    <section className="mb-10">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-4">
        <div>
          <h2 className="text-xl font-bold">Website</h2>
          <p className="text-sm text-slate-500">
            {page ? (
              <>
                Pagina <strong>{pageLabel(page)}</strong>{" "}
                <button className="text-blue-600 hover:underline" onClick={() => setPage(null)}>
                  (alle pagina's tonen)
                </button>
              </>
            ) : (
              "Alle pagina's"
            )}
          </p>
        </div>
        <div className="flex gap-2">
          {RANGES.map((r) => (
            <button
              key={r}
              onClick={() => setDays(r)}
              className={`px-3 py-1.5 rounded-lg text-sm border ${
                days === r ? "bg-slate-900 text-white border-slate-900" : "bg-white"
              }`}
            >
              {r} dagen
            </button>
          ))}
        </div>
      </div>

      {error && (
        <p className="mb-4 rounded-lg bg-red-50 text-red-700 p-3 text-sm">
          Statistiek laden mislukt: {error}. Is <code>supabase/2026-11-25-web-events.sql</code> al gedraaid?
        </p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
        {METRICS.map((m) => (
          <button
            key={m.key}
            onClick={() => setMetric(m.key)}
            className={`text-left bg-white rounded-xl p-4 shadow border-2 ${
              metric === m.key ? "border-blue-500" : "border-transparent"
            }`}
          >
            <div className="text-xs text-slate-500 mb-1">{m.label}</div>
            <div className="text-2xl font-bold">{loading ? "…" : totals[m.key]}</div>
          </button>
        ))}
        <div className="bg-white rounded-xl p-4 shadow">
          <div className="text-xs text-slate-500 mb-1">Onthuld per bezoeker</div>
          <div className="text-2xl font-bold">{pct(totals.reveals, totals.visitors)}</div>
        </div>
      </div>

      {/* Per dag */}
      <div className="bg-white rounded-xl shadow p-5 mb-6">
        <div className="text-sm font-semibold mb-3">
          {METRICS.find((m) => m.key === metric)!.label} per dag
        </div>
        <div className="flex items-end gap-[3px] h-40">
          {perDay.map(([d, v]) => (
            <div
              key={d}
              className="flex-1 bg-blue-500/80 hover:bg-blue-600 rounded-t relative group"
              style={{ height: `${(v[metric] / max) * 100}%`, minHeight: v[metric] ? 3 : 1 }}
            >
              <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 hidden group-hover:block whitespace-nowrap rounded bg-slate-900 text-white text-xs px-2 py-1 z-10">
                {dayLabel(d)}: {v[metric]}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-slate-400 mt-1">
          <span>{dayLabel(perDay[0]?.[0] ?? "")}</span>
          <span>vandaag</span>
        </div>
        <details className="mt-4">
          <summary className="text-sm text-blue-600 cursor-pointer">Tabel per dag</summary>
          <table className="w-full text-sm mt-2">
            <thead className="text-slate-500 text-xs">
              <tr>
                <th className="text-left py-1">Dag</th>
                {METRICS.map((m) => (
                  <th key={m.key} className="text-right py-1">{m.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...perDay].reverse().map(([d, v]) => (
                <tr key={d} className="border-t">
                  <td className="py-1">{dayLabel(d)}</td>
                  {METRICS.map((m) => (
                    <td key={m.key} className="text-right py-1">{v[m.key]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </details>
      </div>

      <div className="grid md:grid-cols-[1fr_280px] gap-6">
        {/* Per pagina */}
        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <div className="p-4 flex items-center justify-between gap-4">
            <div className="text-sm font-semibold">Per pagina ({pages.length})</div>
            <input
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Zoek pagina…"
              className="border rounded-lg px-3 py-1.5 text-sm"
            />
          </div>
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600 text-xs">
              <tr>
                <SortTh label="Pagina" k="path" sort={sort} setSort={setSort} left />
                {METRICS.map((m) => (
                  <SortTh key={m.key} label={m.label} k={m.key} sort={sort} setSort={setSort} />
                ))}
                <th className="px-3 py-2 text-right">Onthuld %</th>
              </tr>
            </thead>
            <tbody>
              {pages.map((p) => (
                <tr
                  key={p.path}
                  onClick={() => setPage(p.path === page ? null : p.path)}
                  className={`border-t cursor-pointer hover:bg-slate-50 ${
                    p.path === page ? "bg-blue-50" : ""
                  }`}
                >
                  <td className="px-3 py-2 font-medium">
                    {pageLabel(p.path)}
                    <div className="text-xs text-slate-400">{p.path}</div>
                  </td>
                  {METRICS.map((m) => (
                    <td key={m.key} className="px-3 py-2 text-right">{p[m.key]}</td>
                  ))}
                  <td className="px-3 py-2 text-right">{pct(p.reveals, p.visitors)}</td>
                </tr>
              ))}
              {!loading && pages.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-3 py-6 text-center text-slate-400">
                    Nog geen bezoeken gemeten.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Herkomst */}
        <div className="bg-white rounded-xl shadow p-4 self-start">
          <div className="text-sm font-semibold mb-2">Herkomst (bezoekers)</div>
          {referrers.length === 0 && <p className="text-sm text-slate-400">Nog niets.</p>}
          <ul className="text-sm space-y-1">
            {referrers.map((r) => (
              <li key={r.referrer} className="flex justify-between gap-2">
                <span className="truncate">{r.referrer}</span>
                <span className="font-semibold">{r.visitors}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Per merk */}
      <div className="bg-white rounded-xl shadow overflow-x-auto mt-6">
        <div className="p-4">
          <div className="text-sm font-semibold">Per merk ({brandTable.length})</div>
          <p className="text-xs text-slate-400">
            Telt acties op alle pagina's (merkenoverzicht én de eigen merkpagina).
          </p>
        </div>
        {brandError && (
          <p className="mx-4 mb-4 rounded-lg bg-red-50 text-red-700 p-3 text-sm">
            Per merk laden mislukt: {brandError}. Draai <code>supabase/2026-11-25-web-brands.sql</code>.
          </p>
        )}
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-600 text-xs">
            <tr>
              <th className="px-3 py-2 text-left">Merk</th>
              <th className="px-3 py-2 text-right">Weergaven merkpagina</th>
              <th className="px-3 py-2 text-right">Code onthuld</th>
              <th className="px-3 py-2 text-right">Opnieuw gekopieerd</th>
              <th className="px-3 py-2 text-right">Naar webshop</th>
            </tr>
          </thead>
          <tbody>
            {brandTable.map((b) => (
              <tr key={b.brand_id} className="border-t">
                <td className="px-3 py-2 font-medium">{b.name}</td>
                <td className="px-3 py-2 text-right">{b.pageViews}</td>
                <td className="px-3 py-2 text-right font-semibold">{b.reveals}</td>
                <td className="px-3 py-2 text-right">{b.copies}</td>
                <td className="px-3 py-2 text-right">{b.shops}</td>
              </tr>
            ))}
            {!loading && !brandError && brandTable.length === 0 && (
              <tr>
                <td colSpan={5} className="px-3 py-6 text-center text-slate-400">
                  Nog geen codes onthuld.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-slate-400 mt-3">
        Bezoeker = één browsersessie. "Code onthuld" kopieert de code ook meteen; "Opnieuw
        gekopieerd" telt extra klikken daarna. Gemeten sinds 25 november 2026, zonder cookies.
      </p>
    </section>
  );
}

function SortTh({
  label,
  k,
  sort,
  setSort,
  left,
}: {
  label: string;
  k: keyof PageTotals;
  sort: keyof PageTotals;
  setSort: (k: keyof PageTotals) => void;
  left?: boolean;
}) {
  return (
    <th
      onClick={() => setSort(k)}
      className={`px-3 py-2 cursor-pointer hover:text-blue-600 ${left ? "text-left" : "text-right"} ${
        sort === k ? "text-blue-600" : ""
      }`}
    >
      {label}
    </th>
  );
}
