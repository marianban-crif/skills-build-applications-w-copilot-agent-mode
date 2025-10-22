import React, { useEffect, useState } from 'react';
import { fetchResource } from '../api';

export default function Teams() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { list, error: err, url, raw } = await fetchResource('teams');
      // eslint-disable-next-line no-console
      console.log('[Teams] url:', url, 'raw:', raw);
      if (!mounted) return;
      if (err) setError(err);
      setData(list);
      setLoading(false);
    })();
    return () => { mounted = false; };
  }, []);

  if (loading) return <div>Loading teams...</div>;
  if (error) return <div className="text-danger">Failed to load teams.</div>;

  return (
    <div>
      <h2>Teams</h2>
      {data.length === 0 && <p>No teams found.</p>}
      <ul className="list-group">
        {data.map((item, i) => (
          <li key={item.id || i} className="list-group-item">
            <strong>{item.name || item.team_name || 'Team'}</strong>
            {item.members && Array.isArray(item.members) && (
              <div className="small text-muted">Members: {item.members.length}</div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
