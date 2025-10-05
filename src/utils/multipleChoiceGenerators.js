/**
 * Multiple Choice Question Generators
 * Dynamically generates different questions each time using existing data
 */

import { shuffleArray } from './shuffle.js';

/**
 * Utility: Pick N random items from array
 */
const pickRandom = (array, count) => {
  const shuffled = shuffleArray([...array]);
  return shuffled.slice(0, Math.min(count, array.length));
};

/**
 * Utility: Pick one random item
 */
const pickOne = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

/**
 * Utility: Random integer between min and max (inclusive)
 */
const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Generator 1: Singular → Plural
 * Example: "het meervoud van: la semaine" → "les semaines"
 */
export const generateSingularToPluralQuestion = (voorbeelden) => {
  const word = pickOne(voorbeelden.filter(v => v.meervoud));

  const correct = word.meervoud;
  const singularForm = `${word.lidwoord} ${word.woord}`;

  // Generate wrong answers
  const wrongOptions = [];

  // Wrong article with plural noun
  if (word.lidwoord === 'le' || word.lidwoord === 'la') {
    wrongOptions.push(`${word.lidwoord} ${correct.replace('les ', '')}`);
  }

  // Spanish article (common mistake)
  wrongOptions.push(`las ${correct.replace('les ', '')}`);

  // L' instead of les (if applicable)
  if (word.klinker) {
    wrongOptions.push(`l'${correct.replace('les ', '')}`);
  } else {
    // Add another plausible wrong option
    wrongOptions.push(`la ${correct.replace('les ', '')}`);
  }

  return {
    type: 'multiple-choice',
    question: `het meervoud van: ${singularForm}`,
    options: shuffleArray([correct, ...pickRandom(wrongOptions, 2)]),
    correct: correct,
    points: 1
  };
};

/**
 * Generator 2: Plural → Singular
 * Example: "zet in het enkelvoud: les amis (m)" → "l'ami"
 */
export const generatePluralToSingularQuestion = (voorbeelden) => {
  const word = pickOne(voorbeelden.filter(v => v.meervoud));

  const correct = `${word.lidwoord} ${word.woord}`;
  const pluralForm = `${word.meervoud}${word.geslacht ? ` (${word.geslacht})` : ''}`;

  // Generate wrong answers
  const wrongOptions = [];

  // Keep plural form of article
  wrongOptions.push(`les ${word.woord}`);

  // Wrong singular article
  if (word.lidwoord === 'le') {
    wrongOptions.push(`la ${word.woord}`);
  } else if (word.lidwoord === 'la') {
    wrongOptions.push(`le ${word.woord}`);
  } else if (word.lidwoord === "l'") {
    wrongOptions.push(`le ${word.woord}`);
    wrongOptions.push(`la ${word.woord}`);
  }

  return {
    type: 'multiple-choice',
    question: `zet in het enkelvoud: ${pluralForm}`,
    options: shuffleArray([correct, ...pickRandom(wrongOptions, 2)]),
    correct: correct,
    points: 1
  };
};

/**
 * Generator 3: Replace le/la/l' with un/une
 * Example: "l'ami (m)" → "un"
 */
export const generateArticleSwapToUnUne = (voorbeelden) => {
  // Filter to only words with definite articles (le/la/l')
  const definiteArticleWords = voorbeelden.filter(v =>
    v.lidwoord === 'le' || v.lidwoord === 'la' || v.lidwoord === "l'"
  );

  if (definiteArticleWords.length === 0) {
    // Fallback to all words if no definite articles found
    const word = pickOne(voorbeelden);
    const correct = word.geslacht === 'm' ? 'un' : 'une';
    const wrong = word.geslacht === 'm' ? 'une' : 'un';

    return {
      type: 'multiple-choice',
      question: `${word.woord}${word.geslacht ? ` (${word.geslacht})` : ''}`,
      instruction: 'kies het juiste onbepaald lidwoord: un / une',
      options: shuffleArray([correct, wrong]),
      correct: correct,
      points: 1,
      columnFormat: true
    };
  }

  const word = pickOne(definiteArticleWords);
  const correct = word.geslacht === 'm' ? 'un' : 'une';
  const wrong = word.geslacht === 'm' ? 'une' : 'un';

  return {
    type: 'multiple-choice',
    question: `${word.lidwoord} ${word.woord}${word.geslacht ? ` (${word.geslacht})` : ''}`,
    instruction: 'vervang le/la/l\' door un / une',
    options: shuffleArray([correct, wrong]),
    correct: correct,
    points: 1,
    columnFormat: true // For grid display
  };
};

/**
 * Generator 4: Replace un/une with le/la/l'
 * Example: "une cousine" → "la"
 */
export const generateArticleSwapToLeLa = (voorbeelden) => {
  // Try to use words that already have definite articles set
  const definiteArticleWords = voorbeelden.filter(v =>
    v.lidwoord === 'le' || v.lidwoord === 'la' || v.lidwoord === "l'"
  );

  const word = definiteArticleWords.length > 0
    ? pickOne(definiteArticleWords)
    : pickOne(voorbeelden);

  // Determine source article (un/une based on gender)
  const sourceArticle = word.geslacht === 'm' ? 'un' : 'une';

  // Determine correct answer
  let correct = word.lidwoord;
  if (!correct || correct === 'un' || correct === 'une') {
    // Calculate correct article based on gender and klinker
    correct = word.klinker ? "l'" : (word.geslacht === 'm' ? 'le' : 'la');
  }

  // Generate wrong options
  const wrongOptions = [];
  if (correct === 'le') {
    wrongOptions.push('la', "l'");
  } else if (correct === 'la') {
    wrongOptions.push('le', "l'");
  } else if (correct === "l'") {
    wrongOptions.push('le', 'la');
  }

  return {
    type: 'multiple-choice',
    question: `${sourceArticle} ${word.woord}`,
    instruction: 'vervang un/une door le/la/l\'',
    options: shuffleArray([correct, ...pickRandom(wrongOptions, 2)]),
    correct: correct,
    points: 1,
    columnFormat: true
  };
};

/**
 * Generator 5: Math with Numbers
 * Example: "8 + 3 =" → "onze"
 */
export const generateNumberMathQuestion = (getallen) => {
  const maxNum = 20;
  const operation = Math.random() > 0.5 ? '+' : '-';

  let num1, num2, answer;

  if (operation === '+') {
    num1 = randomInt(0, 15);
    num2 = randomInt(1, maxNum - num1);
    answer = num1 + num2;
  } else {
    num1 = randomInt(5, maxNum);
    num2 = randomInt(1, num1);
    answer = num1 - num2;
  }

  const answerWord = getallen.find(g => g.getal === answer)?.frans || 'unknown';

  // Generate plausible wrong answers (nearby numbers)
  const wrongOptions = [];
  if (answer > 0 && getallen[answer - 1]) wrongOptions.push(getallen[answer - 1].frans);
  if (answer < maxNum && getallen[answer + 1]) wrongOptions.push(getallen[answer + 1].frans);
  if (answer > 1 && getallen[answer - 2]) wrongOptions.push(getallen[answer - 2].frans);
  if (answer < maxNum - 1 && getallen[answer + 2]) wrongOptions.push(getallen[answer + 2].frans);

  return {
    type: 'multiple-choice',
    question: `${num1} ${operation} ${num2} =`,
    options: shuffleArray([answerWord, ...pickRandom(wrongOptions, 2)]),
    correct: answerWord,
    points: 1
  };
};

/**
 * Generator 6: Number Sequencing
 * Example: Order [six, trois, quatorze, sept] → [trois, six, sept, quatorze]
 */
export const generateNumberSequencingQuestion = (getallen) => {
  const count = randomInt(6, 8);
  const selectedNumbers = pickRandom(getallen, count);

  const scrambled = shuffleArray(selectedNumbers.map(n => n.frans));
  const correctOrder = selectedNumbers
    .sort((a, b) => a.getal - b.getal)
    .map(n => n.frans);

  return {
    type: 'sequencing',
    question: 'Zet de getallen op volgorde (oplopend):',
    items: scrambled,
    correctOrder: correctOrder,
    points: count // 1 point per item
  };
};

/**
 * Generator 7: Odd One Out (Which doesn't belong?)
 * Example: [petit, grand, bien] → "bien" doesn't belong
 */
export const generateOddOneOutQuestion = (vocabulaire) => {
  // Group by category
  const categories = {};
  vocabulaire.forEach(word => {
    if (!categories[word.categorie]) {
      categories[word.categorie] = [];
    }
    categories[word.categorie].push(word);
  });

  const categoryNames = Object.keys(categories).filter(cat => categories[cat].length >= 2);

  // Pick main category (2-3 words from here)
  const mainCategory = pickOne(categoryNames);
  const inCategory = pickRandom(categories[mainCategory], 2);

  // Pick odd one out from different category
  const otherCategories = categoryNames.filter(c => c !== mainCategory);
  const otherCategory = pickOne(otherCategories);
  const oddOneOut = pickOne(categories[otherCategory]);

  const allOptions = [...inCategory, oddOneOut];

  return {
    type: 'multiple-choice',
    question: 'Welke woord hoort er niet bij?',
    options: shuffleArray(allOptions.map(w => w.frans)),
    correct: oddOneOut.frans,
    points: 1,
    hint: `"${oddOneOut.frans}" is ${oddOneOut.categorie}, de anderen zijn ${mainCategory}`
  };
};

/**
 * Generator 8: Dialogue Matching
 * Example: Match questions with appropriate responses
 */
export const generateDialogueMatchingQuestion = (vocabulaire) => {
  // Define common dialogue pairs from Chapter 0-1
  const dialoguePairs = [
    // Greetings and responses
    { q: "Bonjour, ça va?", a: "oui, ça va bien. Et toi?" },
    { q: "Salut!", a: "Salut, ça va?" },
    { q: "Comment tu t'appelles?", a: "Je m'appelle Roos" },
    { q: "Tu parles français?", a: "un peu" },
    { q: "Tu habites où?", a: "J'habite à Zwolle" },
    { q: "On a des devoirs?", a: "oui, page 10" },

    // Related word pairs (vocabulary matching)
    { q: "le chat", a: "le chien" },
    { q: "le garçon", a: "la fille" },
    { q: "le frère", a: "la sœur" },
    { q: "petit", a: "grand" },
    { q: "aujourd'hui", a: "le jour" },
    { q: "la famille", a: "les vacances" },
    { q: "la France", a: "français" },
    { q: "la piscine", a: "la tente" },

    // Actions and commands
    { q: "apprends", a: "les mots" },
    { q: "fais", a: "les devoirs" },
    { q: "travaille", a: "bien" },
    { q: "complète", a: "la page" },

    // Questions and logical answers
    { q: "Pourquoi?", a: "pour les vacances" },
    { q: "Ici?", a: "oui, ici" },
    { q: "Bon appétit!", a: "merci, et toi aussi" }
  ];

  const selectedPairs = pickRandom(dialoguePairs, 4);
  const questions = selectedPairs.map(p => p.q);
  const answers = shuffleArray(selectedPairs.map(p => p.a));

  const correctMatches = {};
  selectedPairs.forEach(pair => {
    correctMatches[pair.q] = pair.a;
  });

  return {
    type: 'matching',
    question: 'Maak combinaties die logisch zijn:',
    leftColumn: questions,
    rightColumn: answers,
    correctMatches: correctMatches,
    points: 4 // 1 point per pair
  };
};

/**
 * Generate a mixed practice test with all question types
 */
export const generatePracticeTest = (chapterData, config) => {
  const { getallen, vocabulaire, voorbeelden } = chapterData;
  const questions = [];

  config.questionTypes.forEach(({ type, count }) => {
    for (let i = 0; i < count; i++) {
      let question;

      switch (type) {
        case 'singular-to-plural':
          question = generateSingularToPluralQuestion(voorbeelden);
          break;
        case 'plural-to-singular':
          question = generatePluralToSingularQuestion(voorbeelden);
          break;
        case 'article-swap-to-un-une':
          question = generateArticleSwapToUnUne(voorbeelden);
          break;
        case 'article-swap-to-le-la':
          question = generateArticleSwapToLeLa(voorbeelden);
          break;
        case 'number-math':
          question = generateNumberMathQuestion(getallen);
          break;
        case 'number-sequencing':
          question = generateNumberSequencingQuestion(getallen);
          break;
        case 'odd-one-out':
          question = generateOddOneOutQuestion(vocabulaire);
          break;
        case 'dialogue-matching':
          question = generateDialogueMatchingQuestion(vocabulaire);
          break;
        default:
          console.warn(`Unknown question type: ${type}`);
      }

      if (question) {
        questions.push({ ...question, id: `${type}-${i}` });
      }
    }
  });

  return shuffleArray(questions);
};
