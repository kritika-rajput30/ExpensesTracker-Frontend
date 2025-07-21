import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LogOut, LogIn, UserPlus, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 flex justify-between items-center shadow-lg font-sans">
      <div className="flex items-center gap-2">
        <LayoutDashboard className="w-7 h-7 text-white" />
        <Link to="/" className="font-extrabold text-2xl tracking-tight hover:text-blue-200 transition">Expense Tracker</Link>
      </div>
      <div className="space-x-4 flex items-center">
        {user ? (
          <>
            <span className="font-medium bg-white/10 px-3 py-1 rounded-full text-sm mr-2">{user.email} <span className="uppercase text-xs text-blue-200">({user.role})</span></span>
            <button onClick={logout} className="bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-2 rounded-full font-semibold shadow hover:from-blue-700 hover:to-blue-600 transition flex items-center gap-2">
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="bg-gradient-to-r from-blue-500 to-blue-700 px-4 py-2 rounded-full font-semibold shadow hover:from-blue-700 hover:to-blue-500 transition flex items-center gap-2">
              <LogIn className="w-4 h-4" /> Login
            </Link>
            <Link to="/register" className="bg-gradient-to-r from-blue-400 to-blue-600 px-4 py-2 rounded-full font-semibold shadow hover:from-blue-600 hover:to-blue-400 transition flex items-center gap-2">
              <UserPlus className="w-4 h-4" /> Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 