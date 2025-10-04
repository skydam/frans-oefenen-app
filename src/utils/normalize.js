/**
 * Normalizes a string for comparison by removing accents and converting to lowercase
 * @param {string} str - The string to normalize
 * @returns {string} Normalized string
 */
export const normalizeString = (str) =>
  str
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
