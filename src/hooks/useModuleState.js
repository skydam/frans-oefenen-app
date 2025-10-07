import { useState, useRef, useCallback, useMemo } from 'react';
import { useScore } from '../context/ScoreContext.jsx';
import { checkAnswer } from '../utils/validation.js';
import { shuffleArray } from '../utils/shuffle.js';

/**
 * Custom hook for managing common module state and logic
 * Implements spaced repetition, question shuffling, and completion tracking
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

  const { score, incrementScore, resetStreak, hoogsteStreak, trackAnswer } = useScore();

  // Shuffle questions once on mount using useMemo
  const shuffledItems = useMemo(() => shuffleArray(dataItems), [dataItems]);

  const [huidigeIndex, setHuidigeIndex] = useState(0);
  const [richting, setRichting] = useState('frans-nl');
  const [antwoord, setAntwoord] = useState('');
  const [feedback, setFeedback] = useState(null);

  // Track answered questions and spaced repetition
  const [beantwoordeVragen, setBeantwoordeVragen] = useState(new Set());
  const [fouteVragen, setFouteVragen] = useState(new Map()); // Map of question index -> times needed to review
  const [isHerhaalFase, setIsHerhaalFase] = useState(false);
  const [herhaalVragen, setHerhaalVragen] = useState([]);
  const [herhaalIndex, setHerhaalIndex] = useState(0);
  const [juisteAntwoorden, setJuisteAntwoorden] = useState(0);
  const [isVoltooid, setIsVoltooid] = useState(false);

  // FIX: Use useRef instead of useState for input reference
  const inputRef = useRef(null);

  // Get current question based on phase (initial or review)
  const huidig = isHerhaalFase ? herhaalVragen[herhaalIndex] : shuffledItems[huidigeIndex];
  const totaalVragen = shuffledItems.length;

  // Get the original index of the current question in shuffledItems
  const getCurrentOriginalIndex = useCallback(() => {
    if (isHerhaalFase) {
      const currentQuestion = herhaalVragen[herhaalIndex];
      return shuffledItems.findIndex(item => item === currentQuestion);
    } else {
      return huidigeIndex;
    }
  }, [isHerhaalFase, herhaalIndex, herhaalVragen, huidigeIndex, shuffledItems]);

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
   * Implements spaced repetition logic
   */
  const controleerAntwoord = useCallback((userAnswer, correctAnswer, alternatives = []) => {
    const correct = checkAnswer(userAnswer, correctAnswer, alternatives);
    setFeedback(correct);

    // Track answer for rolling accuracy
    trackAnswer(correct);

    // Get the original index in shuffledItems (not the herhaalIndex!)
    const currentQuestionIndex = getCurrentOriginalIndex();

    if (correct) {
      incrementScore(); // Uses functional update internally
      setJuisteAntwoorden(prev => prev + 1);

      // If this was a review question, check if it's mastered
      if (isHerhaalFase) {
        setFouteVragen(prev => {
          const newMap = new Map(prev);
          const timesLeft = newMap.get(currentQuestionIndex) || 0;
          if (timesLeft <= 1) {
            newMap.delete(currentQuestionIndex); // Mastered!
          } else {
            newMap.set(currentQuestionIndex, timesLeft - 1);
          }
          return newMap;
        });
      }
    } else {
      resetStreak(); // Uses functional update internally

      // Add to review queue (need to answer correctly 2 times)
      if (!isHerhaalFase) {
        setFouteVragen(prev => {
          const newMap = new Map(prev);
          newMap.set(currentQuestionIndex, 2); // Need to answer correctly 2x
          return newMap;
        });
      }
    }

    // Mark as answered
    setBeantwoordeVragen(prev => new Set(prev).add(currentQuestionIndex));

    // Focus the container div so Enter key works for "Volgende"
    setTimeout(() => {
      const container = document.querySelector('[data-module-container]');
      container?.focus();
    }, 0);

    return correct;
  }, [incrementScore, resetStreak, trackAnswer, isHerhaalFase, getCurrentOriginalIndex]);

  /**
   * Moves to the next item
   * Handles transition to review phase and completion
   */
  const volgend = useCallback(() => {
    setAntwoord('');
    setFeedback(null);

    // Focus input for next question
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);

    if (isHerhaalFase) {
      // In review phase
      if (herhaalIndex < herhaalVragen.length - 1) {
        setHerhaalIndex(prev => prev + 1);
      } else {
        // Check if there are still questions to review
        if (fouteVragen.size > 0) {
          // Rebuild review queue from remaining incorrect questions
          const reviewQuestions = [];
          fouteVragen.forEach((times, idx) => {
            for (let i = 0; i < times; i++) {
              reviewQuestions.push(shuffledItems[idx]);
            }
          });
          setHerhaalVragen(shuffleArray(reviewQuestions));
          setHerhaalIndex(0);
        } else {
          // All questions mastered!
          setIsVoltooid(true);
        }
      }
    } else {
      // In initial phase
      if (huidigeIndex < shuffledItems.length - 1) {
        setHuidigeIndex(prev => prev + 1);
      } else {
        // Finished initial pass, check if there are questions to review
        if (fouteVragen.size > 0) {
          // Build review queue
          const reviewQuestions = [];
          fouteVragen.forEach((times, idx) => {
            for (let i = 0; i < times; i++) {
              reviewQuestions.push(shuffledItems[idx]);
            }
          });
          setHerhaalVragen(shuffleArray(reviewQuestions));
          setHerhaalIndex(0);
          setIsHerhaalFase(true);
        } else {
          // No incorrect answers, completed!
          setIsVoltooid(true);
        }
      }
    }
  }, [isHerhaalFase, herhaalIndex, herhaalVragen.length, huidigeIndex, shuffledItems, fouteVragen]);

  /**
   * Switches the direction (Frans→NL or NL→Frans)
   */
  const wisselRichting = useCallback(() => {
    setRichting(prev => prev === 'frans-nl' ? 'nl-frans' : 'frans-nl');
    setAntwoord('');
    setFeedback(null);
  }, []);

  /**
   * Restart the module
   */
  const herstart = useCallback(() => {
    setHuidigeIndex(0);
    setAntwoord('');
    setFeedback(null);
    setBeantwoordeVragen(new Set());
    setFouteVragen(new Map());
    setIsHerhaalFase(false);
    setHerhaalVragen([]);
    setHerhaalIndex(0);
    setJuisteAntwoorden(0);
    setIsVoltooid(false);
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
    wisselRichting,
    // Completion tracking
    isVoltooid,
    totaalVragen,
    juisteAntwoorden,
    hoogsteStreak,
    herstart,
    // Phase tracking
    isHerhaalFase,
    herhaalVragen
  };
};
