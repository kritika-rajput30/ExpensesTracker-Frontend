import { useState } from 'react';
import api from '../api/axios';
import { Link } from 'react-router-dom';
import { UserPlus } from 'lucide-react';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('employee');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', { email, password, role });
      setSuccess('Registration successful! You can now log in.');
      setError('');
    } catch (err) {
      setError('Registration failed.');
      setSuccess('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-blue-400 to-blue-300 font-sans">
      <form onSubmit={handleSubmit} className="backdrop-blur-md bg-white/20 p-10 rounded-2xl shadow-2xl w-96 flex flex-col gap-4 border border-white/30">
        <div className="flex flex-col items-center mb-2">
          <UserPlus className="w-10 h-10 text-blue-600 mb-1" />
          <h2 className="text-3xl font-extrabold text-center text-blue-700">Register</h2>
        </div>
        {error && <div className="text-red-200 bg-red-500/30 rounded px-2 py-1 text-center">{error}</div>}
        {success && <div className="text-green-200 bg-green-500/30 rounded px-2 py-1 text-center">{success}</div>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full p-3 rounded-lg border-none focus:ring-2 focus:ring-blue-400 outline-none bg-white/80 placeholder-gray-500"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full p-3 rounded-lg border-none focus:ring-2 focus:ring-blue-400 outline-none bg-white/80 placeholder-gray-500"
          required
        />
        <select
          value={role}
          onChange={e => setRole(e.target.value)}
          className="w-full p-3 rounded-lg border-none focus:ring-2 focus:ring-blue-400 outline-none bg-white/80 text-gray-700"
        >
          <option value="employee">Employee</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 rounded-lg font-bold shadow-lg hover:from-blue-700 hover:to-blue-500 transition">Register</button>
        <div className="text-center text-white/80 mt-2">
          Already have an account?{' '}
          <Link to="/login" className="underline text-blue-200 hover:text-white">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default Register; 