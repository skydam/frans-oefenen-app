/**
 * Chapter Registry
 * Central index of all available chapters
 */
import { chapterMetadata as ch01Metadata } from './ch0-1/metadata.js';
import { getallen as ch01Getallen } from './ch0-1/getallen.js';
import { dagen as ch01Dagen } from './ch0-1/dagen.js';
import { vocabulaire as ch01Vocabulaire } from './ch0-1/vocabulaire.js';
import { voorbeelden as ch01Voorbeelden } from './ch0-1/voorbeelden.js';

/**
 * Chapter data structure
 */
export const chapters = {
  'ch0-1': {
    metadata: ch01Metadata,
    data: {
      getallen: ch01Getallen,
      dagen: ch01Dagen,
      vocabulaire: ch01Vocabulaire,
      voorbeelden: ch01Voorbeelden
    }
  }
  // Add more chapters here as they're created
  // 'ch2-3': { ... },
  // 'ch4-5': { ... },
};

/**
 * Get list of all available chapters
 */
export const getAvailableChapters = () => {
  return Object.keys(chapters).map(id => ({
    id,
    ...chapters[id].metadata
  }));
};

/**
 * Get chapter data by ID
 */
export const getChapterData = (chapterId) => {
  return chapters[chapterId]?.data || null;
};

/**
 * Get chapter metadata by ID
 */
export const getChapterMetadata = (chapterId) => {
  return chapters[chapterId]?.metadata || null;
};
