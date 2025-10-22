import React, { useEffect, useState } from 'react';
import { fetchResource } from '../api';

export default function Users() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { list, error: err, url, raw } = await fetchResource('users');
      // eslint-disable-next-line no-console
      console.log('[Users] url:', url, 'raw:', raw);
      if (!mounted) return;
      if (err) setError(err);
      setData(list);
      setLoading(false);
    })();
    return () => { mounted = false; };
  }, []);

  if (loading) return <div>Loading users...</div>;
  if (error) return <div className="text-danger">Failed to load users.</div>;

  return (
    <div>
      <h2>Users</h2>
      {data.length === 0 && <p>No users found.</p>}
      <ul className="list-group">
        {data.map((item, i) => (
          <li key={item.id || i} className="list-group-item d-flex justify-content-between align-items-center">
            <span>{item.username || item.name || item.email || 'User'}</span>
            {item.email && <span className="badge bg-secondary">{item.email}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}
