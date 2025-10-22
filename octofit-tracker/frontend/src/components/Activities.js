import React, { useEffect, useState } from 'react';
import { fetchResource } from '../api';

export default function Activities() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { list, error: err, url, raw } = await fetchResource('activities');
      // eslint-disable-next-line no-console
      console.log('[Activities] url:', url, 'raw:', raw);
      if (!mounted) return;
      if (err) setError(err);
      setData(list);
      setLoading(false);
    })();
    return () => { mounted = false; };
  }, []);

  if (loading) return <div>Loading activities...</div>;
  if (error) return <div className="text-danger">Failed to load activities.</div>;

  return (
    <div>
      <h2>Activities</h2>
      {data.length === 0 && <p>No activities found.</p>}
      <ul className="list-group">
        {data.map((item, i) => (
          <li key={item.id || i} className="list-group-item">
            {item.name || item.title || JSON.stringify(item)}
          </li>
        ))}
      </ul>
    </div>
  );
}
