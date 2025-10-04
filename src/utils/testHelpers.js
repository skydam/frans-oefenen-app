import { shuffleArray } from './shuffle.js';

/**
 * Selects random questions from a data array
 * @param {Array} data - Array of questions
 * @param {number} count - Number of questions to select
 * @returns {Array} Random selection of questions
 */
export const selectRandomQuestions = (data, count) => {
  const shuffled = shuffleArray(data);
  return shuffled.slice(0, Math.min(count, data.length));
};

/**
 * Creates a mixed test from all subjects
 * @param {Object} allData - Object containing all subject data
 * @param {Object} config - Test configuration
 * @returns {Array} Array of test questions with metadata
 */
export const createMixedTest = (allData, config) => {
  const { getallen, dagen, vocabulaire, voorbeelden } = allData;
  const { vragen } = config;

  const testQuestions = [];

  // Select questions from each category
  if (vragen.getallen) {
    const selected = selectRandomQuestions(getallen, vragen.getallen);
    selected.forEach(q => {
      // Randomly choose direction (50/50 chance)
      const richting = Math.random() < 0.5 ? 'frans-nl' : 'nl-frans';
      testQuestions.push({
        ...q,
        categorie: 'getallen',
        richting,
        vraag: richting === 'frans-nl' ? q.frans : q.getal.toString(),
        correctAntwoord: richting === 'frans-nl' ? q.getal.toString() : q.frans,
        alternatieven: richting === 'nl-frans' ? (q.alternatieven || []) : []
      });
    });
  }

  if (vragen.dagen) {
    const selected = selectRandomQuestions(dagen, vragen.dagen);
    selected.forEach(q => {
      const richting = Math.random() < 0.5 ? 'frans-nl' : 'nl-frans';
      testQuestions.push({
        ...q,
        categorie: 'dagen',
        richting,
        vraag: richting === 'frans-nl' ? q.frans : q.nederlands,
        correctAntwoord: richting === 'frans-nl' ? q.nederlands : q.frans,
        alternatieven: []
      });
    });
  }

  if (vragen.vocabulaire) {
    const selected = selectRandomQuestions(vocabulaire, vragen.vocabulaire);
    selected.forEach(q => {
      const richting = Math.random() < 0.5 ? 'frans-nl' : 'nl-frans';
      testQuestions.push({
        ...q,
        categorie: 'vocabulaire',
        richting,
        vraag: richting === 'frans-nl' ? q.frans : q.nederlands,
        correctAntwoord: richting === 'frans-nl' ? q.nederlands : q.frans,
        alternatieven: []
      });
    });
  }

  if (vragen.grammatica) {
    const selected = selectRandomQuestions(voorbeelden, vragen.grammatica);
    selected.forEach(q => {
      testQuestions.push({
        ...q,
        categorie: 'grammatica',
        richting: 'nl-frans', // Grammar is always NL→FR (fill in article)
        vraag: `___ ${q.woord}`,
        correctAntwoord: q.lidwoord,
        alternatieven: [],
        geslacht: q.geslacht
      });
    });
  }

  // Shuffle all questions together
  return shuffleArray(testQuestions);
};

/**
 * Calculates scores broken down by category
 * @param {Array} results - Array of test results with {categorie, correct}
 * @returns {Object} Scores by category
 */
export const calculateCategoryScores = (results) => {
  const categories = {
    getallen: { correct: 0, total: 0 },
    dagen: { correct: 0, total: 0 },
    vocabulaire: { correct: 0, total: 0 },
    grammatica: { correct: 0, total: 0 }
  };

  results.forEach(result => {
    if (categories[result.categorie]) {
      categories[result.categorie].total++;
      if (result.correct) {
        categories[result.categorie].correct++;
      }
    }
  });

  // Calculate percentages
  Object.keys(categories).forEach(cat => {
    const { correct, total } = categories[cat];
    categories[cat].percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
  });

  return categories;
};
