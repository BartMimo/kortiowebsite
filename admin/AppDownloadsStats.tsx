import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface DownloadStats {
  platform: string;
  count: number;
}

export const AppDownloadsStats: React.FC = () => {
  const [stats, setStats] = useState<DownloadStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data, error } = await supabase
          .from('app_downloads')
          .select('platform')
          .order('created_at', { ascending: false });

        if (error) throw error;

        // Count by platform
        const counts: { [key: string]: number } = {};
        data.forEach(item => {
          counts[item.platform] = (counts[item.platform] || 0) + 1;
        });

        const statsArray: DownloadStats[] = Object.entries(counts).map(([platform, count]) => ({
          platform,
          count
        }));

        setStats(statsArray);
      } catch (error) {
        console.error('Error fetching download stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className="p-6">Loading stats...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">App Download Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stats.map(stat => (
          <div key={stat.platform} className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold capitalize">{stat.platform}</h3>
            <p className="text-3xl font-bold text-blue-600">{stat.count}</p>
            <p className="text-sm text-gray-500">Total downloads</p>
          </div>
        ))}
      </div>
      {stats.length === 0 && (
        <p className="text-gray-500">No downloads recorded yet.</p>
      )}
    </div>
  );
};