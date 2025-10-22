import React, { useEffect, useState } from 'react';
import { fetchResource } from '../api';

export default function Leaderboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { list, error: err, url, raw } = await fetchResource('leaderboard');
      // eslint-disable-next-line no-console
      console.log('[Leaderboard] url:', url, 'raw:', raw);
      if (!mounted) return;
      if (err) setError(err);
      setData(list);
      setLoading(false);
    })();
    return () => { mounted = false; };
  }, []);

  if (loading) return <div>Loading leaderboard...</div>;
  if (error) return <div className="text-danger">Failed to load leaderboard.</div>;

  return (
    <div>
      <h2>Leaderboard</h2>
      {data.length === 0 && <p>No entries.</p>}
      <ol className="list-group list-group-numbered">
        {data.map((item, i) => (
          <li key={item.id || i} className="list-group-item d-flex justify-content-between align-items-center">
            <span>{item.user?.username || item.username || item.name || 'Entry'}</span>
            <span className="badge bg-primary rounded-pill">{item.score || item.points || item.total || 0}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
