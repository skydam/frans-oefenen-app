import React, { useState } from 'react';
import { ScoreProvider } from './context/ScoreContext.jsx';
import { ChapterProvider } from './context/ChapterContext.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import Hoofdmenu from './components/Hoofdmenu.jsx';
import GetallenModule from './modules/GetallenModule.jsx';
import DagenModule from './modules/DagenModule.jsx';
import VocabulaireModule from './modules/VocabulaireModule.jsx';
import GrammaticaModule from './modules/GrammaticaModule.jsx';
import TestModule from './modules/TestModule.jsx';
import TestPracticeModule from './modules/TestPracticeModule.jsx';
import { getTestConfig } from './data/testConfigs/index.js';

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

  // Parse module and test ID from huidigeModule
  const isTestMode = huidigeModule.startsWith('test:');
  const testId = isTestMode ? huidigeModule.substring(5) : null;

  // Determine if it's a practice test (multiple choice) or regular test (typing)
  const testConfig = testId ? getTestConfig(testId) : null;
  const isPracticeTest = testConfig?.isMultipleChoice || false;

  return (
    <ErrorBoundary>
      <ChapterProvider>
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
            {isTestMode && testId && !isPracticeTest && (
              <TestModule onTerug={handleTerug} testId={testId} />
            )}
            {isTestMode && testId && isPracticeTest && (
              <TestPracticeModule onTerug={handleTerug} testId={testId} />
            )}
          </div>
        </ScoreProvider>
      </ChapterProvider>
    </ErrorBoundary>
  );
};

export default App;
