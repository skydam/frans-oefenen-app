import React from 'react';
import { Award, RotateCcw, Home, Trophy, CheckCircle, TrendingUp } from 'lucide-react';

/**
 * CompletionScreen - Shows summary statistics after completing all questions
 * Displays score, streak, percentage, and options to restart or return to menu
 */
const CompletionScreen = ({
  totaalVragen,
  juisteAntwoorden,
  hoogsteStreak,
  onOpnieuw,
  onMenu,
  moduleKleur = 'blue'
}) => {
  const percentage = Math.round((juisteAntwoorden / totaalVragen) * 100);

  // Determine celebratory message based on score
  const getMessage = () => {
    if (percentage === 100) return "Perfect! Geweldig gedaan!";
    if (percentage >= 90) return "Uitstekend werk!";
    if (percentage >= 75) return "Goed bezig!";
    if (percentage >= 60) return "Niet slecht! Blijf oefenen.";
    return "Blijf oefenen, je komt er wel!";
  };

  // Color scheme based on module
  const colorSchemes = {
    blue: {
      gradient: 'from-blue-400 to-indigo-500',
      button: 'bg-blue-500 hover:bg-blue-600',
      text: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    purple: {
      gradient: 'from-purple-400 to-purple-600',
      button: 'bg-purple-500 hover:bg-purple-600',
      text: 'text-purple-600',
      bg: 'bg-purple-50'
    },
    green: {
      gradient: 'from-green-400 to-emerald-600',
      button: 'bg-green-500 hover:bg-green-600',
      text: 'text-green-600',
      bg: 'bg-green-50'
    },
    pink: {
      gradient: 'from-pink-400 to-rose-600',
      button: 'bg-pink-500 hover:bg-pink-600',
      text: 'text-pink-600',
      bg: 'bg-pink-50'
    }
  };

  const colors = colorSchemes[moduleKleur] || colorSchemes.blue;

  return (
    <div className={`min-h-screen bg-gradient-to-br ${colors.gradient} p-8 flex items-center justify-center`}>
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Trophy className={`w-20 h-20 ${colors.text}`} />
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-2">
            Module Voltooid!
          </h2>
          <p className="text-xl text-gray-600">
            {getMessage()}
          </p>
        </div>

        <div className={`${colors.bg} rounded-xl p-6 mb-6 space-y-4`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle className={`w-8 h-8 ${colors.text}`} />
              <span className="text-lg font-semibold text-gray-700">Score</span>
            </div>
            <span className="text-2xl font-bold text-gray-800">
              {juisteAntwoorden} / {totaalVragen}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Award className={`w-8 h-8 ${colors.text}`} />
              <span className="text-lg font-semibold text-gray-700">Percentage</span>
            </div>
            <span className={`text-2xl font-bold ${percentage >= 75 ? 'text-green-600' : 'text-orange-600'}`}>
              {percentage}%
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <TrendingUp className={`w-8 h-8 ${colors.text}`} />
              <span className="text-lg font-semibold text-gray-700">Hoogste Streak</span>
            </div>
            <span className="text-2xl font-bold text-gray-800">
              {hoogsteStreak}
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={onOpnieuw}
            className={`w-full ${colors.button} text-white py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-2 transition-colors`}
          >
            <RotateCcw className="w-5 h-5" />
            Opnieuw Oefenen
          </button>

          <button
            onClick={onMenu}
            className="w-full bg-gray-200 text-gray-800 py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-2 hover:bg-gray-300 transition-colors"
          >
            <Home className="w-5 h-5" />
            Terug naar Menu
          </button>
        </div>

        {percentage < 100 && (
          <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
            <p className="text-sm text-gray-700">
              <strong>Tip:</strong> Blijf oefenen om je score te verbeteren!
              Herhaling is de sleutel tot succes bij het leren van talen.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompletionScreen;
