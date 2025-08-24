import { BookOpen, Clock, Heart, TrendingUp } from 'lucide-react';

export default function HowItWorks() {
  const ageStages = [
    {
      icon: <Clock className="text-green-600" size={24} />,
      stage: "First Year (0-12 months)",
      conversion: "1 cat month = 1.25 human years",
      description: "Rapid development phase where cats mature quickly from kitten to young adult.",
      humanEquivalent: "0-15 human years"
    },
    {
      icon: <TrendingUp className="text-blue-600" size={24} />,
      stage: "Second Year (13-24 months)",
      conversion: "Each month = 0.75 human years",
      description: "Continued growth and maturation, reaching full adult size and behavior.",
      humanEquivalent: "16-24 human years"
    },
    {
      icon: <Heart className="text-gray-600" size={24} />,
      stage: "Adult Years (2+ years)",
      conversion: "Each year = 4 human years",
      description: "Steady aging process where cats age approximately 4 human years for each cat year.",
      humanEquivalent: "25+ human years"
    }
  ];

  const factors = [
    {
      title: "Breed Variations",
      description: "Different cat breeds may age at slightly different rates, with larger breeds sometimes aging faster."
    },
    {
      title: "Indoor vs Outdoor",
      description: "Indoor cats typically live longer and may age more slowly due to reduced health risks."
    },
    {
      title: "Health & Nutrition",
      description: "Proper veterinary care and nutrition can significantly impact the aging process."
    },
    {
      title: "Individual Variation",
      description: "Just like humans, individual cats may age at different rates based on genetics and lifestyle."
    }
  ];

  return (
    <section id="how-it-works" className="py-16 bg-white border-t-2 border-black">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="mr-3" size={32} />
            <h2 className="text-4xl font-bold font-serif text-black">
              HOW IT WORKS
            </h2>
          </div>
          <p className="text-lg text-gray-700 font-serif max-w-3xl mx-auto">
            Our cat age calculator uses a scientifically-based formula that accounts for the rapid development 
            in a cat's early years and the more gradual aging process in their adult life.
          </p>
        </div>

        {/* Age Conversion Formula */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold font-serif text-black text-center mb-8">
            THE CONVERSION FORMULA
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {ageStages.map((stage, index) => (
              <div key={index} className="bg-gray-50 border-2 border-black p-6">
                <div className="flex items-center mb-4">
                  {stage.icon}
                  <h4 className="text-lg font-bold font-serif text-black ml-3">
                    {stage.stage}
                  </h4>
                </div>
                
                <div className="mb-4">
                  <div className="text-sm font-serif font-bold text-gray-800 mb-2">
                    CONVERSION RATE:
                  </div>
                  <div className="text-base font-serif text-black">
                    {stage.conversion}
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="text-sm font-serif font-bold text-gray-800 mb-2">
                    HUMAN EQUIVALENT:
                  </div>
                  <div className="text-base font-serif text-black">
                    {stage.humanEquivalent}
                  </div>
                </div>
                
                <p className="text-sm font-serif text-gray-700 leading-relaxed">
                  {stage.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Scientific Background */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold font-serif text-black text-center mb-8">
            SCIENTIFIC BACKGROUND
          </h3>
          
          <div className="bg-gray-50 border-2 border-black p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-bold font-serif text-black mb-4">
                  Why This Formula?
                </h4>
                <p className="text-base font-serif text-gray-700 leading-relaxed mb-4">
                  The traditional "7 cat years = 1 human year" rule is oversimplified. Modern veterinary 
                  science recognizes that cats mature much faster in their first two years of life.
                </p>
                <p className="text-base font-serif text-gray-700 leading-relaxed">
                  Our formula is based on research from veterinary professionals and reflects the actual 
                  developmental and aging patterns observed in domestic cats.
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-bold font-serif text-black mb-4">
                  Veterinary Consensus
                </h4>
                <p className="text-base font-serif text-gray-700 leading-relaxed mb-4">
                  This conversion method is endorsed by major veterinary organizations and provides a more 
                  accurate representation of your cat's life stage and health needs.
                </p>
                <p className="text-base font-serif text-gray-700 leading-relaxed">
                  Understanding your cat's human age equivalent helps in providing appropriate care, 
                  nutrition, and medical attention throughout their life.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Factors Affecting Aging */}
        <div>
          <h3 className="text-2xl font-bold font-serif text-black text-center mb-8">
            FACTORS AFFECTING CAT AGING
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {factors.map((factor, index) => (
              <div key={index} className="border-2 border-black p-6 bg-white">
                <h4 className="text-lg font-bold font-serif text-black mb-3">
                  {factor.title}
                </h4>
                <p className="text-base font-serif text-gray-700 leading-relaxed">
                  {factor.description}
                </p>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-sm font-serif text-gray-600 italic">
              Remember: This calculator provides estimates based on average aging patterns. 
              Always consult with your veterinarian for personalized health advice.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}