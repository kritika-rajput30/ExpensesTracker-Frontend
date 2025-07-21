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
    <div className="min-h-screen flex items-center justify-center bg-white font-sans">
      <form onSubmit={handleSubmit} className="bg-white border border-blue-100 p-10 rounded-2xl shadow-xl w-96 flex flex-col gap-4">
        <h2 className="text-3xl font-extrabold text-center text-blue-500 mb-2">Register</h2>
        {error && <div className="text-red-600 bg-red-100 rounded px-2 py-1 text-center">{error}</div>}
        {success && <div className="text-green-600 bg-green-100 rounded px-2 py-1 text-center">{success}</div>}
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
        <select
          value={role}
          onChange={e => setRole(e.target.value)}
          className="w-full p-3 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-500 outline-none bg-white text-gray-700"
        >
          <option value="employee">Employee</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-lg font-bold shadow hover:bg-blue-600 transition flex items-center justify-center gap-2">
          <UserPlus className="w-5 h-5" /> Register
        </button>
        <div className="text-center text-gray-600 mt-2">
          Already have an account?{' '}
          <Link to="/login" className="underline text-blue-500 hover:text-blue-700">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default Register; 