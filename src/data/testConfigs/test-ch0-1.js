/**
 * Test Configuration for Chapter 0-1
 * Mixed subject test covering introductory material
 */
export const testConfig = {
  id: 'test-ch0-1',
  name: 'Toets Hoofdstuk 0-1',
  description: 'Gemengde vragen uit hoofdstuk 0 & 1',
  chapterId: 'ch0-1',
  icon: 'ClipboardCheck',
  color: 'from-yellow-400 to-orange-500',

  vragen: {
    getallen: 5,      // 5 random number questions
    dagen: 3,         // 3 random day questions
    vocabulaire: 10,  // 10 random vocabulary questions
    grammatica: 4     // 4 random grammar questions
  },

  totaal: 22, // Total questions in test
  slaagPercentage: 75, // Percentage needed to pass (75%)
  tijdLimiet: null // No time limit (in seconds, or null for unlimited)
};
