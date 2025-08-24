import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft } from 'lucide-react';
import { LocalStorageManager } from '../utils/localStorage';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SocialShare from '@/components/SocialShare';

const Article: React.FC = () => {
  const { id, slug } = useParams<{ id: string; slug: string }>();
  const cmsData = LocalStorageManager.getNewsArticles();
  // Sort by createdAt in descending order (newest first)
  const sortedCmsData = cmsData.sort((a, b) => {
    const dateA = new Date(a.createdAt || a.date);
    const dateB = new Date(b.createdAt || b.date);
    return dateB.getTime() - dateA.getTime();
  });
  const articles = sortedCmsData.map(cmsArticle => ({
    id: cmsArticle.id,
    title: cmsArticle.title,
    summary: cmsArticle.content ? cmsArticle.content.substring(0, 150) + '...' : 'No content available',
    publishDate: cmsArticle.date,
    imageUrl: cmsArticle.imageUrl || '',
    externalUrl: cmsArticle.externalUrl || '',
    image: cmsArticle.image,
    preview: cmsArticle.preview,
    content: cmsArticle.content,
    slug: cmsArticle.slug
  }));
  
  // Find article by slug or ID for backward compatibility
  const article = slug 
    ? articles.find(a => a.slug === slug)
    : articles.find(a => a.id === parseInt(id || '0'));
  
  if (!article) {
    return <Navigate to="/404" replace />;
  }

  // Use article content if available, otherwise generate default content
  const getArticleContent = () => {
    if (article.content) {
      // Split content by double newlines to create paragraphs
      return article.content.split('\n\n').filter(paragraph => paragraph.trim());
    }
    
    // Fallback to generated content if no content is available
    return [
      `${article.summary} This comprehensive guide will provide you with detailed insights and practical advice to help you better understand and care for your feline companion.`,
      "Understanding your cat's needs is essential for maintaining their health and happiness. Regular monitoring, proper nutrition, and appropriate care adjustments based on age are crucial factors that every cat owner should consider.",
      "Veterinary professionals recommend regular health checkups, especially as cats age. Early detection of age-related issues can significantly improve your cat's quality of life and longevity.",
      "By following these guidelines and staying informed about your cat's changing needs, you can ensure they live a healthy, comfortable life throughout all their years."
    ];
  };

  const contentParagraphs = getArticleContent();

  const handleNavigate = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Helmet>
        <title>{article.title} | Cat Years Calculator</title>
        <meta name="description" content={`${article.preview || article.summary} Read the full article on Cat Years Chronicle for expert insights on cat health and care.`} />
        <meta name="keywords" content={`cat health, feline care, ${article.title.toLowerCase()}, cat aging, pet wellness, veterinary advice`} />
        <meta property="og:title" content={`${article.title} | Cat Years Calculator`} />
        <meta property="og:description" content={`${article.preview || article.summary} Read the full article on Cat Years Chronicle for expert insights on cat health and care.`} />
        <meta property="og:image" content={article.image || article.imageUrl} />
        <meta name="twitter:title" content={`${article.title} | Cat Years Calculator`} />
        <meta name="twitter:description" content={`${article.preview || article.summary} Read the full article on Cat Years Chronicle for expert insights on cat health and care.`} />
        <meta name="twitter:image" content={article.image || article.imageUrl} />
      </Helmet>
      
      <div className="min-h-screen bg-white text-black">
        <Header onNavigate={handleNavigate} />
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Navigation */}
        <Link 
          to="/articles" 
          className="inline-flex items-center gap-2 text-black hover:underline mb-6 font-mono text-sm"
        >
          <ArrowLeft size={16} />
          Back to Articles
        </Link>

        {/* Article Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold font-mono mb-4 leading-tight">
            {article.title}
          </h1>
          <div className="flex items-center gap-4 text-sm font-mono text-gray-600 mb-6">
            <time dateTime={article.publishDate}>
              Published: {new Date(article.publishDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          </div>
        </header>

        {/* Article Image */}
        <div className="mb-8">
          <img 
            src={article.image || article.imageUrl} 
            alt={article.title}
            className="w-full h-64 md:h-96 object-cover border-2 border-black"
          />
        </div>

        {/* Article Preview */}
        {article.preview && (
          <div className="mb-8 p-6 bg-gray-50 border-l-4 border-black">
            <p className="font-mono text-lg leading-relaxed text-gray-800 italic">
              {article.preview}
            </p>
          </div>
        )}

        {/* Article Content */}
        <article className="prose prose-lg max-w-none">
          {contentParagraphs.map((paragraph, index) => (
            <div key={index} className="mb-6">
              <p className="font-mono text-base leading-relaxed text-justify break-words overflow-wrap-anywhere">
                {paragraph}
              </p>
            </div>
          ))}
        </article>

        {/* Social Share Section */}
        <div className="mt-12">
          <SocialShare 
            title={article.title}
            url={window.location.href}
            description={article.preview || article.summary}
          />
        </div>

        {/* Article Footer */}
        <footer className="mt-12 pt-8 border-t-2 border-black">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="font-mono text-sm text-gray-600">
              <p>Article ID: #{article.id}</p>
              <p>Category: Cat Care &amp; Health</p>
            </div>
            <Link 
              to="/articles" 
              className="bg-black text-white px-6 py-2 font-mono text-sm hover:bg-gray-800 transition-colors"
            >
              View More Articles
            </Link>
          </div>
        </footer>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Article;