import React, { createContext, useContext, useState, useEffect } from 'react';

const ScoreContext = createContext();

const POINTS_PER_CORRECT_ANSWER = 10;
const STORAGE_KEY = 'frans-oefenen-score';

export const ScoreProvider = ({ children }) => {
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [hoogsteStreak, setHoogsteStreak] = useState(0);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const { score: savedScore, streak: savedStreak, hoogsteStreak: savedHoogsteStreak } = JSON.parse(saved);
        setScore(savedScore || 0);
        setStreak(savedStreak || 0);
        setHoogsteStreak(savedHoogsteStreak || 0);
      }
    } catch (error) {
      console.error('Error loading score from localStorage:', error);
    }
  }, []);

  // Save to localStorage when score or streak changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ score, streak, hoogsteStreak }));
    } catch (error) {
      console.error('Error saving score to localStorage:', error);
    }
  }, [score, streak, hoogsteStreak]);

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
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  };

  return (
    <ScoreContext.Provider value={{ score, streak, hoogsteStreak, incrementScore, resetStreak, resetAll }}>
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
