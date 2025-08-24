// Cat age input interface
export interface CatAgeInput {
  years: number;
  months: number;
}

// Conversion result interface
export interface ConversionResult {
  humanYears: number;
  ageCategory: 'kitten' | 'young' | 'adult' | 'senior';
  description: string;
}

// Fun fact interface
export interface FunFact {
  id: number;
  title: string;
  description: string;
  category: 'aging' | 'behavior' | 'health';
}

// News article interface
export interface NewsArticle {
  id: number;
  title: string;
  summary: string;
  imageUrl: string;
  publishDate: string;
  externalUrl: string;
}

// CMS related interfaces
export interface CMSUser {
  username: string;
  isAuthenticated: boolean;
}

export interface CMSContentItem {
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface CMSFunFact extends CMSContentItem {
  fact: string;
}

export interface CMSNewsArticle extends CMSContentItem {
  title: string;
  content: string;
  author: string;
  date: string;
  imageUrl?: string;
  externalUrl?: string;
}

export interface CMSFormData {
  title: string;
  description?: string;
  summary?: string;
  category?: string;
  imageUrl?: string;
  externalUrl?: string;
}

export interface CMSState {
  funFacts: CMSFunFact[];
  newsArticles: CMSNewsArticle[];
  user: CMSUser;
  isLoading: boolean;
  error: string | null;
}