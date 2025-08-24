import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Newspaper, ArrowRight, Calendar, ArrowLeft } from 'lucide-react';
import { NewsArticle } from '@/types';
import { LocalStorageManager } from '@/utils/localStorage';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ArticleList() {
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
      summary: cmsArticle.preview || (cmsArticle.content ? cmsArticle.content.substring(0, 150) + '...' : 'No content available'),
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

  const handleNavigate = (sectionId: string) => {
    if (sectionId === 'home') {
      navigate('/');
      return;
    }
    
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Helmet>
        <title>Cat Articles & News | Cat Years Calculator</title>
        <meta name="description" content="Explore our complete collection of articles about cat health, aging, and care. Stay informed with the latest research and expert insights on feline wellness." />
        <meta name="keywords" content="cat articles, cat health news, feline care tips, cat aging research, pet health articles, cat wellness, veterinary insights" />
        <meta property="og:title" content="Cat Articles & News | Cat Years Calculator" />
        <meta property="og:description" content="Explore our complete collection of articles about cat health, aging, and care. Stay informed with the latest research and expert insights on feline wellness." />
        <meta name="twitter:title" content="Cat Articles & News | Cat Years Calculator" />
        <meta name="twitter:description" content="Explore our complete collection of articles about cat health, aging, and care. Stay informed with the latest research and expert insights on feline wellness." />
      </Helmet>
      
      <div className="min-h-screen bg-white text-black font-serif">
        <Header onNavigate={handleNavigate} />
      
      {/* Page Header */}
      <section className="py-16 bg-white border-b-2 border-black">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center mb-6">
            <Link 
              to="/" 
              className="inline-flex items-center text-black hover:underline font-serif font-bold mr-6"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to Home
            </Link>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Newspaper className="mr-3" size={40} />
              <h1 className="text-5xl font-bold font-serif text-black">
                ALL ARTICLES
              </h1>
            </div>
            <p className="text-xl text-gray-700 font-serif max-w-3xl mx-auto leading-relaxed">
              Explore our complete collection of articles about cat health, aging, and care. 
              Stay informed with the latest research and expert insights.
            </p>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          {articles.length === 0 ? (
            <div className="text-center py-16">
              <Newspaper size={64} className="mx-auto mb-4 text-gray-400" />
              <h3 className="text-2xl font-bold font-serif text-gray-600 mb-2">
                No Articles Available
              </h3>
              <p className="text-lg font-serif text-gray-500">
                Check back later for new articles and updates.
              </p>
            </div>
          ) : (
            <>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold font-serif text-black mb-4">
                  {articles.length} ARTICLE{articles.length !== 1 ? 'S' : ''} FOUND
                </h2>
                <div className="w-24 h-1 bg-black mx-auto"></div>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.map((article) => (
                  <article
                    key={article.id}
                    className="bg-white border-2 border-black overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
                    onClick={() => handleArticleClick(article)}
                  >
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={article.imageUrl}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        <Calendar size={16} className="mr-2 text-gray-600" />
                        <span className="text-sm font-serif text-gray-600">
                          {formatDate(article.publishDate)}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold font-serif text-black mb-4 leading-tight group-hover:underline">
                        {article.title}
                      </h3>
                      
                      <p className="text-base font-serif text-gray-700 leading-relaxed mb-6 break-words">
                        {article.summary}
                      </p>
                      
                      <div className="flex items-center text-black font-serif font-bold text-sm uppercase tracking-wide group-hover:underline">
                        Read Full Article
                        <ArrowRight size={16} className="ml-2" />
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gray-50 border-t-2 border-black">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold font-serif text-black mb-4">
            STAY INFORMED
          </h3>
          <p className="text-lg font-serif text-gray-700 mb-8 max-w-2xl mx-auto">
            Want to stay updated with the latest in cat health and aging research? 
            Follow reputable veterinary sources and pet health websites.
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
      </section>
        
        <Footer />
      </div>
    </>
  );
}