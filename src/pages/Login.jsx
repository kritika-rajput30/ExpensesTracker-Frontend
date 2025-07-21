import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { LogIn } from 'lucide-react';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      window.location.href = '/';
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white font-sans">
      <form onSubmit={handleSubmit} className="bg-white border border-blue-100 p-10 rounded-2xl shadow-xl w-96 flex flex-col gap-4">
        <h2 className="text-3xl font-extrabold text-center text-blue-500 mb-2">Sign In</h2>
        {error && <div className="text-red-600 bg-red-100 rounded px-2 py-1 text-center">{error}</div>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full p-3 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-500 outline-none bg-white placeholder-gray-500"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full p-3 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-500 outline-none bg-white placeholder-gray-500"
          required
        />
        <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-lg font-bold shadow hover:bg-blue-600 transition flex items-center justify-center gap-2">
          <LogIn className="w-5 h-5" /> Login
        </button>
        <div className="text-center text-gray-600 mt-2">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="underline text-blue-500 hover:text-blue-700">Register</Link>
        </div>
      </form>
    </div>
  );
};

export default Login; 