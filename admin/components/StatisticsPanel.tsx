import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export const StatisticsPanel = () => {
  const [loading, setLoading] = useState(true);
  const [labels, setLabels] = useState<string[]>([]);
  const [values, setValues] = useState<number[]>([]);
  const [metric, setMetric] = useState<'favorites'|'copied'|'shared'|'reported'>('favorites');
  const [brands, setBrands] = useState<Array<{id:string; name:string}>>([]);
  const [selectedBrand, setSelectedBrand] = useState<string>('');

  // fetch brands once for the selector
  useEffect(() => {
    (async () => {
      try {
        const { data } = await supabase.from('brands').select('id, name').order('name');
        setBrands((data ?? []) as any[]);
      } catch (err) {
        console.error('Failed to load brands', err);
      }
    })();
  }, []);

  const loadFor = async (metricKey: typeof metric, brandId: string) => {
    setLoading(true);
    setLabels([]);
    setValues([]);
    try {
      const viewName = metricKey === 'favorites'
        ? 'admin_brand_favorites_daily'
        : metricKey === 'copied'
        ? 'admin_brand_copied_daily'
        : metricKey === 'shared'
        ? 'admin_brand_shared_daily'
        : 'admin_brand_reported_daily';

      let q: any = supabase.from(viewName).select('date,count').order('date', { ascending: true }).limit(365);
      if (brandId) q = q.eq('brand_id', brandId);

      const { data, error } = await q;
      if (error) {
        console.debug('StatisticsPanel: query error', error.message);
        setLabels([]);
        setValues([]);
      } else if (data) {
        const d = (data as any[]).map(r => ({ date: r.date, value: Number(r.count) }));
        setLabels(d.map(x => x.date));
        setValues(d.map(x => x.value));
      }
    } catch (err) {
      console.error(err);
      setLabels([]);
      setValues([]);
    }
    setLoading(false);
  };

  // load when metric or brand changes
  useEffect(() => {
    loadFor(metric, selectedBrand);
  }, [metric, selectedBrand]);

  const [chartLine, setChartLine] = useState<any | null>(null);

  // Dynamically import Chart.js and react-chartjs-2 on client only to avoid SSR/build errors
  useEffect(() => {
    let mounted = true;
    (async () => {
      if (typeof window === 'undefined') return;
      try {
        const [{ Chart: ChartJS }, { Line }] = await Promise.all([
          import('chart.js'),
          import('react-chartjs-2')
        ]);
        const { CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } = await import('chart.js');
        // register if possible
        if (ChartJS && ChartJS.register) {
          ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
        }
        if (mounted) setChartLine(() => Line as any);
      } catch (err) {
        console.error('Failed to load Chart.js dynamically', err);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const metricLabel = metric === 'favorites' ? 'Favorieten' : metric === 'copied' ? 'Gekopieerd' : metric === 'shared' ? 'Gedeeld' : 'Gerapporteerd';
  const brandName = selectedBrand ? (brands.find(b => b.id === selectedBrand)?.name ?? '') : '';
  const chartTitle = brandName ? `${metricLabel} — ${brandName}` : `${metricLabel} per dag`;

  const chartData = {
    labels,
    datasets: [
      {
        label: chartTitle,
        data: values,
        borderColor: '#6366F1',
        backgroundColor: 'rgba(99,102,241,0.4)',
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const options: any = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: false },
    },
    scales: {
      x: { ticks: { color: '#94A3B8' } },
      y: { ticks: { color: '#94A3B8' } },
    },
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
      <h3 className="text-lg font-semibold mb-4">{chartTitle}</h3>
      <div className="mb-4 flex gap-3 items-center">
        <button onClick={() => setMetric('favorites')} className={`px-3 py-1 rounded ${metric === 'favorites' ? 'bg-white/6' : ''}`}>Favorieten</button>
        <button onClick={() => setMetric('copied')} className={`px-3 py-1 rounded ${metric === 'copied' ? 'bg-white/6' : ''}`}>Gekopieerd</button>
        <button onClick={() => setMetric('shared')} className={`px-3 py-1 rounded ${metric === 'shared' ? 'bg-white/6' : ''}`}>Gedeeld</button>
        <button onClick={() => setMetric('reported')} className={`px-3 py-1 rounded ${metric === 'reported' ? 'bg-white/6' : ''}`}>Gerapporteerd</button>
        <div className="ml-4">
          <label className="text-sm text-slate-400 mr-2">Merk</label>
          <select value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)} className="bg-transparent border border-white/10 rounded px-2 py-1 text-sm">
            <option value="">Alle merken</option>
            {brands.map(b => (
              <option key={b.id} value={b.id}>{b.name}</option>
            ))}
          </select>
        </div>
      </div>
      {loading ? (
        <div className="text-slate-400">Laden…</div>
      ) : (
        chartLine ? (
          // @ts-ignore
          React.createElement(chartLine, { data: chartData, options })
        ) : (
          <div className="text-slate-400">Grafiek laden…</div>
        )
      )}
    </div>
  );
};

export default StatisticsPanel;
