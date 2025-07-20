import { useEffect, useState, useRef, useContext } from 'react';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';

const BACKEND_URL = "http://localhost:5000"; 

const Expenses = () => {
  const { user } = useContext(AuthContext);
  const [expenses, setExpenses] = useState([]);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Travel');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');
  const [receipt, setReceipt] = useState(null);
  const [uploadUrl, setUploadUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef();

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const res = await api.get('/expenses');
      setExpenses(res.data);
    } catch (err) {
      setError('Failed to fetch expenses');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await api.post('/expenses/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setUploadUrl(res.data.url);
    } catch (err) {
      setError('File upload failed');
    }
  };

  const handleAddExpense = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/expenses', {
        amount,
        category,
        date,
        notes,
        receipt: uploadUrl,
      });
      setAmount('');
      setCategory('Travel');
      setDate('');
      setNotes('');
      setReceipt(null);
      setUploadUrl('');
      if (fileInputRef.current) fileInputRef.current.value = '';
      fetchExpenses();
    } catch (err) {
      setError('Failed to add expense');
    }
  };

  const handleExportCSV = async () => {
    try {
      const res = await api.get('/expenses/export', { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'expenses.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      setError('CSV export failed');
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.patch(`/expenses/${id}/status`, { status: newStatus });
      fetchExpenses();
    } catch (err) {
      alert('Failed to update status');
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h2 className="text-3xl font-extrabold mb-6 text-purple-700">Expenses</h2>
      <div className="mb-8 bg-white/80 rounded-2xl shadow-lg p-6">
        <form onSubmit={handleAddExpense} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
          <div>
            <label className="block text-purple-700 font-semibold mb-1">Amount</label>
            <input type="number" value={amount} onChange={e => setAmount(e.target.value)} required min="0" step="0.01" className="w-full p-2 rounded-lg border focus:ring-2 focus:ring-purple-400 outline-none" />
          </div>
          <div>
            <label className="block text-purple-700 font-semibold mb-1">Category</label>
            <select value={category} onChange={e => setCategory(e.target.value)} className="w-full p-2 rounded-lg border focus:ring-2 focus:ring-purple-400 outline-none">
              <option value="Travel">Travel</option>
              <option value="Food">Food</option>
              <option value="Supplies">Supplies</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-purple-700 font-semibold mb-1">Date</label>
            <input type="date" value={date} onChange={e => setDate(e.target.value)} required className="w-full p-2 rounded-lg border focus:ring-2 focus:ring-purple-400 outline-none" />
          </div>
          <div>
            <label className="block text-purple-700 font-semibold mb-1">Receipt</label>
            <input type="file" accept="image/*,.pdf" ref={fileInputRef} onChange={handleFileUpload} className="w-full p-2 rounded-lg border bg-white/80" />
            {uploadUrl && <span className="text-xs text-green-600">Uploaded</span>}
          </div>
          <div>
            <label className="block text-purple-700 font-semibold mb-1">Notes</label>
            <input type="text" value={notes} onChange={e => setNotes(e.target.value)} className="w-full p-2 rounded-lg border focus:ring-2 focus:ring-purple-400 outline-none" />
          </div>
          <button type="submit" className="col-span-1 md:col-span-5 mt-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-bold shadow-lg hover:from-pink-500 hover:to-purple-500 transition">Add Expense</button>
        </form>
        {error && <div className="text-red-500 mt-2">{error}</div>}
      </div>
      {user?.role === 'admin' && (
        <div className="flex justify-end mb-4">
          <button onClick={handleExportCSV} className="bg-gradient-to-r from-purple-600 to-indigo-500 text-white px-6 py-2 rounded-full font-semibold shadow hover:from-indigo-500 hover:to-purple-600 transition">Export CSV</button>
        </div>
      )}
      <div className="overflow-x-auto rounded-2xl shadow-lg bg-white/80">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Amount</th>
              <th className="py-3 px-4 text-left">Category</th>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-left">Notes</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Receipt</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="6" className="text-center py-6">Loading...</td></tr>
            ) : expenses.length === 0 ? (
              <tr><td colSpan="6" className="text-center py-6">No expenses found.</td></tr>
            ) : expenses.map(exp => (
              <tr key={exp._id} className="border-b last:border-none hover:bg-purple-50/40">
                <td className="py-2 px-4">₹{exp.amount}</td>
                <td className="py-2 px-4">{exp.category}</td>
                <td className="py-2 px-4">{exp.date ? new Date(exp.date).toLocaleDateString() : ''}</td>
                <td className="py-2 px-4">{exp.notes}</td>
                <td className="py-2 px-4">
                  {user?.role === 'admin' ? (
                    <select
                      value={exp.status}
                      onChange={e => handleStatusChange(exp._id, e.target.value)}
                      className="rounded px-2 py-1 border"
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  ) : (
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      exp.status === 'approved'
                        ? 'bg-green-200 text-green-800'
                        : exp.status === 'rejected'
                        ? 'bg-red-200 text-red-800'
                        : 'bg-yellow-200 text-yellow-800'
                    }`}>{exp.status}</span>
                  )}
                </td>
                <td className="py-2 px-4">
                  {exp.receipt && exp.receipt.startsWith('/uploads/')
                    ? <a href={BACKEND_URL + exp.receipt} target="_blank" rel="noopener noreferrer" className="text-purple-600 underline">View</a>
                    : <span className="text-gray-400">-</span>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Expenses; 