import { useEffect, useState } from 'react';
import api from '../api/axios';
import { Bar, Line } from 'react-chartjs-2';
import { BarChart2 } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from 'chart.js';
import 'chartjs-adapter-date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

const Insights = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
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
    fetchExpenses();
  }, []);

  // Bar chart: total per category
  const categoryTotals = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {});
  const barData = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        label: 'Total Expenses',
        data: Object.values(categoryTotals),
        backgroundColor: 'rgba(59, 130, 246, 0.7)', // blue-500
        borderRadius: 8,
      },
    ],
  };

  // Line chart: expenses over time (monthly)
  const monthlyTotals = expenses.reduce((acc, exp) => {
    const month = exp.date ? new Date(exp.date).toLocaleString('default', { month: 'short', year: 'numeric' }) : '';
    if (!month) return acc;
    acc[month] = (acc[month] || 0) + exp.amount;
    return acc;
  }, {});
  const lineData = {
    labels: Object.keys(monthlyTotals),
    datasets: [
      {
        label: 'Expenses Over Time',
        data: Object.values(monthlyTotals),
        fill: false,
        borderColor: 'rgba(59, 130, 246, 1)', // blue-500
        backgroundColor: 'rgba(59, 130, 246, 0.7)', // blue-500
        tension: 0.3,
        pointRadius: 6,
        pointBackgroundColor: 'rgba(59, 130, 246, 1)',
      },
    ],
  };

  return (
    <div className="p-8 max-w-5xl mx-auto font-sans">
      <div className="flex items-center gap-2 mb-6">
        <BarChart2 className="w-7 h-7 text-blue-500" />
        <h2 className="text-3xl font-extrabold text-blue-500">Insights</h2>
      </div>
      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500 py-8">{error}</div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white border border-blue-100 rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4 text-blue-700">Total Expenses per Category</h3>
            <Bar data={barData} options={{
              responsive: true,
              plugins: { legend: { display: false }, title: { display: false } },
              scales: { y: { beginAtZero: true } },
            }} />
          </div>
          <div className="bg-white border border-blue-100 rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4 text-blue-700">Expenses Over Time</h3>
            <Line data={lineData} options={{
              responsive: true,
              plugins: { legend: { display: false }, title: { display: false } },
              scales: { y: { beginAtZero: true } },
            }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Insights; 