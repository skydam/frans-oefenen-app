import React, { useState } from 'react';
import { ScoreProvider } from './context/ScoreContext.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import Hoofdmenu from './components/Hoofdmenu.jsx';
import GetallenModule from './modules/GetallenModule.jsx';
import DagenModule from './modules/DagenModule.jsx';
import VocabulaireModule from './modules/VocabulaireModule.jsx';
import GrammaticaModule from './modules/GrammaticaModule.jsx';
import TestModule from './modules/TestModule.jsx';

/**
 * Main application component
 * Handles module routing and wraps the app with providers
 */
const App = () => {
  const [huidigeModule, setHuidigeModule] = useState('menu');

  const handleModuleSelect = (module) => {
    setHuidigeModule(module);
  };

  const handleTerug = () => {
    setHuidigeModule('menu');
  };

  return (
    <ErrorBoundary>
      <ScoreProvider>
        <div className="app">
          {huidigeModule === 'menu' && (
            <Hoofdmenu onModuleSelect={handleModuleSelect} />
          )}
          {huidigeModule === 'getallen' && (
            <GetallenModule onTerug={handleTerug} />
          )}
          {huidigeModule === 'dagen' && (
            <DagenModule onTerug={handleTerug} />
          )}
          {huidigeModule === 'vocabulaire' && (
            <VocabulaireModule onTerug={handleTerug} />
          )}
          {huidigeModule === 'grammatica' && (
            <GrammaticaModule onTerug={handleTerug} />
          )}
          {huidigeModule === 'test' && (
            <TestModule onTerug={handleTerug} />
          )}
        </div>
      </ScoreProvider>
    </ErrorBoundary>
  );
};

export default App;
