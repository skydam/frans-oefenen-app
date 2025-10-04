import { normalizeString } from './normalize.js';

/**
 * Checks if a user's answer is correct
 * @param {string} userAnswer - The answer provided by the user
 * @param {string} correctAnswer - The correct answer
 * @param {Object} options - Additional options
 * @param {boolean} options.allowMultiple - Allow multiple correct answers separated by commas
 * @returns {boolean} Whether the answer is correct
 */
export const checkAnswer = (userAnswer, correctAnswer, options = {}) => {
  const { allowMultiple = false } = options;

  if (allowMultiple) {
    const possibleAnswers = correctAnswer.split(',').map(normalizeString);
    return possibleAnswers.includes(normalizeString(userAnswer));
  }

  return normalizeString(userAnswer) === normalizeString(correctAnswer);
};
