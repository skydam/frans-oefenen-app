import React, { useState } from 'react';
import { Hash, Calendar, MessageSquare, BookOpen, Keyboard, ClipboardCheck } from 'lucide-react';
import { useScore } from '../context/ScoreContext.jsx';
import { useChapter } from '../context/ChapterContext.jsx';
import { getTestsForChapter } from '../data/testConfigs/index.js';
import ModuleKaart from './ModuleKaart.jsx';
import AccentHulp from './AccentHulp.jsx';

/**
 * Hoofdmenu - Main menu component showing all available modules
 * @param {Object} props
 * @param {Function} props.onModuleSelect - Callback when a module is selected
 */
const Hoofdmenu = React.memo(({ onModuleSelect }) => {
  const { score, streak, accuracyPercentage, recenteAntwoorden } = useScore();
  const { currentChapterMetadata, availableChapters, selectChapter, selectedChapterId } = useChapter();
  const [toonAccentHulp, setToonAccentHulp] = useState(false);

  // Get available tests for current chapter
  const availableTests = getTestsForChapter(selectedChapterId);

  // Determine performance message and color based on accuracy
  const getPerformanceInfo = () => {
    if (accuracyPercentage === null || recenteAntwoorden.length < 5) {
      return {
        message: "Begin met oefenen",
        color: "gray",
        bgColor: "bg-gray-100",
        textColor: "text-gray-800"
      };
    }
    if (accuracyPercentage >= 80) {
      return {
        message: "Uitstekend!",
        color: "green",
        bgColor: "bg-green-100",
        textColor: "text-green-800"
      };
    }
    if (accuracyPercentage >= 60) {
      return {
        message: "Goed bezig!",
        color: "yellow",
        bgColor: "bg-yellow-100",
        textColor: "text-yellow-800"
      };
    }
    if (accuracyPercentage >= 40) {
      return {
        message: "Blijf oefenen",
        color: "orange",
        bgColor: "bg-orange-100",
        textColor: "text-orange-800"
      };
    }
    return {
      message: "Meer oefenen nodig",
      color: "red",
      bgColor: "bg-red-100",
      textColor: "text-red-800"
    };
  };

  const performanceInfo = getPerformanceInfo();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-center mb-2 text-gray-800">
                Frans Oefenen
              </h1>
              <p className="text-center text-gray-600 mb-2">{currentChapterMetadata?.book} - {currentChapterMetadata?.name}</p>

              {/* Chapter selector */}
              {availableChapters.length > 1 && (
                <div className="flex justify-center mb-2">
                  <select
                    value={currentChapterMetadata?.id}
                    onChange={(e) => selectChapter(e.target.value)}
                    className="px-4 py-2 border-2 border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:outline-none"
                  >
                    {availableChapters.map(chapter => (
                      <option key={chapter.id} value={chapter.id}>
                        {chapter.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <p className="text-center text-sm text-gray-500 mb-2">Oefen door te <strong>typen</strong> - net als op de toets!</p>
            </div>
            <button
              onClick={() => setToonAccentHulp(true)}
              className="bg-blue-100 hover:bg-blue-200 text-blue-700 p-2 rounded-lg transition-colors"
              title="Hoe typ je accenten?"
            >
              <Keyboard className="w-6 h-6" />
            </button>
          </div>

          <div className="flex justify-center gap-4 mb-4 flex-wrap">
            <div className="bg-yellow-100 px-4 py-2 rounded-lg">
              <span className="font-bold text-yellow-800">Score: {score}</span>
            </div>
            <div className="bg-green-100 px-4 py-2 rounded-lg">
              <span className="font-bold text-green-800">Reeks: {streak} 🔥</span>
            </div>
            <div className={`${performanceInfo.bgColor} px-4 py-2 rounded-lg`}>
              <span className={`font-bold ${performanceInfo.textColor}`}>
                📊 Prestatie: {accuracyPercentage !== null ? `${accuracyPercentage}%` : '-'}
              </span>
            </div>
          </div>

          {/* Visual performance indicator */}
          {accuracyPercentage !== null && recenteAntwoorden.length >= 5 && (
            <div className="mb-4">
              <p className="text-center text-sm text-gray-600 mb-2">
                {performanceInfo.message} (laatste {recenteAntwoorden.length} vragen)
              </p>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    accuracyPercentage >= 80 ? 'bg-green-500' :
                    accuracyPercentage >= 60 ? 'bg-yellow-500' :
                    accuracyPercentage >= 40 ? 'bg-orange-500' :
                    'bg-red-500'
                  }`}
                  style={{ width: `${accuracyPercentage}%` }}
                />
              </div>
              {/* Visual history of recent answers */}
              <div className="flex justify-center gap-1 mt-2 flex-wrap">
                {recenteAntwoorden.map((correct, idx) => (
                  <span key={idx} className="text-sm">
                    {correct ? '✓' : '✗'}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ModuleKaart
            icon={<Hash className="w-8 h-8" />}
            titel="Getallen 0-20"
            beschrijving="Typ de getallen in het Frans"
            kleur="from-blue-400 to-blue-600"
            onClick={() => onModuleSelect('getallen')}
          />
          <ModuleKaart
            icon={<Calendar className="w-8 h-8" />}
            titel="Dagen van de Week"
            beschrijving="Schrijf de dagen in het Frans"
            kleur="from-purple-400 to-purple-600"
            onClick={() => onModuleSelect('dagen')}
          />
          <ModuleKaart
            icon={<MessageSquare className="w-8 h-8" />}
            titel="Vocabulaire"
            beschrijving="Type alle woorden uit Ch. 0 & 1"
            kleur="from-green-400 to-green-600"
            onClick={() => onModuleSelect('vocabulaire')}
          />
          <ModuleKaart
            icon={<BookOpen className="w-8 h-8" />}
            titel="Grammatica: Lidwoorden"
            beschrijving="Schrijf le/la/l'/les en un/une"
            kleur="from-pink-400 to-pink-600"
            onClick={() => onModuleSelect('grammatica')}
          />
          {/* Render test cards for current chapter */}
          {availableTests.map(test => (
            <ModuleKaart
              key={test.id}
              icon={<ClipboardCheck className="w-8 h-8" />}
              titel={test.name}
              beschrijving={test.description}
              kleur={test.color}
              onClick={() => onModuleSelect(`test:${test.id}`)}
            />
          ))}
        </div>

        {toonAccentHulp && <AccentHulp onClose={() => setToonAccentHulp(false)} />}
      </div>
    </div>
  );
});

Hoofdmenu.displayName = 'Hoofdmenu';

export default Hoofdmenu;
