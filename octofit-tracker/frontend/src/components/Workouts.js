import React, { useEffect, useState } from 'react';
import { fetchResource } from '../api';

export default function Workouts() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { list, error: err, url, raw } = await fetchResource('workouts');
      // eslint-disable-next-line no-console
      console.log('[Workouts] url:', url, 'raw:', raw);
      if (!mounted) return;
      if (err) setError(err);
      setData(list);
      setLoading(false);
    })();
    return () => { mounted = false; };
  }, []);

  if (loading) return <div>Loading workouts...</div>;
  if (error) return <div className="text-danger">Failed to load workouts.</div>;

  return (
    <div>
      <h2>Workouts</h2>
      {data.length === 0 && <p>No workouts found.</p>}
      <ul className="list-group">
        {data.map((item, i) => (
          <li key={item.id || i} className="list-group-item">
            <strong>{item.name || item.title || 'Workout'}</strong>
            {item.duration && <span className="ms-2 badge bg-info text-dark">{item.duration} min</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}
