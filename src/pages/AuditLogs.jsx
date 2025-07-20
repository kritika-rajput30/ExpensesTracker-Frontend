import { useEffect, useState } from 'react';
import api from '../api/axios';

const AuditLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      try {
        const res = await api.get('/audit');
        setLogs(res.data);
      } catch (err) {
        setError('Failed to fetch audit logs');
      }
      setLoading(false);
    };
    fetchLogs();
  }, []);

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h2 className="text-3xl font-extrabold mb-6 text-purple-700">Audit Logs</h2>
      <div className="overflow-x-auto rounded-2xl shadow-lg bg-white/80">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left">User</th>
              <th className="py-3 px-4 text-left">Action</th>
              <th className="py-3 px-4 text-left">Expense</th>
              <th className="py-3 px-4 text-left">Details</th>
              <th className="py-3 px-4 text-left">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="5" className="text-center py-6">Loading...</td></tr>
            ) : error ? (
              <tr><td colSpan="5" className="text-center py-6 text-red-500">{error}</td></tr>
            ) : logs.length === 0 ? (
              <tr><td colSpan="5" className="text-center py-6">No audit logs found.</td></tr>
            ) : logs.map(log => (
              <tr key={log._id} className="border-b last:border-none hover:bg-purple-50/40">
                <td className="py-2 px-4">{log.user?.email || '-'}</td>
                <td className="py-2 px-4">{log.action.replace('_', ' ')}</td>
                <td className="py-2 px-4">{log.expense ? log.expense._id : '-'}</td>
                <td className="py-2 px-4">{log.details}</td>
                <td className="py-2 px-4">{log.createdAt ? new Date(log.createdAt).toLocaleString() : ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuditLogs; 