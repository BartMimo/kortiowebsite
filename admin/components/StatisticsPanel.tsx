import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

type Point = { date: string; value: number };

const LineChart = ({ data }: { data: Point[] }) => {
  const width = 700;
  const height = 200;
  if (!data || data.length === 0) {
    return <div className="text-slate-400">Geen data beschikbaar</div>;
  }

  const values = data.map(d => d.value);
  const dates = data.map(d => d.date);
  const min = Math.min(...values);
  const max = Math.max(...values) || 1;

  const x = (i: number) => (i / (data.length - 1)) * width;
  const y = (v: number) => height - ((v - min) / (max - min || 1)) * height;

  const path = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${x(i)} ${y(d.value)}`).join(' ');

  return (
    <svg width={width} height={height} className="block">
      <defs>
        <linearGradient id="grad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#6366F1" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${path} L ${width} ${height} L 0 ${height} Z`} fill="url(#grad)" stroke="none" />
      <path d={path} fill="none" stroke="#6366F1" strokeWidth={2} />
      {data.map((d, i) => (
        <circle key={i} cx={x(i)} cy={y(d.value)} r={3} fill="#fff" stroke="#6366F1" />
      ))}
    </svg>
  );
};

export const StatisticsPanel = () => {
  const [loading, setLoading] = useState(true);
  const [favoritesPerDay, setFavoritesPerDay] = useState<Point[]>([]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      /*
        NOTE: This query assumes you have an events table that records favorites with
        a `created_at` timestamp and possibly a `type` or `event` column. If you
        don't have such table, please run the SQL below to create an aggregate view
        or provide the correct table name.

        SQL example to aggregate favorites per day (adjust table/column names):

        SELECT
          DATE(created_at) as date,
          COUNT(*) as count
        FROM favorites_events
        WHERE event = 'favorite'
        GROUP BY DATE(created_at)
        ORDER BY DATE(created_at);

        Or with supabase realtime materialized view: use `admin_brand_favorites_daily`.
      */

      try {
        // Attempt to read from a hypothetical view `admin_brand_favorites_daily`
        const { data, error } = await supabase
          .from('admin_brand_favorites_daily')
          .select('date,count')
          .order('date', { ascending: true })
          .limit(100);

        if (error) {
          console.debug('StatisticsPanel: no admin view found or query error', error.message);
          setFavoritesPerDay([]);
        } else if (data) {
          const points: Point[] = (data as any[]).map(r => ({ date: r.date, value: Number(r.count) }));
          setFavoritesPerDay(points);
        }
      } catch (err) {
        console.error(err);
        setFavoritesPerDay([]);
      }

      setLoading(false);
    };

    load();
  }, []);

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
      <h3 className="text-lg font-semibold mb-4">Favorieten per dag</h3>
      {loading ? (
        <div className="text-slate-400">Laden…</div>
      ) : (
        <LineChart data={favoritesPerDay} />
      )}
    </div>
  );
};

export default StatisticsPanel;
