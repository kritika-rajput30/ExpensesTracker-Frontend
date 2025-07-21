import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

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
    <div className="min-h-[95vh] flex items-center justify-center bg-gradient-to-br from-purple-600 via-indigo-500 to-pink-400">
      <form onSubmit={handleSubmit} className="backdrop-blur-md bg-white/20 p-10 rounded-2xl shadow-2xl w-96 flex flex-col gap-4 border border-white/30">
        <h2 className="text-3xl font-extrabold text-center text-white mb-2">Sign In</h2>
        {error && <div className="text-red-200 bg-red-500/30 rounded px-2 py-1 text-center">{error}</div>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full p-3 rounded-lg border-none focus:ring-2 focus:ring-purple-400 outline-none bg-white/80 placeholder-gray-500"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full p-3 rounded-lg border-none focus:ring-2 focus:ring-purple-400 outline-none bg-white/80 placeholder-gray-500"
          required
        />
        <button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-bold shadow-lg hover:from-pink-500 hover:to-purple-500 transition">Login</button>
        <div className="text-center text-white/80 mt-2">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="underline text-pink-200 hover:text-white">Register</Link>
        </div>
      </form>
    </div>
  );
};

export default Login; 