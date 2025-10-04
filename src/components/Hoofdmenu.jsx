import React, { useState } from 'react';
import { Hash, Calendar, MessageSquare, BookOpen, Keyboard } from 'lucide-react';
import { useScore } from '../context/ScoreContext.jsx';
import ModuleKaart from './ModuleKaart.jsx';
import AccentHulp from './AccentHulp.jsx';

/**
 * Hoofdmenu - Main menu component showing all available modules
 * @param {Object} props
 * @param {Function} props.onModuleSelect - Callback when a module is selected
 */
const Hoofdmenu = React.memo(({ onModuleSelect }) => {
  const { score, streak } = useScore();
  const [toonAccentHulp, setToonAccentHulp] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-center mb-2 text-gray-800">
                Frans Oefenen
              </h1>
              <p className="text-center text-gray-600 mb-2">Grandes Lignes - Chapitre 0 & 1</p>
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

          <div className="flex justify-center gap-4 mb-4">
            <div className="bg-yellow-100 px-4 py-2 rounded-lg">
              <span className="font-bold text-yellow-800">Score: {score}</span>
            </div>
            <div className="bg-green-100 px-4 py-2 rounded-lg">
              <span className="font-bold text-green-800">Reeks: {streak}</span>
            </div>
          </div>
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
        </div>

        {toonAccentHulp && <AccentHulp onClose={() => setToonAccentHulp(false)} />}
      </div>
    </div>
  );
});

Hoofdmenu.displayName = 'Hoofdmenu';

export default Hoofdmenu;
