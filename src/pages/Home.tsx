import { Helmet } from 'react-helmet-async';
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
    <>
      <Helmet>
        <title>Cat Years Calculator | Convert Cat Years In Human Years</title>
        <meta name="description" content="Discover your cat's age in human years with our accurate calculator. Learn fascinating facts about feline aging and explore cat-related articles." />
        <meta name="keywords" content="cat age calculator, cat years to human years, pet age converter, feline aging, cat health calculator, kitten age" />
        <meta property="og:title" content="Cat Years Calculator | Convert Cat Years In Human Years" />
        <meta property="og:description" content="Discover your cat's age in human years with our accurate calculator. Learn fascinating facts about feline aging and explore cat-related articles." />
        <meta name="twitter:title" content="Cat Years Calculator | Convert Cat Years In Human Years" />
        <meta name="twitter:description" content="Discover your cat's age in human years with our accurate calculator. Learn fascinating facts about feline aging and explore cat-related articles." />
      </Helmet>
      
      <div className="min-h-screen bg-white text-black font-serif">
        <Header onNavigate={handleNavigate} />
      
      <Calculator />
      <HowItWorks />
      <FunFacts />
      <NewsArticles />
      
        <Footer />
      </div>
    </>
  );
}