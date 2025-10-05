import React, { useCallback } from 'react';
import { ArrowLeft, Shuffle, Check, X } from 'lucide-react';
import { useModuleState } from '../hooks/useModuleState.js';
import AccentKnoppen from '../components/AccentKnoppen.jsx';
import CompletionScreen from '../components/CompletionScreen.jsx';
import { dagen } from '../data/dagen.js';

/**
 * DagenModule - Practice days of the week in French
 * Supports bidirectional practice (Frans→NL and NL→Frans)
 */
const DagenModule = React.memo(({ onTerug }) => {
  const {
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
    isVoltooid,
    totaalVragen,
    juisteAntwoorden,
    hoogsteStreak,
    herstart
  } = useModuleState(dagen);

  // Handle answer checking
  const handleControleer = useCallback(() => {
    const correctAnswer = richting === 'frans-nl' ? huidig.nederlands : huidig.frans;
    controleerAntwoord(antwoord, correctAnswer, false);
  }, [richting, antwoord, huidig, controleerAntwoord]);

  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter') {
      if (feedback !== null) {
        volgend();
      } else {
        handleControleer();
      }
    }
  }, [feedback, handleControleer, volgend]);

  // Show completion screen when finished
  if (isVoltooid) {
    return (
      <CompletionScreen
        totaalVragen={totaalVragen}
        juisteAntwoorden={juisteAntwoorden}
        hoogsteStreak={hoogsteStreak}
        onOpnieuw={herstart}
        onMenu={onTerug}
        moduleKleur="purple"
      />
    );
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-purple-400 to-purple-600 p-8"
      onKeyDown={handleKeyPress}
      tabIndex={-1}
      data-module-container
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
            Dagen van de Week
          </h2>

          <button
            onClick={wisselRichting}
            className="w-full mb-6 bg-purple-500 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-purple-600"
          >
            <Shuffle className="w-4 h-4" />
            {richting === 'frans-nl' ? 'Frans → Nederlands' : 'Nederlands → Frans'}
          </button>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-8 mb-6">
            <p className="text-sm text-gray-600 mb-2 text-center">
              Welke dag is dit?
            </p>
            <p className="text-5xl font-bold text-center text-gray-800 mb-6">
              {richting === 'frans-nl' ? huidig.frans : huidig.nederlands}
            </p>

            {richting === 'nl-frans' && <AccentKnoppen onInsert={voegAccentToe} />}

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
                onClick={handleControleer}
                className="w-full bg-purple-500 text-white py-3 rounded-lg font-bold hover:bg-purple-600"
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
                    Het juiste antwoord is: <strong>{richting === 'frans-nl' ? huidig.nederlands : huidig.frans}</strong>
                  </p>
                )}
              </div>
            )}

            {feedback !== null && (
              <button
                onClick={volgend}
                className="w-full bg-purple-500 text-white py-3 rounded-lg font-bold hover:bg-purple-600"
              >
                Volgende
              </button>
            )}
          </div>

          <p className="text-center text-sm text-gray-600">
            Vraag {huidigeIndex + 1} van {totaalVragen}
          </p>
        </div>
      </div>
    </div>
  );
});

DagenModule.displayName = 'DagenModule';

export default DagenModule;
