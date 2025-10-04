import React from 'react';
import { RotateCcw, Home, Star, CheckCircle, XCircle, Clock } from 'lucide-react';

/**
 * TestResultsScreen - Shows test results with category breakdown
 * Displays overall score, pass/fail indicator, category scores, and time taken
 */
const TestResultsScreen = ({
  totaalVragen,
  juisteAntwoorden,
  categoryScores,
  tijdGenomen,
  onOpnieuw,
  onMenu
}) => {
  const percentage = Math.round((juisteAntwoorden / totaalVragen) * 100);
  const isPassed = percentage >= 75;

  // Format time as minutes:seconds
  const formatTime = (seconds) => {
    if (!seconds) return null;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Determine message based on score
  const getMessage = () => {
    if (percentage === 100) return "Perfect! Geweldig gedaan!";
    if (percentage >= 90) return "Uitstekend werk!";
    if (percentage >= 75) return "Geslaagd! Goed bezig!";
    if (percentage >= 60) return "Bijna! Blijf oefenen.";
    return "Blijf oefenen, je komt er wel!";
  };

  // Category display names
  const categoryNames = {
    getallen: 'Getallen',
    dagen: 'Dagen',
    vocabulaire: 'Vocabulaire',
    grammatica: 'Grammatica'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 to-orange-500 p-8 flex items-center justify-center">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            {isPassed ? (
              <Star className="w-20 h-20 text-yellow-500 fill-yellow-500" />
            ) : (
              <CheckCircle className="w-20 h-20 text-orange-500" />
            )}
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-2">
            Test Voltooid!
          </h2>
          <p className="text-xl text-gray-600">
            {getMessage()}
          </p>
        </div>

        {/* Overall Score */}
        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-orange-600" />
              <span className="text-lg font-semibold text-gray-700">Score</span>
            </div>
            <span className="text-3xl font-bold text-gray-800">
              {juisteAntwoorden} / {totaalVragen}
            </span>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              {isPassed ? (
                <Star className="w-8 h-8 text-yellow-500 fill-yellow-500" />
              ) : (
                <XCircle className="w-8 h-8 text-orange-600" />
              )}
              <span className="text-lg font-semibold text-gray-700">Resultaat</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-3xl font-bold ${isPassed ? 'text-green-600' : 'text-orange-600'}`}>
                {percentage}%
              </span>
              {isPassed && <span className="text-lg font-semibold text-green-600">⭐</span>}
            </div>
          </div>

          {tijdGenomen && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Clock className="w-8 h-8 text-orange-600" />
                <span className="text-lg font-semibold text-gray-700">Tijd</span>
              </div>
              <span className="text-2xl font-bold text-gray-800">
                {formatTime(tijdGenomen)}
              </span>
            </div>
          )}
        </div>

        {/* Category Breakdown */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Resultaten per Categorie</h3>
          <div className="space-y-3">
            {Object.entries(categoryScores).map(([category, scores]) => {
              if (scores.total === 0) return null;

              const categoryPercentage = scores.percentage;
              const isPassed = categoryPercentage >= 75;

              return (
                <div key={category} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-700">
                      {categoryNames[category] || category}
                    </span>
                    <span className={`font-bold ${isPassed ? 'text-green-600' : 'text-orange-600'}`}>
                      {scores.correct} / {scores.total} ({categoryPercentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${isPassed ? 'bg-green-500' : 'bg-orange-500'}`}
                      style={{ width: `${categoryPercentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={onOpnieuw}
            className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-2 hover:from-yellow-600 hover:to-orange-600 transition-all"
          >
            <RotateCcw className="w-5 h-5" />
            Opnieuw Testen
          </button>

          <button
            onClick={onMenu}
            className="w-full bg-gray-200 text-gray-800 py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-2 hover:bg-gray-300 transition-colors"
          >
            <Home className="w-5 h-5" />
            Terug naar Menu
          </button>
        </div>

        {!isPassed && (
          <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
            <p className="text-sm text-gray-700">
              <strong>Tip:</strong> Je hebt minimaal 75% nodig om te slagen.
              Blijf oefenen en probeer het opnieuw!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestResultsScreen;
