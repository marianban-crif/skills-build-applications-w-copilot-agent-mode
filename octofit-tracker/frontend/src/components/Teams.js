import React, { useEffect, useState, useCallback } from 'react';
import { fetchResource } from '../api';

export default function Teams() {
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
    const { list, error: err, url, raw } = await fetchResource('teams');
    // eslint-disable-next-line no-console
    console.log('[Teams] url:', url, 'raw:', raw);
    if (err) setError(err);
    setData(list);
    setLoading(false);
    setRefreshing(false);
  }, []);

  useEffect(() => { load(); }, [load]);
  useEffect(() => { setFiltered(applyFilter(data, query)); }, [query, data]);

  if (loading) return <div className="text-muted">Loading teams...</div>;
  if (error) return <div className="alert alert-danger">Failed to load teams.</div>;

  const columns = ['id','name','team_name','members'];

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h2 className="h5 mb-0">Teams</h2>
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
        {filtered.length === 0 && <p className="text-muted">No teams found.</p>}
        {filtered.length > 0 && (
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle">
              <thead className="table-light">
                <tr>
                  {columns.map(col => <th key={col}>{col.toUpperCase()}</th>)}
                </tr>
              </thead>
              <tbody>
                {filtered.map((item, i) => (
                  <tr key={item.id || i} style={{cursor:'pointer'}} onClick={() => setSelected(item)}>
                    {columns.map(col => (
                      <td key={col}>{col==='members' && Array.isArray(item.members) ? item.members.length : (item[col] !== undefined ? (Array.isArray(item[col]) ? item[col].length : item[col]) : '')}</td>
                    ))}
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
                <h5 className="modal-title">Team Detail</h5>
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
