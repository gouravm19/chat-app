import { useEffect, useState } from 'react';
import { api } from '../api/client';

export const InvoicesPage = () => {
  const [rows, setRows] = useState<any[]>([]);
  useEffect(() => { api.get('/api/invoices').then((res) => setRows(res.data.data)); }, []);
  return (
    <div>
      <h2>Invoice Manager</h2>
      <div className="stats-grid">{rows.map((i) => <div className="card" key={i.id}>{i.invoiceNumber} - {i.status} - {i.totalAmount} {i.currency}</div>)}</div>
    </div>
  );
};
