# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A React-based French learning application for students using "Grandes Lignes" Chapters 0 & 1. Built with Vite, deployed on Railway. Features interactive practice modules, spaced repetition, and multiple-choice practice tests.

**Live URL**: Check Railway deployment dashboard for current URL

## Tech Stack

- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Deployment**: Railway (static site)
- **State**: React Context API + hooks

## Architecture

### Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── AccentKnoppen.jsx
│   ├── CompletionScreen.jsx
│   ├── ErrorBoundary.jsx
│   ├── MatchingQuestion.jsx
│   ├── MultipleChoiceQuestion.jsx
│   └── SequencingQuestion.jsx
├── context/            # Global state management
│   ├── ChapterContext.jsx
│   └── ScoreContext.jsx
├── data/               # Learning content
│   └── chapters/
│       └── ch0-1/
│           ├── dagen.js
│           ├── getallen.js
│           ├── metadata.js
│           ├── vocabulaire.js
│           └── voorbeelden.js
│   └── testConfigs/
│       ├── index.js
│       ├── practice-test-ch0-1.js
│       └── test-ch0-1.js
├── hooks/              # Custom React hooks
│   └── useModuleState.js
├── modules/            # Main learning modules
│   ├── DagenModule.jsx
│   ├── GetallenModule.jsx
│   ├── GrammaticaModule.jsx
│   ├── TestModule.jsx
│   ├── TestPracticeModule.jsx
│   └── VocabulaireModule.jsx
├── utils/              # Helper functions
│   ├── multipleChoiceGenerators.js
│   ├── normalize.js
│   ├── shuffle.js
│   ├── testHelpers.js
│   └── validation.js
├── App.jsx             # Main app router
└── main.jsx            # Entry point
```

### Core Modules

1. **GetallenModule**: Numbers 0-20 practice (bidirectional)
2. **DagenModule**: Days of the week (bidirectional)
3. **VocabulaireModule**: Vocabulary practice with typing quiz and flashcards
4. **GrammaticaModule**: Article (lidwoorden) practice
5. **TestModule**: Typing-based comprehensive tests
6. **TestPracticeModule**: Multiple-choice practice tests

### Context Providers

**ChapterContext** (`src/context/ChapterContext.jsx`)
- Manages current chapter data
- Provides `currentChapterData` with getallen, dagen, vocabulaire, voorbeelden

**ScoreContext** (`src/context/ScoreContext.jsx`)
- Global score tracking
- Streak management
- Rolling accuracy calculation (last 20 answers)

### Custom Hooks

**useModuleState** (`src/hooks/useModuleState.js`)
- **Critical**: Implements spaced repetition logic
- Manages question shuffling, review queues, completion tracking
- **Important bug fix (lines 50-57)**: `getCurrentOriginalIndex()` correctly maps review queue indices to original shuffledItems indices
- Used by: GetallenModule, DagenModule, VocabulaireModule, GrammaticaModule

## Data Structure

### Chapter Data Format
```javascript
{
  getallen: [{ getal: 0, frans: "zéro", alternatieven: ["nul"] }],
  dagen: [{ frans: "lundi", nederlands: "maandag" }],
  vocabulaire: [{
    frans: "bonjour",
    nederlands: "hallo, goedendag",  // Comma/slash = multiple valid answers
    categorie: "groet"
  }],
  voorbeelden: [{
    woord: "chat",
    lidwoord: "le",
    meervoud: "les chats",
    geslacht: "m",
    klinker: false
  }]
}
```

### Test Configuration
```javascript
{
  id: 'practice-ch0-1',
  name: 'Toets Oefening Ch 0-1',
  isMultipleChoice: true,  // Determines which TestModule to use
  questionTypes: [
    { type: 'singular-to-plural', count: 3 },
    { type: 'days-of-week', count: 2 },
    // ... more types
  ]
}
```

## Key Features

### 1. Spaced Repetition (useModuleState.js)
- Initial phase: All questions once
- Review phase: Incorrect questions repeated 2x
- Uses `fouteVragen` Map to track repetitions needed
- **Critical**: Always use `getCurrentOriginalIndex()` when updating `fouteVragen` to avoid infinite loops

### 2. Multiple Answer Support (validation.js)
```javascript
// Accepts comma or slash-separated alternatives
"hallo, goedendag"  → accepts both "hallo" and "goedendag"
"doe/maak"          → accepts both "doe" and "maak"
```

### 3. Accent Normalization (normalize.js)
```javascript
normalizeString("café") === normalizeString("cafe") // true
```
Students can answer with or without accents.

### 4. Dynamic Question Generation (multipleChoiceGenerators.js)
- 9 question generators create unique tests each time
- Algorithmically generates plausible wrong answers
- Uses common student error patterns (e.g., Spanish "las" instead of French "les")

### 5. Two Test Types
- **Typing tests** (TestModule): Recall-based learning
- **Multiple-choice tests** (TestPracticeModule): Recognition-based, mimics Google Forms format

## Important Implementation Details

### Answer Validation Flow
1. User submits answer
2. `controleerAntwoord()` normalizes input
3. `checkAnswer()` splits comma/slash-separated alternatives
4. Updates `fouteVragen` Map using **original shuffledItems index**
5. Tracks rolling accuracy in ScoreContext

### Index Tracking (CRITICAL)
```javascript
// WRONG (old bug):
const currentQuestionIndex = isHerhaalFase ? herhaalIndex : huidigeIndex;

// CORRECT (fixed):
const currentQuestionIndex = getCurrentOriginalIndex();
```
Always use original index when updating Maps/Sets, not the review queue index.

### Module Color Coding
- Blue: GetallenModule (numbers)
- Purple: DagenModule (days)
- Green: VocabulaireModule (vocabulary)
- Indigo: GrammaticaModule (grammar)
- Gold: TestModule (typing tests)
- Orange/Red: TestPracticeModule (multiple-choice)

## Development Workflow

### Build & Deploy
```bash
npm run build    # Creates dist/ directory
npm run preview  # Test production build locally
git push         # Railway auto-deploys from main branch
```

### Adding New Questions
1. Edit data files in `src/data/chapters/ch0-1/`
2. For practice tests: Add/update generators in `multipleChoiceGenerators.js`
3. Update test config in `src/data/testConfigs/`

### Adding New Chapters
1. Create `src/data/chapters/ch{X}/` directory
2. Add metadata.js, getallen.js, dagen.js, vocabulaire.js, voorbeelden.js
3. Create test configs in `src/data/testConfigs/`
4. Update ChapterContext to include new chapter

## Common Patterns

### Module Template
All modules follow similar structure:
1. Import useModuleState or local state management
2. Handle answer checking with validation
3. Support Enter key for next question
4. Show CompletionScreen when finished
5. Include accent buttons for French input

### Question Generator Template
```javascript
export const generateXQuestion = (data) => {
  const item = pickOne(data);
  const correct = /* ... */;
  const wrongOptions = /* generate plausible errors */;

  return {
    type: 'multiple-choice',
    question: "...",
    options: shuffleArray([correct, ...pickRandom(wrongOptions, 2)]),
    correct: correct,
    points: 1
  };
};
```

## Known Issues & Fixes

### ✅ Fixed: Infinite Loop in Spaced Repetition
- **Issue**: Using `herhaalIndex` instead of original `shuffledItems` index
- **Fix**: `getCurrentOriginalIndex()` in useModuleState.js (lines 50-57)
- **Impact**: All modules (Getallen, Dagen, Vocabulaire, Grammatica)

### ✅ Fixed: Multiple Valid Answers Marked Wrong
- **Issue**: Comma-separated answers like "hallo, goedendag" only accepted first option
- **Fix**: validation.js splits by comma/slash (lines 16-23)

### ✅ Fixed: Matching Question UI Unclear
- **Issue**: Hidden hover buttons, no visual feedback
- **Fix**: Two-step click interaction with color-coded states (MatchingQuestion.jsx)

## Performance Considerations

- All state is client-side (localStorage for persistence would be future enhancement)
- Question shuffling happens once per session using useMemo
- Railway serves static files - no server-side processing
- Multiple concurrent users don't interfere (each gets own browser state)

## Learning Theory Applied

1. **Spaced Repetition**: Incorrect answers repeated 2x before marked as mastered
2. **Active Recall**: Typing-based practice (harder than recognition)
3. **Recognition Practice**: Multiple-choice tests mimic real exam format
4. **Immediate Feedback**: Green/red feedback with correct answers shown
5. **Variety**: Questions randomized each session to prevent memorization of order
6. **Progressive Difficulty**: Can switch between FR→NL (easier) and NL→FR (harder)

## Deployment

- **Platform**: Railway
- **Auto-deploy**: Pushes to `main` branch trigger deployment
- **Build command**: `npm run build`
- **Static files**: Served from `dist/` directory
- **No backend**: Pure client-side React application
