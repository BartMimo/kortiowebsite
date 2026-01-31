import { useEffect, useState } from "react";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { supabase } from "../../lib/supabase";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const StatisticsPanel = () => {
  const [loading, setLoading] = useState(true);
  const [labels, setLabels] = useState<string[]>([]);
  const [values, setValues] = useState<number[]>([]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('admin_brand_favorites_daily')
          .select('date,count')
          .order('date', { ascending: true })
          .limit(365);

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

    load();
  }, []);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Favorieten per dag',
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
      <h3 className="text-lg font-semibold mb-4">Favorieten per dag</h3>
      {loading ? (
        <div className="text-slate-400">Laden…</div>
      ) : (
        <Line data={chartData} options={options} />
      )}
    </div>
  );
};

export default StatisticsPanel;
