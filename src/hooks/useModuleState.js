import { useState, useRef, useCallback } from 'react';
import { useScore } from '../context/ScoreContext.jsx';
import { checkAnswer } from '../utils/validation.js';

/**
 * Custom hook for managing common module state and logic
 * @param {Array} dataItems - Array of items to practice
 * @param {Object} options - Configuration options
 * @param {boolean} options.supportsBidirectional - Whether the module supports bidirectional practice
 * @param {Function} options.getQuestion - Function to get the question text
 * @param {Function} options.getCorrectAnswer - Function to get the correct answer
 * @returns {Object} Module state and methods
 */
export const useModuleState = (dataItems, options = {}) => {
  const {
    supportsBidirectional = true,
    getQuestion,
    getCorrectAnswer
  } = options;

  const { incrementScore, resetStreak } = useScore();
  const [huidigeIndex, setHuidigeIndex] = useState(0);
  const [richting, setRichting] = useState('frans-nl');
  const [antwoord, setAntwoord] = useState('');
  const [feedback, setFeedback] = useState(null);

  // FIX: Use useRef instead of useState for input reference
  const inputRef = useRef(null);

  const huidig = dataItems[huidigeIndex];

  /**
   * Inserts an accent character at cursor position
   * FIX: Use requestAnimationFrame instead of setTimeout to prevent race conditions
   */
  const voegAccentToe = useCallback((accent) => {
    if (inputRef.current) {
      const start = inputRef.current.selectionStart;
      const end = inputRef.current.selectionEnd;
      const text = antwoord;
      const newText = text.substring(0, start) + accent + text.substring(end);
      setAntwoord(newText);

      // FIX: Use requestAnimationFrame for more reliable focus/selection
      requestAnimationFrame(() => {
        if (inputRef.current) {
          inputRef.current.focus();
          inputRef.current.setSelectionRange(start + 1, start + 1);
        }
      });
    } else {
      setAntwoord(prev => prev + accent);
    }
  }, [antwoord]);

  /**
   * Checks if the user's answer is correct
   * FIX: Use functional updates to avoid stale closures
   */
  const controleerAntwoord = useCallback((userAnswer, correctAnswer, allowMultiple = false) => {
    const correct = checkAnswer(userAnswer, correctAnswer, { allowMultiple });
    setFeedback(correct);

    if (correct) {
      incrementScore(); // Uses functional update internally
    } else {
      resetStreak(); // Uses functional update internally
    }

    return correct;
  }, [incrementScore, resetStreak]);

  /**
   * Moves to the next item
   * FIX: Use functional update for state
   */
  const volgend = useCallback(() => {
    setHuidigeIndex(prev => (prev + 1) % dataItems.length);
    setAntwoord('');
    setFeedback(null);
  }, [dataItems.length]);

  /**
   * Switches the direction (Frans→NL or NL→Frans)
   */
  const wisselRichting = useCallback(() => {
    setRichting(prev => prev === 'frans-nl' ? 'nl-frans' : 'frans-nl');
    setAntwoord('');
    setFeedback(null);
  }, []);

  return {
    huidigeIndex,
    richting,
    antwoord,
    setAntwoord,
    feedback,
    inputRef,
    huidig,
    voegAccentToe,
    controleerAntwoord,
    volgend,
    wisselRichting
  };
};
