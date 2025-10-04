import React, { createContext, useContext, useState, useEffect } from 'react';

const ScoreContext = createContext();

const POINTS_PER_CORRECT_ANSWER = 10;
const STORAGE_KEY = 'frans-oefenen-score';
const ROLLING_WINDOW_SIZE = 20; // Track last 20 answers for accuracy

export const ScoreProvider = ({ children }) => {
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [hoogsteStreak, setHoogsteStreak] = useState(0);
  const [recenteAntwoorden, setRecenteAntwoorden] = useState([]); // Rolling window of recent answers (true/false)

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const {
          score: savedScore,
          streak: savedStreak,
          hoogsteStreak: savedHoogsteStreak,
          recenteAntwoorden: savedRecent
        } = JSON.parse(saved);
        setScore(savedScore || 0);
        setStreak(savedStreak || 0);
        setHoogsteStreak(savedHoogsteStreak || 0);
        setRecenteAntwoorden(savedRecent || []);
      }
    } catch (error) {
      console.error('Error loading score from localStorage:', error);
    }
  }, []);

  // Save to localStorage when score or streak changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        score,
        streak,
        hoogsteStreak,
        recenteAntwoorden
      }));
    } catch (error) {
      console.error('Error saving score to localStorage:', error);
    }
  }, [score, streak, hoogsteStreak, recenteAntwoorden]);

  // Calculate rolling accuracy percentage
  const accuracyPercentage = recenteAntwoorden.length > 0
    ? Math.round((recenteAntwoorden.filter(Boolean).length / recenteAntwoorden.length) * 100)
    : null;

  /**
   * Track an answer in the rolling window
   * @param {boolean} isCorrect - Whether the answer was correct
   */
  const trackAnswer = (isCorrect) => {
    setRecenteAntwoorden(prev => {
      const updated = [...prev, isCorrect];
      // Keep only the last ROLLING_WINDOW_SIZE answers
      if (updated.length > ROLLING_WINDOW_SIZE) {
        return updated.slice(-ROLLING_WINDOW_SIZE);
      }
      return updated;
    });
  };

  const incrementScore = (points = POINTS_PER_CORRECT_ANSWER) => {
    setScore(prev => prev + points);
    setStreak(prev => {
      const newStreak = prev + 1;
      // Update hoogste streak if current streak is higher
      setHoogsteStreak(current => Math.max(current, newStreak));
      return newStreak;
    });
  };

  const resetStreak = () => {
    setStreak(0);
  };

  const resetAll = () => {
    setScore(0);
    setStreak(0);
    setHoogsteStreak(0);
    setRecenteAntwoorden([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  };

  return (
    <ScoreContext.Provider value={{
      score,
      streak,
      hoogsteStreak,
      accuracyPercentage,
      recenteAntwoorden,
      incrementScore,
      resetStreak,
      resetAll,
      trackAnswer
    }}>
      {children}
    </ScoreContext.Provider>
  );
};

export const useScore = () => {
  const context = useContext(ScoreContext);
  if (!context) {
    throw new Error('useScore must be used within a ScoreProvider');
  }
  return context;
};
