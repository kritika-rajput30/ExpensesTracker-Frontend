import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Wallet, FileText, BarChart2 } from 'lucide-react';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-white py-12 font-sans">
      <div className="bg-white border border-blue-100 rounded-3xl shadow-2xl p-10 w-full max-w-xl flex flex-col items-center">
        <h1 className="text-4xl font-extrabold text-blue-500 mb-2 py-5 drop-shadow">Welcome, <span className="text-blue-700">{user?.email}</span>!</h1>
        <div className="w-full flex flex-col md:flex-row gap-6 justify-center">
          <Link to="/expenses" className="flex-1 bg-blue-500 text-white text-center py-6 rounded-2xl font-bold text-xl shadow-lg hover:bg-blue-700 transition transform hover:-translate-y-1 flex flex-col items-center gap-2">
            <Wallet className="w-8 h-8 mx-auto mb-1" />
            Expenses
          </Link>
          {user?.role === 'admin' && (
            <Link to="/audit" className="flex-1 bg-blue-100 text-blue-700 text-center py-6 rounded-2xl font-bold text-xl shadow-lg hover:bg-blue-200 transition transform hover:-translate-y-1 flex flex-col items-center gap-2">
              <FileText className="w-8 h-8 mx-auto mb-1" />
              Audit Logs
            </Link>
          )}
          {user?.role === 'admin' && (
            <Link to="/insights" className="flex-1 bg-blue-50 text-blue-700 text-center py-6 rounded-2xl font-bold text-xl shadow-lg hover:bg-blue-200 transition transform hover:-translate-y-1 flex flex-col items-center gap-2">
              <BarChart2 className="w-8 h-8 mx-auto mb-1" />
              Insights
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 