import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAvailableChapters, getChapterData, getChapterMetadata } from '../data/chapters/index.js';

const ChapterContext = createContext();

const STORAGE_KEY = 'frans-oefenen-selected-chapter';
const DEFAULT_CHAPTER = 'ch0-1';

export const ChapterProvider = ({ children }) => {
  const [selectedChapterId, setSelectedChapterId] = useState(DEFAULT_CHAPTER);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setSelectedChapterId(saved);
      }
    } catch (error) {
      console.error('Error loading chapter from localStorage:', error);
    }
  }, []);

  // Save to localStorage when chapter changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, selectedChapterId);
    } catch (error) {
      console.error('Error saving chapter to localStorage:', error);
    }
  }, [selectedChapterId]);

  // Get current chapter data
  const currentChapterData = getChapterData(selectedChapterId);
  const currentChapterMetadata = getChapterMetadata(selectedChapterId);

  // Get all available chapters
  const availableChapters = getAvailableChapters();

  const selectChapter = (chapterId) => {
    setSelectedChapterId(chapterId);
  };

  return (
    <ChapterContext.Provider value={{
      selectedChapterId,
      currentChapterData,
      currentChapterMetadata,
      availableChapters,
      selectChapter
    }}>
      {children}
    </ChapterContext.Provider>
  );
};

export const useChapter = () => {
  const context = useContext(ChapterContext);
  if (!context) {
    throw new Error('useChapter must be used within a ChapterProvider');
  }
  return context;
};
