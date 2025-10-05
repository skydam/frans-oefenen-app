import React, { useState, useCallback } from 'react';
import { ArrowLeft, Check, X } from 'lucide-react';
import { useModuleState } from '../hooks/useModuleState.js';
import AccentKnoppen from '../components/AccentKnoppen.jsx';
import CompletionScreen from '../components/CompletionScreen.jsx';
import { voorbeelden, lidwoorden } from '../data/voorbeelden.js';

/**
 * GrammaticaModule - Practice French articles (lidwoorden)
 * Supports two modes: theory (explanation) and practice (typing)
 */
const GrammaticaModule = React.memo(({ onTerug }) => {
  const [theorieModus, setTheorieModus] = useState(true);

  const {
    huidigeIndex,
    antwoord,
    setAntwoord,
    feedback,
    inputRef,
    huidig,
    voegAccentToe,
    controleerAntwoord,
    volgend,
    isVoltooid,
    totaalVragen,
    juisteAntwoorden,
    hoogsteStreak,
    herstart
  } = useModuleState(voorbeelden);

  // Handle answer checking
  const handleControleer = useCallback(() => {
    controleerAntwoord(antwoord, huidig.lidwoord, false);
  }, [antwoord, huidig, controleerAntwoord]);

  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter') {
      if (feedback !== null) {
        volgend();
      } else if (antwoord) {
        handleControleer();
      }
    }
  }, [feedback, antwoord, handleControleer, volgend]);

  // Show completion screen when finished (only in practice mode)
  if (isVoltooid && !theorieModus) {
    return (
      <CompletionScreen
        totaalVragen={totaalVragen}
        juisteAntwoorden={juisteAntwoorden}
        hoogsteStreak={hoogsteStreak}
        onOpnieuw={herstart}
        onMenu={onTerug}
        moduleKleur="pink"
      />
    );
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-pink-400 to-rose-600 p-8"
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
            Grammatica: Lidwoorden
          </h2>

          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setTheorieModus(true)}
              className={`flex-1 py-2 rounded-lg font-semibold ${theorieModus ? 'bg-pink-500 text-white' : 'bg-gray-200'}`}
            >
              Theorie
            </button>
            <button
              onClick={() => setTheorieModus(false)}
              className={`flex-1 py-2 rounded-lg font-semibold ${!theorieModus ? 'bg-pink-500 text-white' : 'bg-gray-200'}`}
            >
              Oefenen (Typen)
            </button>
          </div>

          {theorieModus ? (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-6">
                <h3 className="font-bold text-xl mb-4 text-gray-800">Bepaalde Lidwoorden (de/het)</h3>
                <div className="space-y-2">
                  <p><strong>le</strong> = mannelijk (bijv. le camping, le garçon)</p>
                  <p><strong>la</strong> = vrouwelijk (bijv. la fille, la tente)</p>
                  <p><strong>l'</strong> = voor klinker (bijv. l'ami, l'hôtel)</p>
                  <p><strong>les</strong> = meervoud (bijv. les campings, les filles)</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
                <h3 className="font-bold text-xl mb-4 text-gray-800">Onbepaalde Lidwoorden (een)</h3>
                <div className="space-y-2">
                  <p><strong>un</strong> = mannelijk (bijv. un frère, un camping)</p>
                  <p><strong>une</strong> = vrouwelijk (bijv. une sœur, une tente)</p>
                </div>
              </div>

              <div className="bg-yellow-50 rounded-xl p-6">
                <h3 className="font-bold text-xl mb-4 text-gray-800">Tip</h3>
                <p className="text-gray-700">
                  Als je een woord leert, leer dan meteen het lidwoord erbij! Dus niet alleen "camping",
                  maar <strong>"le camping"</strong>. Zo weet je altijd of het mannelijk of vrouwelijk is.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6">
                <h3 className="font-bold text-xl mb-4 text-gray-800">Voorbeelden</h3>
                <div className="space-y-2">
                  <p>le camping → <strong>de camping</strong> (m)</p>
                  <p>la fille → <strong>het meisje</strong> (v)</p>
                  <p>l'hôtel → <strong>het hotel</strong> (m, klinker)</p>
                  <p>J'ai <strong>un</strong> frère et <strong>une</strong> sœur. → Ik heb een broer en een zus.</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-8 mb-6">
              <p className="text-sm text-gray-600 mb-2 text-center">
                Type het juiste lidwoord:
              </p>
              <p className="text-5xl font-bold text-center text-gray-800 mb-2">
                ___ {huidig.woord}
              </p>
              <p className="text-center text-sm text-gray-500 mb-6">
                ({huidig.geslacht === 'm' ? 'mannelijk' : 'vrouwelijk'})
              </p>

              <AccentKnoppen onInsert={voegAccentToe} />

              <input
                ref={inputRef}
                type="text"
                value={antwoord}
                onChange={(e) => setAntwoord(e.target.value)}
                placeholder="Type: le, la, l', un of une"
                className="w-full p-3 border-2 border-gray-300 rounded-lg mb-4 text-lg"
                disabled={feedback !== null}
                autoFocus
              />

              <p className="text-xs text-gray-500 mb-4 text-center">
                Tip: Voor l' moet je l en dan ' typen (apostrof)
              </p>

              {feedback === null && antwoord && (
                <button
                  onClick={handleControleer}
                  className="w-full bg-pink-500 text-white py-3 rounded-lg font-bold hover:bg-pink-600"
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
                      Het juiste antwoord is: <strong>{huidig.lidwoord} {huidig.woord}</strong>
                    </p>
                  )}
                  <p className="text-sm text-gray-600 mt-2">
                    Meervoud: <strong>{huidig.meervoud}</strong>
                  </p>
                </div>
              )}

              {feedback !== null && (
                <button
                  onClick={volgend}
                  className="w-full bg-pink-500 text-white py-3 rounded-lg font-bold hover:bg-pink-600"
                >
                  Volgende
                </button>
              )}
            </div>
          )}

          {!theorieModus && (
            <p className="text-center text-sm text-gray-600">
              Vraag {huidigeIndex + 1} van {totaalVragen}
            </p>
          )}
        </div>
      </div>
    </div>
  );
});

GrammaticaModule.displayName = 'GrammaticaModule';

export default GrammaticaModule;
