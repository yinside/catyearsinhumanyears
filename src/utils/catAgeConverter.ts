import { CatAgeInput, ConversionResult } from '@/types';

/**
 * Convert cat age to human age equivalent
 * Formula:
 * - First year: 1 cat month = 1.25 human years (15 years total)
 * - Second year: 15 + (months-12) * 0.75 (9 years total)
 * - After 2 years: 24 + (years-2) * 4
 */
export function convertCatToHumanAge(catAge: CatAgeInput): ConversionResult {
  const { years, months } = catAge;
  const totalMonths = years * 12 + months;
  
  let humanYears: number;
  let ageCategory: ConversionResult['ageCategory'];
  let description: string;
  
  if (totalMonths <= 12) {
    // First year: 1 cat month = 1.25 human years
    humanYears = Math.round(totalMonths * 1.25);
    ageCategory = 'kitten';
    description = 'Your cat is still a kitten, full of energy and curiosity!';
  } else if (totalMonths <= 24) {
    // Second year: 15 + (months-12) * 0.75
    humanYears = Math.round(15 + (totalMonths - 12) * 0.75);
    ageCategory = 'young';
    description = 'Your cat is a young adult, active and playful.';
  } else if (totalMonths <= 84) {
    // 2-7 years: Adult cat
    humanYears = Math.round(24 + (years - 2) * 4);
    ageCategory = 'adult';
    description = 'Your cat is in their prime adult years, mature and settled.';
  } else {
    // 7+ years: Senior cat
    humanYears = Math.round(24 + (years - 2) * 4);
    ageCategory = 'senior';
    description = 'Your cat is a senior, deserving extra care and attention.';
  }
  
  return {
    humanYears,
    ageCategory,
    description
  };
}

/**
 * Get age category color for styling
 */
export function getAgeCategoryColor(category: ConversionResult['ageCategory']): string {
  switch (category) {
    case 'kitten':
      return 'text-green-600';
    case 'young':
      return 'text-blue-600';
    case 'adult':
      return 'text-gray-600';
    case 'senior':
      return 'text-orange-600';
    default:
      return 'text-gray-600';
  }
}