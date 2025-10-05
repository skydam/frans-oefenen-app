import React, { useState, useCallback } from 'react';
import { ArrowLeft, Shuffle, Check, X } from 'lucide-react';
import { useModuleState } from '../hooks/useModuleState.js';
import { useChapter } from '../context/ChapterContext.jsx';
import AccentKnoppen from '../components/AccentKnoppen.jsx';
import CompletionScreen from '../components/CompletionScreen.jsx';

/**
 * VocabulaireModule - Practice vocabulary from Chapters 0 & 1
 * Supports two modes: typing (quiz) and flashcards
 * Supports bidirectional practice (Frans→NL and NL→Frans)
 */
const VocabulaireModule = React.memo(({ onTerug }) => {
  const { currentChapterData } = useChapter();
  const vocabulaire = currentChapterData?.vocabulaire || [];

  const [oefenModus, setOefenModus] = useState('quiz');
  const [flashcardOmgedraaid, setFlashcardOmgedraaid] = useState(false);

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
  } = useModuleState(vocabulaire);

  // Handle answer checking with support for multiple answers
  const handleControleer = useCallback(() => {
    const correctAnswer = richting === 'frans-nl' ? huidig.nederlands : huidig.frans;
    // Allow multiple answers separated by commas
    controleerAntwoord(antwoord, correctAnswer, true);
  }, [richting, antwoord, huidig, controleerAntwoord]);

  // Enhanced volgend for flashcards
  const handleVolgend = useCallback(() => {
    volgend();
    setFlashcardOmgedraaid(false);
  }, [volgend]);

  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter') {
      if (feedback !== null) {
        handleVolgend();
      } else {
        handleControleer();
      }
    }
  }, [feedback, handleControleer, handleVolgend]);

  // Enhanced wisselRichting for flashcards
  const handleWisselRichting = useCallback(() => {
    wisselRichting();
    setFlashcardOmgedraaid(false);
  }, [wisselRichting]);

  // Show completion screen when finished
  if (isVoltooid) {
    return (
      <CompletionScreen
        totaalVragen={totaalVragen}
        juisteAntwoorden={juisteAntwoorden}
        hoogsteStreak={hoogsteStreak}
        onOpnieuw={herstart}
        onMenu={onTerug}
        moduleKleur="green"
      />
    );
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-green-400 to-emerald-600 p-8"
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
            Vocabulaire Ch. 0 & 1
          </h2>

          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setOefenModus('quiz')}
              className={`flex-1 py-2 rounded-lg font-semibold ${oefenModus === 'quiz' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
            >
              Typen (aanbevolen)
            </button>
            <button
              onClick={() => setOefenModus('flashcards')}
              className={`flex-1 py-2 rounded-lg font-semibold ${oefenModus === 'flashcards' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
            >
              Flashcards
            </button>
          </div>

          <button
            onClick={handleWisselRichting}
            className="w-full mb-6 bg-green-500 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-green-600"
          >
            <Shuffle className="w-4 h-4" />
            {richting === 'frans-nl' ? 'Frans → Nederlands' : 'Nederlands → Frans'}
          </button>

          {oefenModus === 'flashcards' ? (
            <div>
              <div
                onClick={() => setFlashcardOmgedraaid(!flashcardOmgedraaid)}
                className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-12 cursor-pointer hover:shadow-lg transition-all min-h-80 flex flex-col items-center justify-center mb-6"
              >
                <p className="text-sm text-gray-600 mb-4">
                  {flashcardOmgedraaid ? '(klik om terug te draaien)' : '(klik om om te draaien)'}
                </p>
                <p className="text-4xl font-bold text-center text-gray-800">
                  {flashcardOmgedraaid
                    ? (richting === 'frans-nl' ? huidig.nederlands : huidig.frans)
                    : (richting === 'frans-nl' ? huidig.frans : huidig.nederlands)
                  }
                </p>
              </div>

              <button
                onClick={handleVolgend}
                className="w-full bg-green-500 text-white py-3 rounded-lg font-bold hover:bg-green-600"
              >
                Volgende
              </button>
            </div>
          ) : (
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-8 mb-6">
              <p className="text-sm text-gray-600 mb-2 text-center">
                Wat betekent dit?
              </p>
              <p className="text-4xl font-bold text-center text-gray-800 mb-6">
                {richting === 'frans-nl' ? huidig.frans : huidig.nederlands}
              </p>

              <AccentKnoppen onInsert={voegAccentToe} />

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
                  className="w-full bg-green-500 text-white py-3 rounded-lg font-bold hover:bg-green-600"
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
                  onClick={handleVolgend}
                  className="w-full bg-green-500 text-white py-3 rounded-lg font-bold hover:bg-green-600"
                >
                  Volgende
                </button>
              )}
            </div>
          )}

          <p className="text-center text-sm text-gray-600">
            Woord {huidigeIndex + 1} van {totaalVragen}
          </p>
        </div>
      </div>
    </div>
  );
});

VocabulaireModule.displayName = 'VocabulaireModule';

export default VocabulaireModule;
