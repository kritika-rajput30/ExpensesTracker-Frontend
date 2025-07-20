import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center py-12">
      <div className="bg-white/30 backdrop-blur-md rounded-3xl shadow-2xl p-10 w-full max-w-xl flex flex-col items-center border border-white/40">
        <h1 className="text-4xl font-extrabold text-black mb-2 drop-shadow py-10">Welcome, <span className="text-pink-400">{user?.email}</span>!</h1>
        <div className="w-full flex flex-col md:flex-row gap-6 justify-center">
          <Link to="/expenses" className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-center py-6 rounded-2xl font-bold text-xl shadow-lg hover:from-indigo-500 hover:to-purple-500 transition transform hover:-translate-y-1">
            💸 Expenses
          </Link>
          {user?.role === 'admin' && (
            <Link to="/audit" className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-center py-6 rounded-2xl font-bold text-xl shadow-lg hover:from-purple-500 hover:to-pink-500 transition transform hover:-translate-y-1">
              📝 Audit Logs
            </Link>
          )}
          {user?.role === 'admin' && (
            <Link to="/insights" className="flex-1 bg-gradient-to-r from-indigo-500 to-pink-500 text-white text-center py-6 rounded-2xl font-bold text-xl shadow-lg hover:from-pink-500 hover:to-indigo-500 transition transform hover:-translate-y-1">
              📊 Insights
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 