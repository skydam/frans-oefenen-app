import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useChapter } from '../context/ChapterContext.jsx';
import { useScore } from '../context/ScoreContext.jsx';
import { getTestConfig } from '../data/testConfigs/index.js';
import { generatePracticeTest } from '../utils/multipleChoiceGenerators.js';
import MultipleChoiceQuestion from '../components/MultipleChoiceQuestion.jsx';
import SequencingQuestion from '../components/SequencingQuestion.jsx';
import MatchingQuestion from '../components/MatchingQuestion.jsx';
import TestResultsScreen from '../components/TestResultsScreen.jsx';

/**
 * TestPracticeModule - Multiple-choice practice test module
 * Questions are dynamically generated each time
 * @param {Function} onTerug - Callback to return to menu
 * @param {string} testId - ID of the test config to use
 */
const TestPracticeModule = React.memo(({ onTerug, testId }) => {
  const { trackAnswer } = useScore();
  const { currentChapterData } = useChapter();

  // Load test config
  const testConfig = getTestConfig(testId);

  // State
  const [testQuestions, setTestQuestions] = useState([]);
  const [huidigeIndex, setHuidigeIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showFeedback, setShowFeedback] = useState({});
  const [results, setResults] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [isVoltooid, setIsVoltooid] = useState(false);

  // Generate test on mount
  useEffect(() => {
    if (!currentChapterData || !testConfig) return;

    const questions = generatePracticeTest(currentChapterData, testConfig);
    setTestQuestions(questions);
    setStartTime(Date.now());
  }, [currentChapterData, testConfig]);

  // Current question
  const huidig = testQuestions[huidigeIndex];

  // Handle answer selection (multiple choice)
  const handleSelectAnswer = useCallback((answer) => {
    setAnswers(prev => ({
      ...prev,
      [huidigeIndex]: answer
    }));
  }, [huidigeIndex]);

  // Handle sequencing question completion
  const handleSequencingComplete = useCallback((isCorrect) => {
    setShowFeedback(prev => ({
      ...prev,
      [huidigeIndex]: true
    }));

    trackAnswer(isCorrect);

    setResults(prev => [
      ...prev,
      {
        questionIndex: huidigeIndex,
        correct: isCorrect,
        type: huidig.type
      }
    ]);
  }, [huidigeIndex, huidig, trackAnswer]);

  // Handle matching question completion
  const handleMatchingComplete = useCallback((isAllCorrect, correctCount) => {
    setShowFeedback(prev => ({
      ...prev,
      [huidigeIndex]: true
    }));

    // Track as correct if all matches are correct
    trackAnswer(isAllCorrect);

    setResults(prev => [
      ...prev,
      {
        questionIndex: huidigeIndex,
        correct: isAllCorrect,
        type: huidig.type,
        partialScore: correctCount
      }
    ]);
  }, [huidigeIndex, huidig, trackAnswer]);

  // Check answer (for multiple choice)
  const checkAnswer = useCallback(() => {
    if (!huidig || !answers[huidigeIndex]) return;

    const isCorrect = answers[huidigeIndex] === huidig.correct;

    setShowFeedback(prev => ({
      ...prev,
      [huidigeIndex]: true
    }));

    trackAnswer(isCorrect);

    setResults(prev => [
      ...prev,
      {
        questionIndex: huidigeIndex,
        correct: isCorrect,
        type: huidig.type
      }
    ]);
  }, [huidigeIndex, huidig, answers, trackAnswer]);

  // Move to next question
  const volgend = useCallback(() => {
    if (huidigeIndex + 1 >= testQuestions.length) {
      // Test complete
      setIsVoltooid(true);
    } else {
      setHuidigeIndex(prev => prev + 1);
    }
  }, [huidigeIndex, testQuestions.length]);

  // Restart test
  const herstart = useCallback(() => {
    if (!currentChapterData || !testConfig) return;

    // Generate new questions
    const questions = generatePracticeTest(currentChapterData, testConfig);
    setTestQuestions(questions);
    setHuidigeIndex(0);
    setAnswers({});
    setShowFeedback({});
    setResults([]);
    setStartTime(Date.now());
    setIsVoltooid(false);
  }, [currentChapterData, testConfig]);

  // Show results screen
  if (isVoltooid) {
    const tijdGenomen = Math.floor((Date.now() - startTime) / 1000);
    const juisteAntwoorden = results.filter(r => r.correct).length;

    // For compatibility with TestResultsScreen, we'll just show total score
    // (category breakdown not applicable for mixed question types)
    const categoryScores = {
      totaal: {
        correct: juisteAntwoorden,
        total: testConfig.totaal,
        percentage: Math.round((juisteAntwoorden / testConfig.totaal) * 100)
      }
    };

    return (
      <TestResultsScreen
        totaalVragen={testConfig.totaal}
        juisteAntwoorden={juisteAntwoorden}
        categoryScores={categoryScores}
        tijdGenomen={tijdGenomen}
        onOpnieuw={herstart}
        onMenu={onTerug}
        isPracticeTest={true}
      />
    );
  }

  // Loading state
  if (!huidig) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-400 to-red-500 p-8 flex items-center justify-center">
        <div className="text-white text-2xl font-bold">Test wordt geladen...</div>
      </div>
    );
  }

  const isFeedbackShown = showFeedback[huidigeIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 to-red-500 p-8">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={onTerug}
          className="mb-4 flex items-center gap-2 text-white hover:text-gray-200"
        >
          <ArrowLeft /> Terug naar Menu
        </button>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-3xl font-bold mb-2 text-center text-gray-800">
            {testConfig?.name || 'Toets Oefening'}
          </h2>
          <p className="text-center text-sm text-gray-600 mb-6">
            {testConfig?.description}
          </p>

          <div className="mb-6 flex justify-between items-center">
            <span className="text-sm font-semibold text-gray-600">
              Vraag {huidigeIndex + 1} / {testQuestions.length}
            </span>
            <span className="text-sm text-gray-600">
              {results.length} beantwoord
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
            <div
              className="bg-gradient-to-r from-orange-400 to-red-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${((huidigeIndex + 1) / testQuestions.length) * 100}%` }}
            />
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 mb-6">
            {/* Render appropriate question type */}
            {huidig.type === 'multiple-choice' && (
              <MultipleChoiceQuestion
                question={huidig.question}
                instruction={huidig.instruction}
                options={huidig.options}
                selectedAnswer={answers[huidigeIndex]}
                onSelect={handleSelectAnswer}
                showFeedback={isFeedbackShown}
                correctAnswer={huidig.correct}
                columnFormat={huidig.columnFormat}
              />
            )}

            {huidig.type === 'sequencing' && (
              <SequencingQuestion
                question={huidig.question}
                items={huidig.items}
                correctOrder={huidig.correctOrder}
                onComplete={handleSequencingComplete}
                showFeedback={isFeedbackShown}
              />
            )}

            {huidig.type === 'matching' && (
              <MatchingQuestion
                question={huidig.question}
                leftColumn={huidig.leftColumn}
                rightColumn={huidig.rightColumn}
                correctMatches={huidig.correctMatches}
                onComplete={handleMatchingComplete}
                showFeedback={isFeedbackShown}
              />
            )}
          </div>

          {/* Action buttons */}
          {huidig.type === 'multiple-choice' && !isFeedbackShown && (
            <button
              onClick={checkAnswer}
              disabled={!answers[huidigeIndex]}
              className={`w-full py-3 rounded-lg font-bold transition-all ${
                answers[huidigeIndex]
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Controleer
            </button>
          )}

          {isFeedbackShown && (
            <button
              onClick={volgend}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg font-bold hover:from-orange-600 hover:to-red-600 transition-all"
            >
              {huidigeIndex + 1 >= testQuestions.length ? 'Bekijk Resultaten' : 'Volgende Vraag'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
});

TestPracticeModule.displayName = 'TestPracticeModule';

export default TestPracticeModule;
