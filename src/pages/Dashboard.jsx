import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { FileText, BarChart2, ListChecks } from 'lucide-react';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 via-blue-400 to-blue-300 py-12 font-sans">
      <div className="bg-white/30 backdrop-blur-md rounded-3xl shadow-2xl p-10 w-full max-w-xl flex flex-col items-center border border-white/40">
        <h1 className="text-4xl font-extrabold text-blue-800 mb-2 drop-shadow">Welcome, <span className="text-blue-400">{user?.email}</span>!</h1>
        <p className="text-lg text-blue-900/80 mb-8">Role: <span className="uppercase font-bold text-blue-400">{user?.role}</span></p>
        <div className="w-full flex flex-col md:flex-row gap-6 justify-center">
          <Link to="/expenses" className="flex-1 bg-gradient-to-r from-blue-500 to-blue-700 text-white text-center py-6 rounded-2xl font-bold text-xl shadow-lg hover:from-blue-700 hover:to-blue-500 transition transform hover:-translate-y-1 flex flex-col items-center gap-2">
            <FileText className="w-8 h-8 mx-auto" />
            Expenses
          </Link>
          {user?.role === 'admin' && (
            <Link to="/audit" className="flex-1 bg-gradient-to-r from-blue-400 to-blue-600 text-white text-center py-6 rounded-2xl font-bold text-xl shadow-lg hover:from-blue-600 hover:to-blue-400 transition transform hover:-translate-y-1 flex flex-col items-center gap-2">
              <ListChecks className="w-8 h-8 mx-auto" />
              Audit Logs
            </Link>
          )}
          {user?.role === 'admin' && (
            <Link to="/insights" className="flex-1 bg-gradient-to-r from-blue-300 to-blue-500 text-white text-center py-6 rounded-2xl font-bold text-xl shadow-lg hover:from-blue-500 hover:to-blue-300 transition transform hover:-translate-y-1 flex flex-col items-center gap-2">
              <BarChart2 className="w-8 h-8 mx-auto" />
              Insights
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 