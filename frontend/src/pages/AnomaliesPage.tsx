import { useEffect, useState } from 'react';
import { api } from '../api/client';

export const AnomaliesPage = () => {
  const [rows, setRows] = useState<any[]>([]);
  useEffect(() => { api.get('/api/anomalies').then((res) => setRows(res.data.data)); }, []);
  return (
    <div>
      <h2>Anomaly Tracker</h2>
      <table><thead><tr><th>Metric</th><th>Severity</th><th>Explanation</th></tr></thead>
      <tbody>{rows.map((r) => <tr key={r.id}><td>{r.metric}</td><td>{r.severity}</td><td>{r.explanation}</td></tr>)}</tbody></table>
    </div>
  );
};
