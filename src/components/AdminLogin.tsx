import React, { useState } from 'react';
import { LocalStorageManager } from '../utils/localStorage';
import { CMSUser } from '../types';

interface AdminLoginProps {
  onLogin: (user: CMSUser) => void;
  onCancel: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin, onCancel }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const success = LocalStorageManager.login(username, password);
      
      if (success) {
        const user = LocalStorageManager.getUser();
        onLogin(user);
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white border-4 border-black p-8 max-w-md w-full mx-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">ADMIN LOGIN</h2>
          <div className="border-b-2 border-black w-16 mx-auto"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-bold mb-2">
              USERNAME:
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border-2 border-black focus:outline-none focus:border-gray-600"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-bold mb-2">
              PASSWORD:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border-2 border-black focus:outline-none focus:border-gray-600"
              required
              disabled={isLoading}
            />
          </div>

          {error && (
            <div className="bg-red-100 border-2 border-red-500 text-red-700 px-4 py-2 text-sm">
              {error}
            </div>
          )}

          <div className="flex space-x-4 pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-black text-white py-2 px-4 font-bold hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'LOGGING IN...' : 'LOGIN'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              disabled={isLoading}
              className="flex-1 bg-white text-black py-2 px-4 font-bold border-2 border-black hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              CANCEL
            </button>
          </div>
        </form>


      </div>
    </div>
  );
};

export default AdminLogin;