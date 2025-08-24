import { CMSNewsArticle, CMSUser } from '../types';
import { createArticleSlug } from './slugGenerator';

// Local storage keys
const STORAGE_KEYS = {
  NEWS_ARTICLES: 'cms_news_articles',
  USER: 'cms_user',
  INITIALIZED: 'cms_initialized'
} as const;

// Local storage utility class
export class LocalStorageManager {
  // Initialize CMS data with default values if not exists
  static initializeData(): void {
    if (!localStorage.getItem(STORAGE_KEYS.INITIALIZED)) {
      // Load default data from JSON files
      import('../data/newsArticles.json').then(module => {
        const defaultNewsArticles: CMSNewsArticle[] = module.default.map((article, index) => ({
          id: article.id,
          title: article.title,
          content: article.summary || 'No content available',
          author: 'Cat Health Team',
          date: article.publishDate,
          imageUrl: article.imageUrl,
          externalUrl: article.externalUrl,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }));
        this.saveNewsArticles(defaultNewsArticles);
      });

      localStorage.setItem(STORAGE_KEYS.INITIALIZED, 'true');
    }
  }

  // News Articles management
  static getNewsArticles(): CMSNewsArticle[] {
    const data = localStorage.getItem(STORAGE_KEYS.NEWS_ARTICLES);
    return data ? JSON.parse(data) : [];
  }

  static saveNewsArticles(newsArticles: CMSNewsArticle[]): void {
    localStorage.setItem(STORAGE_KEYS.NEWS_ARTICLES, JSON.stringify(newsArticles));
  }

  static addNewsArticle(article: Omit<CMSNewsArticle, 'id' | 'createdAt' | 'updatedAt'>): CMSNewsArticle {
    const articles = this.getNewsArticles();
    const newId = Math.max(0, ...articles.map(a => a.id)) + 1;
    const now = new Date().toISOString();
    
    // Generate slug if not provided
    const existingSlugs = articles.map(a => a.slug).filter(Boolean) as string[];
    const slug = article.slug || createArticleSlug(article.title, existingSlugs);
    
    const newArticle: CMSNewsArticle = {
      ...article,
      id: newId,
      slug,
      createdAt: now,
      updatedAt: now
    };
    
    articles.push(newArticle);
    this.saveNewsArticles(articles);
    return newArticle;
  }

  static updateNewsArticle(id: number, updates: Partial<Omit<CMSNewsArticle, 'id' | 'createdAt'>>): CMSNewsArticle | null {
    const articles = this.getNewsArticles();
    const index = articles.findIndex(a => a.id === id);
    
    if (index === -1) return null;
    
    articles[index] = {
      ...articles[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    this.saveNewsArticles(articles);
    return articles[index];
  }

  static deleteNewsArticle(id: number): boolean {
    const articles = this.getNewsArticles();
    const filteredArticles = articles.filter(a => a.id !== id);
    
    if (filteredArticles.length === articles.length) return false;
    
    this.saveNewsArticles(filteredArticles);
    return true;
  }

  // User management
  static getUser(): CMSUser {
    const data = localStorage.getItem(STORAGE_KEYS.USER);
    return data ? JSON.parse(data) : { username: '', isAuthenticated: false };
  }

  static saveUser(user: CMSUser): void {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  }

  static login(username: string, password: string): boolean {
    // Simple authentication - in real app, this would be more secure
    if (username === 'admin' && password === 'admin123') {
      const user: CMSUser = { username, isAuthenticated: true };
      this.saveUser(user);
      return true;
    }
    return false;
  }

  static logout(): void {
    const user: CMSUser = { username: '', isAuthenticated: false };
    this.saveUser(user);
  }

  // Generate slugs for existing articles that don't have them
  static generateSlugsForExistingArticles(): void {
    const articles = this.getNewsArticles();
    const existingSlugs: string[] = [];
    let hasChanges = false;
    
    // First pass: collect existing slugs
    articles.forEach(article => {
      if (article.slug) {
        existingSlugs.push(article.slug);
      }
    });
    
    // Second pass: generate slugs for articles without them
    articles.forEach(article => {
      if (!article.slug) {
        const newSlug = createArticleSlug(article.title, existingSlugs);
        article.slug = newSlug;
        existingSlugs.push(newSlug);
        hasChanges = true;
        console.log(`Generated slug for article "${article.title}": ${newSlug}`);
      }
    });
    
    // Save if there were changes
    if (hasChanges) {
      this.saveNewsArticles(articles);
      console.log('Updated articles with generated slugs');
    }
  }

  // Clear all CMS data
  static clearAllData(): void {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  }
}

// Initialize data when module loads
LocalStorageManager.initializeData();
// Generate slugs for existing articles
LocalStorageManager.generateSlugsForExistingArticles();