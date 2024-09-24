import { useState } from 'react';
import { useRouter } from 'next/router';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [view, setView] = useState('brand');
  const router = useRouter();

  const handleLogin = () => {
    // Simple authentication logic (replace with real authentication)
    if (username && password) {
      localStorage.setItem('userRole', view);
      router.push('/select-options');
    } else {
      alert('Please enter username and password');
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded mt-1"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            className="w-full p-2 border border-gray-300 rounded mt-1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">View</label>
          <select
            className="w-full p-2 border border-gray-300 rounded mt-1"
            value={view}
            onChange={(e) => setView(e.target.value)}
          >
            <option value="brand">Brand</option>
            <option value="ds">Data Scientist</option>
          </select>
        </div>
        <button
          className="w-full bg-indigo-600 text-white p-2 rounded mt-4"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;