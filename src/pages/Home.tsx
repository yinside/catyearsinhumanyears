import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Calculator from '@/components/Calculator';
import HowItWorks from '@/components/HowItWorks';
import FunFacts from '@/components/FunFacts';
import NewsArticles from '@/components/NewsArticles';

export default function Home() {
  const handleNavigate = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-black font-serif">
      <Header onNavigate={handleNavigate} />
      
      <Calculator />
      <HowItWorks />
      <FunFacts />
      <NewsArticles />
      
      <Footer />
    </div>
  );
}