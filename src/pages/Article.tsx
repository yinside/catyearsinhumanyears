import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { LocalStorageManager } from '../utils/localStorage';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Article: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const articles = LocalStorageManager.getNewsArticles().map(cmsArticle => ({
    id: cmsArticle.id,
    title: cmsArticle.title,
    summary: cmsArticle.content ? cmsArticle.content.substring(0, 150) + '...' : 'No content available',
    publishDate: cmsArticle.date,
    imageUrl: cmsArticle.imageUrl || '',
    externalUrl: cmsArticle.externalUrl || ''
  }));
  
  const article = articles.find(a => a.id === parseInt(id || '0'));
  
  if (!article) {
    return <Navigate to="/articles" replace />;
  }

  // Generate full article content based on the summary
  const generateFullContent = (title: string, summary: string) => {
    const sections = [
      {
        heading: "Introduction",
        content: `${summary} This comprehensive guide will provide you with detailed insights and practical advice to help you better understand and care for your feline companion.`
      },
      {
        heading: "Key Points",
        content: "Understanding your cat's needs is essential for maintaining their health and happiness. Regular monitoring, proper nutrition, and appropriate care adjustments based on age are crucial factors that every cat owner should consider."
      },
      {
        heading: "Expert Recommendations",
        content: "Veterinary professionals recommend regular health checkups, especially as cats age. Early detection of age-related issues can significantly improve your cat's quality of life and longevity."
      },
      {
        heading: "Conclusion",
        content: "By following these guidelines and staying informed about your cat's changing needs, you can ensure they live a healthy, comfortable life throughout all their years."
      }
    ];
    
    return sections;
  };

  const contentSections = generateFullContent(article.title, article.summary);

  const handleNavigate = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
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
            src={article.imageUrl} 
            alt={article.title}
            className="w-full h-64 md:h-96 object-cover border-2 border-black"
          />
        </div>

        {/* Article Content */}
        <article className="prose prose-lg max-w-none">
          {contentSections.map((section, index) => (
            <section key={index} className="mb-8">
              <h2 className="text-2xl font-bold font-mono mb-4 border-b-2 border-black pb-2">
                {section.heading}
              </h2>
              <p className="font-mono text-base leading-relaxed text-justify">
                {section.content}
              </p>
            </section>
          ))}
        </article>

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
  );
};

export default Article;