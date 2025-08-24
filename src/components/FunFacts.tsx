import { useState, useEffect } from 'react';
import { Lightbulb, ChevronLeft, ChevronRight } from 'lucide-react';
import { FunFact } from '@/types';
import funFactsData from '@/data/funFacts.json';

export default function FunFacts() {
  const [funFacts, setFunFacts] = useState<FunFact[]>([]);
  const [currentFactIndex, setCurrentFactIndex] = useState(0);

  useEffect(() => {
    // Load fun facts from static JSON data
    const displayFacts: FunFact[] = funFactsData.map(fact => ({
      id: fact.id,
      title: fact.title,
      description: fact.description,
      category: fact.category as 'aging' | 'behavior' | 'health'
    }));
    setFunFacts(displayFacts);
  }, []);

  const nextFact = () => {
    setCurrentFactIndex((prev) => (prev + 1) % funFacts.length);
  };

  const prevFact = () => {
    setCurrentFactIndex((prev) => (prev - 1 + funFacts.length) % funFacts.length);
  };

  const goToFact = (index: number) => {
    setCurrentFactIndex(index);
  };

  if (funFacts.length === 0) {
    return null;
  }

  const currentFact = funFacts[currentFactIndex];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'aging':
        return 'bg-blue-100 text-blue-800';
      case 'behavior':
        return 'bg-green-100 text-green-800';
      case 'health':
        return 'bg-red-100 text-red-800';
      case 'breeds':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <section id="fun-facts" className="py-16 bg-gray-50 border-t-2 border-black">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Lightbulb className="mr-3" size={32} />
            <h2 className="text-4xl font-bold font-serif text-black">
              FUN FACTS ABOUT CATS
            </h2>
          </div>
          <p className="text-lg text-gray-700 font-serif max-w-2xl mx-auto">
            Discover fascinating facts about our feline friends and learn more about their amazing lives.
          </p>
        </div>

        {/* Main Fact Display */}
        <div className="bg-white border-2 border-black p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={prevFact}
              className="p-2 hover:bg-gray-100 transition-colors border border-black"
              aria-label="Previous fact"
            >
              <ChevronLeft size={24} />
            </button>
            
            <div className="text-center flex-1">
              <div className={`inline-block px-3 py-1 rounded-full text-xs font-serif font-bold uppercase tracking-wide mb-4 ${getCategoryColor(currentFact.category)}`}>
                {currentFact.category}
              </div>
              <h3 className="text-2xl font-bold font-serif text-black mb-4">
                {currentFact.title}
              </h3>
            </div>
            
            <button
              onClick={nextFact}
              className="p-2 hover:bg-gray-100 transition-colors border border-black"
              aria-label="Next fact"
            >
              <ChevronRight size={24} />
            </button>
          </div>
          
          <p className="text-lg font-serif text-gray-700 leading-relaxed text-center">
            {currentFact.description}
          </p>
        </div>

        {/* Fact Navigation Dots */}
        <div className="flex justify-center space-x-3 mb-8">
          {funFacts.map((_, index) => (
            <button
              key={index}
              onClick={() => goToFact(index)}
              className={`w-3 h-3 rounded-full border border-black transition-colors ${
                index === currentFactIndex ? 'bg-black' : 'bg-white hover:bg-gray-200'
              }`}
              aria-label={`Go to fact ${index + 1}`}
            />
          ))}
        </div>

        {/* All Facts Grid */}
        <div>
          <h3 className="text-2xl font-bold font-serif text-black text-center mb-8">
            ALL FACTS
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {funFacts.map((fact, index) => (
              <div
                key={fact.id}
                className={`border-2 p-6 cursor-pointer transition-all duration-200 ${
                  index === currentFactIndex
                    ? 'border-black bg-white'
                    : 'border-gray-300 bg-white hover:border-black'
                }`}
                onClick={() => goToFact(index)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`px-2 py-1 rounded text-xs font-serif font-bold uppercase tracking-wide ${getCategoryColor(fact.category)}`}>
                    {fact.category}
                  </div>
                  <div className="text-sm font-serif text-gray-500">
                    #{fact.id}
                  </div>
                </div>
                
                <h4 className="text-lg font-bold font-serif text-black mb-3">
                  {fact.title}
                </h4>
                
                <p className="text-sm font-serif text-gray-700 leading-relaxed">
                  {fact.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}