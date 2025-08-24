import { useState } from 'react';
import { Calculator as CalculatorIcon, Cat } from 'lucide-react';
import { convertCatToHumanAge, getAgeCategoryColor } from '@/utils/catAgeConverter';
import { CatAgeInput, ConversionResult } from '@/types';

export default function Calculator() {
  const [catAge, setCatAge] = useState<CatAgeInput>({ years: 0, months: 0 });
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);

  const handleCalculate = () => {
    if (catAge.years === 0 && catAge.months === 0) {
      return;
    }
    
    const conversionResult = convertCatToHumanAge(catAge);
    setResult(conversionResult);
    setHasCalculated(true);
  };

  const handleReset = () => {
    setCatAge({ years: 0, months: 0 });
    setResult(null);
    setHasCalculated(false);
  };

  const handleYearsChange = (value: string) => {
    const years = Math.max(0, Math.min(30, parseInt(value) || 0));
    setCatAge(prev => ({ ...prev, years }));
  };

  const handleMonthsChange = (value: string) => {
    const months = Math.max(0, Math.min(11, parseInt(value) || 0));
    setCatAge(prev => ({ ...prev, months }));
  };

  return (
    <section id="calculator" className="py-16 bg-gray-50 border-t-2 border-black">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <CalculatorIcon className="mr-3" size={32} />
            <h2 className="text-4xl font-bold font-serif text-black">
              CAT AGE CALCULATOR
            </h2>
          </div>
          <p className="text-lg text-gray-700 font-serif max-w-2xl mx-auto">
            Enter your cat's age below to discover their equivalent human age using our scientifically-based conversion formula.
          </p>
        </div>

        <div className="bg-white border-2 border-black p-8 max-w-2xl mx-auto">
          {/* Input Section */}
          <div className="mb-8">
            <h3 className="text-xl font-bold font-serif text-black mb-6 text-center">
              Enter Your Cat's Age
            </h3>
            
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-serif font-bold text-black mb-2">
                  YEARS
                </label>
                <input
                  type="number"
                  min="0"
                  max="30"
                  value={catAge.years || ''}
                  onChange={(e) => handleYearsChange(e.target.value)}
                  className="w-full p-3 border-2 border-black font-serif text-lg text-center focus:outline-none focus:ring-2 focus:ring-gray-400"
                  placeholder="0"
                />
              </div>
              
              <div>
                <label className="block text-sm font-serif font-bold text-black mb-2">
                  MONTHS
                </label>
                <input
                  type="number"
                  min="0"
                  max="11"
                  value={catAge.months || ''}
                  onChange={(e) => handleMonthsChange(e.target.value)}
                  className="w-full p-3 border-2 border-black font-serif text-lg text-center focus:outline-none focus:ring-2 focus:ring-gray-400"
                  placeholder="0"
                />
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={handleCalculate}
                disabled={catAge.years === 0 && catAge.months === 0}
                className="px-8 py-3 bg-black text-white font-serif font-bold uppercase tracking-wide hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors border-2 border-black"
              >
                Calculate Age
              </button>
              
              {hasCalculated && (
                <button
                  onClick={handleReset}
                  className="px-8 py-3 bg-white text-black font-serif font-bold uppercase tracking-wide hover:bg-gray-100 transition-colors border-2 border-black"
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* Result Section */}
          {result && (
            <div className="border-t-2 border-black pt-8">
              <div className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <Cat className="mr-3" size={28} />
                  <h3 className="text-2xl font-bold font-serif text-black">
                    CONVERSION RESULT
                  </h3>
                </div>
                
                <div className="bg-gray-50 border-2 border-black p-6 mb-4">
                  <div className="text-5xl font-bold font-serif text-black mb-2">
                    {result.humanYears}
                  </div>
                  <div className="text-lg font-serif text-gray-700 mb-2">
                    Human Years Old
                  </div>
                  <div className={`text-sm font-serif font-bold uppercase tracking-wide ${getAgeCategoryColor(result.ageCategory)}`}>
                    {result.ageCategory}
                  </div>
                </div>
                
                <p className="text-base font-serif text-gray-700 leading-relaxed">
                  {result.description}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}