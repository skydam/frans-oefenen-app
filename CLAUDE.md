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

## Learning Theory & Pedagogical Design

This app implements evidence-based learning science principles to maximize retention and effectiveness.

### 1. Spaced Repetition (Ebbinghaus, 1885)
**Theory**: Information reviewed at increasing intervals is better retained than massed practice.

**Implementation**:
- `useModuleState.js` implements spaced repetition with `fouteVragen` Map
- Incorrect answers move to review queue and must be answered correctly 2x
- Review questions are shuffled to prevent position-based memorization
- Moves information from short-term to long-term memory through timed retrieval

**Code**: Lines 102-125 in `useModuleState.js`

### 2. Active Recall vs. Recognition (Karpicke & Roediger, 2008)
**Theory**: Retrieving information from memory (recall) is more effective than recognizing it (multiple choice), but both have their place.

**Implementation**:
- **TestModule** (typing): Active recall - hardest, best for retention
- **Quiz modes** (typing with categories): Active recall with scaffolding
- **TestPracticeModule** (multiple choice): Recognition - easier, good for exam prep
- **Flashcard mode**: Self-paced recognition - lowest pressure

**Evidence**: Students who practice with active recall show 50% better retention than those who only reread material.

### 3. Immediate Feedback (Behaviorism - Skinner, 1958)
**Theory**: Immediate feedback prevents incorrect information from being consolidated into memory.

**Implementation**:
- Green/red visual feedback appears instantly after each answer
- Correct answer displayed when wrong (corrective feedback)
- Prevents "learning errors" - when students practice mistakes
- Positive reinforcement (green, streak counter) encourages continued practice

**Code**: All modules show feedback immediately in `controleerAntwoord()`

### 4. Desirable Difficulties (Bjork & Bjork, 1992)
**Theory**: Making learning harder (to a point) improves long-term retention, even if it feels less effective.

**Implementation**:
- **Question shuffling**: `shuffleArray()` randomizes order each session (lines 26 in `useModuleState.js`)
- **Bidirectional practice**: FR→NL vs NL→FR prevents one-way associations
- **Review phase mixing**: Incorrect answers are interleaved, forcing retrieval in varied contexts
- **No hints removed**: Removed category hints from vocabulary (commit 199b2f5)

**Why it works**: Difficulty during practice = strength during testing

### 5. Interleaving (Rohrer & Taylor, 2007)
**Theory**: Mixing different types of problems (ABCABC) is more effective than blocking (AAABBBCCC).

**Implementation**:
- Multiple-choice tests mix 9 question types: articles, plurals, numbers, vocabulary, days, dialogues
- `shuffleArray()` in `generatePracticeTest()` ensures types are interleaved
- Prevents students from using context clues ("this section is all plural questions")

**Code**: `multipleChoiceGenerators.js` line 459 - final shuffle

### 6. Progressive Difficulty (Zone of Proximal Development - Vygotsky, 1978)
**Theory**: Learning is most effective when tasks are slightly beyond current ability (not too easy, not too hard).

**Implementation**:
- **Flashcards** (easiest): See both sides, self-paced
- **FR→NL typing** (medium): Recognition + typing
- **NL→FR typing** (harder): Production from memory
- **Timed tests** (hardest): Pressure + active recall

Students can self-select difficulty by choosing module and direction.

### 7. Errorless Learning vs. Error-Based Learning (Metcalfe, 2017)
**Theory**: For language learning, making and correcting errors is more effective than avoiding errors entirely.

**Implementation**:
- Students must attempt answers (not just "reveal")
- Errors trigger spaced repetition (2x review)
- Incorrect answer is shown alongside correct answer (contrastive feedback)
- Accept spelling variations (accents optional) to reduce frustration without sacrificing learning

**Balance**: Strict enough to require real effort, forgiving enough to maintain motivation

### 8. Testing Effect / Retrieval Practice (Roediger & Karpicke, 2006)
**Theory**: Testing is not just assessment - it's a powerful learning tool. Retrieving information strengthens memory more than re-studying.

**Implementation**:
- Every interaction is a retrieval opportunity (no passive reading)
- Tests are practice tools, not just assessments
- Question generators ensure novel combinations each time
- Prevents "recognition of question + answer pair" - must retrieve the concept

**Research**: Students who took practice tests outperformed those who re-studied by 50% on final exams.

### 9. Dual Coding Theory (Paivio, 1971)
**Theory**: Information encoded both verbally and visually is better remembered.

**Future Enhancement**: Could add images to vocabulary words, visual mnemonics for articles (le=🔵 blue, la=🔴 red)

### 10. Cognitive Load Theory (Sweller, 1988)
**Theory**: Working memory is limited; reduce extraneous load to maximize learning.

**Implementation**:
- Clean, minimal UI (no distracting elements)
- One question at a time (not overwhelming lists)
- Accent buttons reduce "how do I type é?" cognitive load
- Color coding by module type (visual organization)
- Progress indicator (`Vraag 3 van 7`) reduces anxiety

**Anti-patterns avoided**:
- ❌ No timer pressure on practice (only on tests)
- ❌ No leaderboards (social comparison increases anxiety)
- ❌ No lengthy explanations during practice (learn by doing)

## Research-Backed Design Decisions

### Why No "Skip" Button?
Forced retrieval attempts (even if wrong) strengthen memory more than passive exposure.

### Why Shuffle Questions?
Predictable order lets students use position as a cue instead of learning the content.

### Why Show Correct Answer When Wrong?
Immediate corrective feedback prevents error consolidation. Students learn from mistakes.

### Why 2x Repetition for Errors?
Research shows 2-3 repetitions in spaced intervals is optimal for most learners. More can lead to diminishing returns.

### Why Both Typing and Multiple Choice?
- **Typing** (production): Better for long-term retention
- **Multiple choice** (recognition): Better for exam preparation and reducing anxiety

Both have pedagogical value for different goals.

### Why Remove Category Hints?
Hints reduce retrieval effort, which feels easier but weakens learning. "Desirable difficulty" principle.

## References

- Bjork, R. A., & Bjork, E. L. (1992). A new theory of disuse and an old theory of stimulus fluctuation.
- Ebbinghaus, H. (1885). Memory: A contribution to experimental psychology.
- Karpicke, J. D., & Roediger, H. L. (2008). The critical importance of retrieval for learning. Science.
- Metcalfe, J. (2017). Learning from errors. Annual Review of Psychology.
- Roediger, H. L., & Karpicke, J. D. (2006). The power of testing memory. Perspectives on Psychological Science.
- Rohrer, D., & Taylor, K. (2007). The shuffling of mathematics problems improves learning. Instructional Science.
- Sweller, J. (1988). Cognitive load during problem solving. Cognitive Science.

## Future Enhancements Based on Learning Science

1. **Adaptive Difficulty**: Adjust question difficulty based on performance (like Duolingo)
2. **Long-term Retention Testing**: Schedule review sessions days/weeks after initial learning
3. **Visual Mnemonics**: Add images to vocabulary words (dual coding)
4. **Elaborative Interrogation**: "Why?" questions for grammar rules
5. **Self-Explanation Prompts**: Ask students to explain why an answer is correct
6. **Progress Tracking**: Show learning curves over time (motivating feedback)

## Deployment

- **Platform**: Railway
- **Auto-deploy**: Pushes to `main` branch trigger deployment
- **Build command**: `npm run build`
- **Static files**: Served from `dist/` directory
- **No backend**: Pure client-side React application
