import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowLeft, Check, X } from 'lucide-react';
import { getallen } from '../data/getallen.js';
import { dagen } from '../data/dagen.js';
import { vocabulaire } from '../data/vocabulaire.js';
import { voorbeelden } from '../data/voorbeelden.js';
import { testConfig } from '../data/testConfig.js';
import { createMixedTest, calculateCategoryScores } from '../utils/testHelpers.js';
import { checkAnswer } from '../utils/validation.js';
import { useScore } from '../context/ScoreContext.jsx';
import AccentKnoppen from '../components/AccentKnoppen.jsx';
import TestResultsScreen from '../components/TestResultsScreen.jsx';

/**
 * TestModule - Mixed subject test with all categories
 * One-shot test with 22 questions covering all subjects
 */
const TestModule = React.memo(({ onTerug }) => {
  const { trackAnswer } = useScore();
  const inputRef = useRef(null);

  // State
  const [testVragen, setTestVragen] = useState([]);
  const [huidigeIndex, setHuidigeIndex] = useState(0);
  const [antwoord, setAntwoord] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [results, setResults] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [isVoltooid, setIsVoltooid] = useState(false);

  // Initialize test on mount
  useEffect(() => {
    const allData = {
      getallen,
      dagen,
      vocabulaire,
      voorbeelden
    };
    const questions = createMixedTest(allData, testConfig);
    setTestVragen(questions);
    setStartTime(Date.now());
  }, []);

  // Current question
  const huidig = testVragen[huidigeIndex];

  // Insert accent character at cursor position
  const voegAccentToe = useCallback((accent) => {
    const input = inputRef.current;
    if (!input) return;

    const start = input.selectionStart;
    const end = input.selectionEnd;
    const newValue = antwoord.substring(0, start) + accent + antwoord.substring(end);

    setAntwoord(newValue);

    // Set cursor position after the inserted character
    setTimeout(() => {
      input.selectionStart = input.selectionEnd = start + accent.length;
      input.focus();
    }, 0);
  }, [antwoord]);

  // Check answer
  const controleerAntwoord = useCallback(() => {
    if (!huidig || antwoord.trim() === '') return;

    const isCorrect = checkAnswer(
      antwoord,
      huidig.correctAntwoord,
      huidig.alternatieven || []
    );

    setFeedback(isCorrect);
    trackAnswer(isCorrect);

    // Store result
    const result = {
      categorie: huidig.categorie,
      correct: isCorrect,
      userAnswer: antwoord,
      correctAntwoord: huidig.correctAntwoord,
      vraag: huidig.vraag
    };

    setResults(prev => [...prev, result]);

    // Focus the container div so Enter key works for "Volgende"
    setTimeout(() => {
      const container = document.querySelector('[data-test-container]');
      container?.focus();
    }, 0);
  }, [antwoord, huidig, trackAnswer]);

  // Move to next question or complete test
  const volgend = useCallback(() => {
    if (huidigeIndex + 1 >= testVragen.length) {
      // Test complete
      setIsVoltooid(true);
    } else {
      // Next question
      setHuidigeIndex(prev => prev + 1);
      setAntwoord('');
      setFeedback(null);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [huidigeIndex, testVragen.length]);

  // Handle Enter key
  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter') {
      if (feedback !== null) {
        volgend();
      } else {
        controleerAntwoord();
      }
    }
  }, [feedback, controleerAntwoord, volgend]);

  // Restart test
  const herstart = useCallback(() => {
    const allData = {
      getallen,
      dagen,
      vocabulaire,
      voorbeelden
    };
    const questions = createMixedTest(allData, testConfig);
    setTestVragen(questions);
    setHuidigeIndex(0);
    setAntwoord('');
    setFeedback(null);
    setResults([]);
    setStartTime(Date.now());
    setIsVoltooid(false);
  }, []);

  // Show results screen when test is complete
  if (isVoltooid) {
    const tijdGenomen = Math.floor((Date.now() - startTime) / 1000);
    const juisteAntwoorden = results.filter(r => r.correct).length;
    const categoryScores = calculateCategoryScores(results);

    return (
      <TestResultsScreen
        totaalVragen={testConfig.totaal}
        juisteAntwoorden={juisteAntwoorden}
        categoryScores={categoryScores}
        tijdGenomen={tijdGenomen}
        onOpnieuw={herstart}
        onMenu={onTerug}
      />
    );
  }

  // Loading state
  if (!huidig) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-400 to-orange-500 p-8 flex items-center justify-center">
        <div className="text-white text-2xl font-bold">Test wordt geladen...</div>
      </div>
    );
  }

  // Determine if we need accent buttons (for French answers)
  const needsAccents = huidig.richting === 'nl-frans';

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-yellow-400 to-orange-500 p-8"
      onKeyDown={handleKeyPress}
      tabIndex={-1}
      data-test-container
    >
      <div className="max-w-2xl mx-auto">
        <button
          onClick={onTerug}
          className="mb-4 flex items-center gap-2 text-white hover:text-gray-200"
        >
          <ArrowLeft /> Terug naar Menu
        </button>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Gemengde Test
          </h2>

          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-8 mb-6">
            <div className="mb-4">
              <span className="inline-block bg-orange-200 text-orange-800 px-3 py-1 rounded-full text-sm font-semibold">
                {huidig.categorie.charAt(0).toUpperCase() + huidig.categorie.slice(1)}
              </span>
            </div>

            <p className="text-sm text-gray-600 mb-2 text-center">
              {huidig.richting === 'frans-nl'
                ? 'Vertaal naar het Nederlands'
                : 'Vertaal naar het Frans'}
            </p>

            <p className="text-5xl font-bold text-center text-gray-800 mb-6">
              {huidig.vraag}
            </p>

            {needsAccents && <AccentKnoppen onInsert={voegAccentToe} />}

            <input
              ref={inputRef}
              type="text"
              value={antwoord}
              onChange={(e) => setAntwoord(e.target.value)}
              placeholder="Type je antwoord..."
              className="w-full p-3 border-2 border-gray-300 rounded-lg mb-4 text-lg"
              disabled={feedback !== null}
              autoFocus
            />

            {feedback === null && (
              <button
                onClick={controleerAntwoord}
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-3 rounded-lg font-bold hover:from-yellow-600 hover:to-orange-600 transition-all"
              >
                Controleer
              </button>
            )}

            {feedback !== null && (
              <div className={`p-4 rounded-lg mb-4 ${feedback ? 'bg-green-100' : 'bg-red-100'}`}>
                <div className="flex items-center gap-2 mb-2">
                  {feedback ? <Check className="text-green-600" /> : <X className="text-red-600" />}
                  <span className={`font-bold ${feedback ? 'text-green-600' : 'text-red-600'}`}>
                    {feedback ? 'Goed!' : 'Helaas...'}
                  </span>
                </div>
                {!feedback && (
                  <p className="text-gray-700">
                    Het juiste antwoord is: <strong>{huidig.correctAntwoord}</strong>
                  </p>
                )}
              </div>
            )}

            {feedback !== null && (
              <button
                onClick={volgend}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg font-bold hover:from-orange-600 hover:to-red-600 transition-all"
              >
                {huidigeIndex + 1 >= testVragen.length ? 'Bekijk Resultaten' : 'Volgende'}
              </button>
            )}
          </div>

          <p className="text-center text-sm text-gray-600">
            Vraag {huidigeIndex + 1} / {testVragen.length}
          </p>
        </div>
      </div>
    </div>
  );
});

TestModule.displayName = 'TestModule';

export default TestModule;
