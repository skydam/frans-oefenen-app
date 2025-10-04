import { normalizeString } from './normalize.js';

/**
 * Checks if a user's answer is correct
 * @param {string} userAnswer - The answer provided by the user
 * @param {string|Array} correctAnswer - The correct answer or array of acceptable answers
 * @param {Array} alternatives - Additional alternative answers (optional)
 * @returns {boolean} Whether the answer is correct
 */
export const checkAnswer = (userAnswer, correctAnswer, alternatives = []) => {
  const normalizedUser = normalizeString(userAnswer);

  // Build array of all acceptable answers
  const acceptableAnswers = [correctAnswer];

  // Add alternatives if provided
  if (alternatives && alternatives.length > 0) {
    acceptableAnswers.push(...alternatives);
  }

  // Check if answer matches any acceptable answer
  return acceptableAnswers.some(answer => normalizeString(answer) === normalizedUser);
};
