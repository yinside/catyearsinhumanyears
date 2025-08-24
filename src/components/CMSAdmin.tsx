import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { LocalStorageManager } from '../utils/localStorage';
import { CMSUser, CMSNewsArticle } from '../types';
import AdminLogin from './AdminLogin';
import NewsArticlesManager from './NewsArticlesManager';

export const CMSAdmin: React.FC = () => {
  const [user, setUser] = useState<CMSUser>({ username: '', isAuthenticated: false });
  const [showLogin, setShowLogin] = useState(false);
  const [newsArticles, setNewsArticles] = useState<CMSNewsArticle[]>([]);

  useEffect(() => {
    const savedUser = LocalStorageManager.getUser();
    setUser(savedUser);
    loadData();
  }, []);

  const loadData = () => {
    setNewsArticles(LocalStorageManager.getNewsArticles());
  };

  const handleLogin = (loggedInUser: CMSUser) => {
    setUser(loggedInUser);
    setShowLogin(false);
    loadData();
  };

  const handleLogout = () => {
    LocalStorageManager.logout();
    setUser({ username: '', isAuthenticated: false });
  };

  const handleDataUpdate = () => {
    loadData();
  };

  if (showLogin) {
    return (
      <>
        <Helmet>
          <title>Admin Login | Cat Years Calculator</title>
          <meta name="description" content="Login to the Cat Years Chronicle content management system to manage articles and website content." />
        </Helmet>
        <AdminLogin
          onLogin={handleLogin}
          onCancel={() => setShowLogin(false)}
        />
      </>
    );
  }

  if (!user.isAuthenticated) {
    return (
      <>
        <Helmet>
          <title>cms administration | cat years calculator</title>
          <meta name="description" content="Content Management System for Cat Years Chronicle. Login to manage articles and website content." />
        </Helmet>
        <div className="min-h-screen bg-white p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">CMS ADMINISTRATION</h1>
            <div className="border-b-4 border-black w-32 mx-auto mb-6"></div>
            <p className="text-lg mb-8">Content Management System for Cat Years Website</p>
            
            <button
              onClick={() => setShowLogin(true)}
              className="bg-black text-white px-8 py-3 font-bold hover:bg-gray-800 transition-colors"
            >
              LOGIN TO ADMIN PANEL
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="border-2 border-black p-6">
              <h3 className="text-xl font-bold mb-4">MANAGE CONTENT</h3>
              <ul className="space-y-2 text-sm">
                <li>• Manage news articles</li>
                <li>• Real-time content updates</li>
                <li>• Local storage persistence</li>
              </ul>
            </div>
            
            <div className="border-2 border-black p-6">
              <h3 className="text-xl font-bold mb-4">FEATURES</h3>
              <ul className="space-y-2 text-sm">
                <li>• Simple authentication</li>
                <li>• Retro newspaper design</li>
                <li>• Responsive interface</li>
                <li>• Easy content management</li>
              </ul>
            </div>
          </div>
        </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | Cat Years Calculator</title>
        <meta name="description" content="Manage articles and content for Cat Years Chronicle. Currently logged in as administrator." />
      </Helmet>
      <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b-4 border-black bg-white">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">CMS ADMIN PANEL</h1>
              <p className="text-sm text-gray-600">Welcome, {user.username}</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-black text-white px-4 py-2 font-bold hover:bg-gray-800 transition-colors"
            >
              LOGOUT
            </button>
          </div>
        </div>
      </div>

      {/* Header for News Articles */}
      <div className="border-b-2 border-black bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="py-3">
            <h2 className="text-xl font-bold">NEWS ARTICLES MANAGEMENT ({newsArticles.length})</h2>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <NewsArticlesManager
          newsArticles={newsArticles}
          onDataUpdate={handleDataUpdate}
        />
        </div>
      </div>
    </>
  );
};

export default CMSAdmin;