/**
 * Test Configs Registry
 * Central index of all available tests
 */
import { testConfig as testCh01 } from './test-ch0-1.js';

/**
 * All available tests
 */
export const availableTests = [
  testCh01
  // Add more tests here as they're created
  // testCh23,
  // testMidterm,
  // testFinal,
];

/**
 * Get test config by ID
 */
export const getTestConfig = (testId) => {
  return availableTests.find(test => test.id === testId) || null;
};

/**
 * Get all tests for a specific chapter
 */
export const getTestsForChapter = (chapterId) => {
  return availableTests.filter(test => test.chapterId === chapterId);
};
