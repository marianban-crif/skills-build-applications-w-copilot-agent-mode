import React, { useEffect, useState, useCallback } from 'react';

// Hard-coded backend endpoint for users
const USERS_API = 'https://stunning-engine-4jv5g5jg9j9q3qxj5-8000.app.github.dev/api/users/';

export default function Users() {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const applyFilter = (items, q) => {
    const term = q.toLowerCase();
    return items.filter(it => JSON.stringify(it).toLowerCase().includes(term));
  };

  const load = useCallback(async () => {
    setRefreshing(true);
    try {
      const resp = await fetch(USERS_API);
      const raw = await resp.json().catch(() => null);
      const list = Array.isArray(raw) ? raw : (raw && Array.isArray(raw.results) ? raw.results : []);
      // eslint-disable-next-line no-console
      console.log('[Users] fetched', { endpoint: USERS_API, raw, normalized: list });
      setData(list);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('[Users] fetch error', err);
      setError(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);
  useEffect(() => { setFiltered(applyFilter(data, query)); }, [query, data]);

  if (loading) return <div className="text-muted">Loading users...</div>;
  if (error) return <div className="alert alert-danger">Failed to load users.</div>;

  // Columns aligned with Django auth User model; full_name is derived
  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'username', label: 'Username' },
    { key: 'email', label: 'Email' },
    { key: 'first_name', label: 'First Name' },
    { key: 'last_name', label: 'Last Name' },
    { key: 'full_name', label: 'Full Name' },
  ];

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h2 className="h5 mb-0">Users</h2>
        <button className="btn btn-sm btn-outline-primary" onClick={load} disabled={refreshing}>{refreshing ? 'Refreshing...' : 'Refresh'}</button>
      </div>
      <div className="card-body">
        <form className="row g-3 mb-3" onSubmit={e => e.preventDefault()}>
          <div className="col-auto">
            <input className="form-control" placeholder="Search" value={query} onChange={e => setQuery(e.target.value)} />
          </div>
          <div className="col-auto">
            <button type="button" className="btn btn-secondary" onClick={() => setQuery('')}>Clear</button>
          </div>
        </form>
        {filtered.length === 0 && <p className="text-muted">No users found.</p>}
        {filtered.length > 0 && (
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle">
              <thead className="table-light">
                <tr>
                  {columns.map(c => <th key={c.key}>{c.label}</th>)}
                </tr>
              </thead>
              <tbody>
                {filtered.map((item, i) => (
                  <tr key={item.id || i} style={{cursor:'pointer'}} onClick={() => setSelected(item)}>
                    {columns.map(c => {
                      let value = '';
                      if (c.key === 'full_name') {
                        value = [item.first_name, item.last_name].filter(Boolean).join(' ');
                      } else {
                        value = item[c.key] !== undefined ? item[c.key] : '';
                      }
                      return <td key={c.key}>{value}</td>;
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {selected && (
        <div className="modal fade show" style={{display:'block'}} tabIndex={-1} role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">User Detail</h5>
                <button type="button" className="btn-close" onClick={() => setSelected(null)} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <pre className="small bg-light p-3 border rounded mb-0">{JSON.stringify(selected, null, 2)}</pre>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setSelected(null)}>Close</button>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show" onClick={() => setSelected(null)}></div>
        </div>
      )}
    </div>
  );
}
