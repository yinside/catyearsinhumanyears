import React, { useState } from 'react';
import { LocalStorageManager } from '../utils/localStorage';
import { CMSNewsArticle } from '../types';
import { Edit, Trash2, Plus, Save, X, Calendar, User } from 'lucide-react';

interface NewsArticlesManagerProps {
  newsArticles: CMSNewsArticle[];
  onDataUpdate: () => void;
}

interface EditingArticle {
  id: number | null;
  title: string;
  content: string;
  author: string;
  date: string;
}

interface NewArticle {
  title: string;
  content: string;
  author: string;
  date: string;
  imageUrl?: string;
  externalUrl?: string;
}

export const NewsArticlesManager: React.FC<NewsArticlesManagerProps> = ({ newsArticles, onDataUpdate }) => {
  const [editingArticle, setEditingArticle] = useState<EditingArticle | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newArticle, setNewArticle] = useState<NewArticle>({
    title: '',
    content: '',
    author: '',
    date: new Date().toISOString().split('T')[0],
    imageUrl: '',
    externalUrl: ''
  });

  const handleEdit = (article: CMSNewsArticle) => {
    setEditingArticle({
      id: article.id,
      title: article.title,
      content: article.content || '',
      author: article.author || '',
      date: article.date || new Date().toISOString().split('T')[0]
    });
    setShowAddForm(false);
  };

  const handleSaveEdit = () => {
    if (!editingArticle || !editingArticle.title.trim() || !editingArticle.content.trim()) return;

    if (editingArticle.id) {
      LocalStorageManager.updateNewsArticle(editingArticle.id, {
        title: editingArticle.title.trim(),
        content: editingArticle.content.trim(),
        author: editingArticle.author.trim(),
        date: editingArticle.date
      });
    }
    
    setEditingArticle(null);
    onDataUpdate();
  };

  const handleCancelEdit = () => {
    setEditingArticle(null);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this news article?')) {
      LocalStorageManager.deleteNewsArticle(id);
      onDataUpdate();
    }
  };

  const handleAddNew = () => {
    if (!newArticle.title.trim() || !newArticle.content.trim()) return;

    LocalStorageManager.addNewsArticle({
      title: newArticle.title.trim(),
      content: newArticle.content.trim(),
      author: newArticle.author.trim() || 'Anonymous',
      date: newArticle.date
    });
    
    setNewArticle({
      title: '',
      content: '',
      author: '',
      date: new Date().toISOString().split('T')[0],
      imageUrl: '',
      externalUrl: ''
    });
    setShowAddForm(false);
    onDataUpdate();
  };

  const handleCancelAdd = () => {
    setNewArticle({
      title: '',
      content: '',
      author: '',
      date: new Date().toISOString().split('T')[0],
      imageUrl: '',
      externalUrl: ''
    });
    setShowAddForm(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatArticleDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">NEWS ARTICLES MANAGEMENT</h2>
          <p className="text-gray-600">Manage news articles displayed on the website</p>
        </div>
        <button
          onClick={() => {
            setShowAddForm(true);
            setEditingArticle(null);
          }}
          className="bg-black text-white px-4 py-2 font-bold hover:bg-gray-800 transition-colors flex items-center space-x-2"
        >
          <Plus size={16} />
          <span>ADD NEW ARTICLE</span>
        </button>
      </div>

      {/* Add New Form */}
      {showAddForm && (
        <div className="border-2 border-black p-6 bg-gray-50">
          <h3 className="text-lg font-bold mb-4">ADD NEW NEWS ARTICLE</h3>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold mb-2">TITLE:</label>
                <input
                  type="text"
                  value={newArticle.title}
                  onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
                  className="w-full px-3 py-2 border-2 border-black focus:outline-none focus:border-gray-600"
                  placeholder="Enter article title..."
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">AUTHOR:</label>
                <input
                  type="text"
                  value={newArticle.author}
                  onChange={(e) => setNewArticle({ ...newArticle, author: e.target.value })}
                  className="w-full px-3 py-2 border-2 border-black focus:outline-none focus:border-gray-600"
                  placeholder="Enter author name..."
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">DATE:</label>
              <input
                type="date"
                value={newArticle.date}
                onChange={(e) => setNewArticle({ ...newArticle, date: e.target.value })}
                className="px-3 py-2 border-2 border-black focus:outline-none focus:border-gray-600"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">CONTENT:</label>
              <textarea
                value={newArticle.content}
                onChange={(e) => setNewArticle({ ...newArticle, content: e.target.value })}
                className="w-full px-3 py-2 border-2 border-black focus:outline-none focus:border-gray-600 h-32 resize-none"
                placeholder="Enter the full article content..."
              />
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleAddNew}
                disabled={!newArticle.title.trim() || !newArticle.content.trim()}
                className="bg-black text-white px-4 py-2 font-bold hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
              >
                <Save size={16} />
                <span>SAVE</span>
              </button>
              <button
                onClick={handleCancelAdd}
                className="bg-white text-black px-4 py-2 font-bold border-2 border-black hover:bg-gray-100 transition-colors flex items-center space-x-2"
              >
                <X size={16} />
                <span>CANCEL</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Articles List */}
      <div className="space-y-4">
        {newsArticles.length === 0 ? (
          <div className="text-center py-12 border-2 border-gray-300 border-dashed">
            <p className="text-gray-500 text-lg">No news articles found</p>
            <p className="text-gray-400 text-sm">Click "ADD NEW ARTICLE" to create your first news article</p>
          </div>
        ) : (
          newsArticles.map((article) => (
            <div key={article.id} className="border-2 border-black p-6 bg-white">
              {editingArticle && editingArticle.id === article.id ? (
                // Edit Mode
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold mb-2">TITLE:</label>
                      <input
                        type="text"
                        value={editingArticle.title}
                        onChange={(e) => setEditingArticle({ ...editingArticle, title: e.target.value })}
                        className="w-full px-3 py-2 border-2 border-black focus:outline-none focus:border-gray-600"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-2">AUTHOR:</label>
                      <input
                        type="text"
                        value={editingArticle.author}
                        onChange={(e) => setEditingArticle({ ...editingArticle, author: e.target.value })}
                        className="w-full px-3 py-2 border-2 border-black focus:outline-none focus:border-gray-600"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">DATE:</label>
                    <input
                      type="date"
                      value={editingArticle.date}
                      onChange={(e) => setEditingArticle({ ...editingArticle, date: e.target.value })}
                      className="px-3 py-2 border-2 border-black focus:outline-none focus:border-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">CONTENT PREVIEW:</label>
                    <textarea
                      value={editingArticle.content}
                      onChange={(e) => setEditingArticle({ ...editingArticle, content: e.target.value })}
                      className="w-full px-3 py-2 border-2 border-black focus:outline-none focus:border-gray-600 h-20 resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">CONTENT:</label>
                    <textarea
                      value={editingArticle.content}
                      onChange={(e) => setEditingArticle({ ...editingArticle, content: e.target.value })}
                      className="w-full px-3 py-2 border-2 border-black focus:outline-none focus:border-gray-600 h-32 resize-none"
                    />
                  </div>
                  <div className="flex space-x-4">
                    <button
                      onClick={handleSaveEdit}
                      disabled={!editingArticle.title.trim() || !editingArticle.content.trim()}
                      className="bg-black text-white px-4 py-2 font-bold hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                    >
                      <Save size={16} />
                      <span>SAVE</span>
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="bg-white text-black px-4 py-2 font-bold border-2 border-black hover:bg-gray-100 transition-colors flex items-center space-x-2"
                    >
                      <X size={16} />
                      <span>CANCEL</span>
                    </button>
                  </div>
                </div>
              ) : (
                // View Mode
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">{article.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center space-x-1">
                          <User size={14} />
                          <span>{article.author || 'Unknown Author'}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar size={14} />
                          <span>{formatArticleDate(article.date || article.createdAt)}</span>
                        </div>
                      </div>
                      {article.content && (
                        <p className="text-gray-700 mb-3 italic">{article.content.substring(0, 100)}...</p>
                      )}
                      <div className="prose max-w-none">
                        <p className="whitespace-pre-wrap">{article.content || 'No content available'}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => handleEdit(article)}
                        className="p-2 border-2 border-black hover:bg-gray-100 transition-colors"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(article.id)}
                        className="p-2 border-2 border-red-500 text-red-500 hover:bg-red-50 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 border-t border-gray-200 pt-2">
                    <span>ID: {article.id}</span>
                    <span className="mx-2">•</span>
                    <span>Created: {formatDate(article.createdAt)}</span>
                    {article.updatedAt !== article.createdAt && (
                      <>
                        <span className="mx-2">•</span>
                        <span>Updated: {formatDate(article.updatedAt)}</span>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Statistics */}
      <div className="border-t-2 border-black pt-4">
        <div className="text-sm text-gray-600">
          <span className="font-bold">Total News Articles: {newsArticles.length}</span>
        </div>
      </div>
    </div>
  );
};

export default NewsArticlesManager;