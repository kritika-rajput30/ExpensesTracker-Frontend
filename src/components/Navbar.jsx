import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 flex justify-between items-center shadow-lg z-10">
      <div>
        <Link to="/" className="font-extrabold text-2xl tracking-tight hover:text-purple-200 transition">Expense Tracker</Link>
      </div>
      <div className="space-x-4 flex items-center">
        {user ? (
          <>
            <button onClick={logout} className="bg-gradient-to-r from-pink-500 to-purple-500 px-4 py-2 rounded-full font-semibold shadow hover:from-purple-500 hover:to-pink-500 transition">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="bg-gradient-to-r from-purple-500 to-indigo-500 px-4 py-2 rounded-full font-semibold shadow hover:from-indigo-500 hover:to-purple-500 transition">Login</Link>
            <Link to="/register" className="bg-gradient-to-r from-pink-500 to-purple-500 px-4 py-2 rounded-full font-semibold shadow hover:from-purple-500 hover:to-pink-500 transition">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 