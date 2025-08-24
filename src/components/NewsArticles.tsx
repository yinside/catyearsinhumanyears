import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Newspaper, Calendar, ArrowRight } from 'lucide-react';
import { NewsArticle } from '@/types';
import { LocalStorageManager } from '@/utils/localStorage';

export default function NewsArticles() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Load news articles from local storage (CMS managed data)
    const cmsData = LocalStorageManager.getNewsArticles();
    // Sort by createdAt in descending order (newest first)
    const sortedCmsData = cmsData.sort((a, b) => {
      const dateA = new Date(a.createdAt || a.date);
      const dateB = new Date(b.createdAt || b.date);
      return dateB.getTime() - dateA.getTime();
    });
    // Convert CMS format to display format
    const displayArticles: NewsArticle[] = sortedCmsData.map(cmsArticle => ({
      id: cmsArticle.id,
      title: cmsArticle.title,
      summary: cmsArticle.preview || (cmsArticle.content ? cmsArticle.content.substring(0, 100) + '...' : 'No content available'),
      publishDate: cmsArticle.date,
      imageUrl: cmsArticle.imageUrl || cmsArticle.image || '',
      externalUrl: cmsArticle.externalUrl || '',
      slug: cmsArticle.slug
    }));
    setArticles(displayArticles);
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleArticleClick = (article: NewsArticle) => {
    // Use slug if available, otherwise fall back to ID
    if (article.slug) {
      navigate(`/${article.slug}`);
    } else {
      navigate(`/${article.id}`);
    }
  };

  if (articles.length === 0) {
    return null;
  }

  return (
    <section id="news" className="py-16 bg-white border-t-2 border-black">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Newspaper className="mr-3" size={32} />
            <h2 className="text-4xl font-bold font-serif text-black">
              LATEST NEWS &amp; ARTICLES
            </h2>
          </div>
          <p className="text-lg text-gray-700 font-serif max-w-2xl mx-auto">
            Stay informed with the latest research and insights about cat health, aging, and care.
          </p>
        </div>

        {/* Featured Article */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold font-serif text-black text-center mb-8">
            FEATURED ARTICLE
          </h3>
          
          <div className="bg-gray-50 border-2 border-black overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img
                  src={articles[0].imageUrl}
                  alt={articles[0].title}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              
              <div className="md:w-1/2 p-8">
                <div className="flex items-center mb-4">
                  <Calendar size={16} className="mr-2 text-gray-600" />
                  <span className="text-sm font-serif text-gray-600">
                    {formatDate(articles[0].publishDate)}
                  </span>
                </div>
                
                <h4 className="text-2xl font-bold font-serif text-black mb-4">
                  {articles[0].title}
                </h4>
                
                <p className="text-base font-serif text-gray-700 leading-relaxed mb-6 break-words">
                  {articles[0].summary}
                </p>
                
                <button
                  onClick={() => handleArticleClick(articles[0])}
                  className="inline-flex items-center px-6 py-3 bg-black text-white font-serif font-bold uppercase tracking-wide hover:bg-gray-800 transition-colors border-2 border-black"
                >
                  Read Full Article
                  <ArrowRight size={16} className="ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Other Articles Grid */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold font-serif text-black">
              MORE ARTICLES
            </h3>
            <Link 
              to="/articles"
              className="inline-flex items-center text-black font-serif font-bold text-sm uppercase tracking-wide hover:underline transition-all duration-200"
            >
              View All Articles
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.slice(1, 4).map((article) => (
              <article
                key={article.id}
                className="bg-white border-2 border-black overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handleArticleClick(article)}
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <Calendar size={14} className="mr-2 text-gray-600" />
                    <span className="text-xs font-serif text-gray-600">
                      {formatDate(article.publishDate)}
                    </span>
                  </div>
                  
                  <h4 className="text-lg font-bold font-serif text-black mb-3 line-clamp-2">
                    {article.title}
                  </h4>
                  
                  <p className="text-sm font-serif text-gray-700 leading-relaxed mb-4 line-clamp-3 break-words">
                    {article.summary}
                  </p>
                  
                  <div className="flex items-center text-black font-serif font-bold text-sm uppercase tracking-wide hover:underline">
                    Read More
                    <ArrowRight size={14} className="ml-2" />
                  </div>
                </div>
              </article>
            ))}
          </div>
          
          {articles.length > 4 && (
            <div className="text-center mt-8">
              <Link 
                to="/articles"
                className="inline-flex items-center px-6 py-3 bg-black text-white font-serif font-bold uppercase tracking-wide hover:bg-gray-800 transition-colors border-2 border-black"
              >
                View All {articles.length} Articles
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
          )}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16">
          <div className="bg-gray-50 border-2 border-black p-8 text-center">
            <h3 className="text-2xl font-bold font-serif text-black mb-4">
              STAY UPDATED
            </h3>
            <p className="text-base font-serif text-gray-700 mb-6 max-w-2xl mx-auto">
              Want to stay informed about the latest in cat health and aging research? 
              Follow reputable veterinary sources and pet health websites for the most current information.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 border-2 border-black font-serif focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
              <button className="px-6 py-3 bg-black text-white font-serif font-bold uppercase tracking-wide hover:bg-gray-800 transition-colors border-2 border-black">
                Subscribe
              </button>
            </div>
            <p className="text-xs font-serif text-gray-600 mt-4">
              * This is a demo newsletter signup. No emails will be sent.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}