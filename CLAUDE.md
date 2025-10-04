# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React-based French learning application for practicing vocabulary from "Grandes Lignes" Chapters 0 & 1. The app is contained in a single JSX file and provides interactive exercises for learning French.

## Architecture

### Single-File React Application
- **Main file**: `frans-oefenen.jsx` - Contains the entire application as a React component
- **No build system**: This is a standalone JSX file designed to be used directly in a React environment
- **Module structure**: Uses component-based architecture with multiple sub-modules for different exercise types

### Core Modules
The app has 4 main learning modules, each implemented as a separate component:
1. **GetallenModule** (lines 332-477): Numbers 0-20 practice
2. **DagenModule** (lines 479-623): Days of the week practice
3. **VocabulaireModule** (lines 625-823): Vocabulary from Chapters 0 & 1
4. **GrammaticaModule** (lines 825-1016): Article (lidwoorden) grammar practice

### Shared Components
- **AccentHulp** (lines 134-227): Modal with instructions for typing French accents
- **AccentKnoppen** (lines 230-250): Clickable buttons to insert French accented characters
- **Hoofdmenu** (lines 252-317): Main menu with module selection cards

## Data Structure

All learning content is stored as JavaScript arrays in the component state:
- `getallen` (lines 11-33): Numbers 0-20 with French translations
- `dagen` (lines 36-44): Days of the week in French and Dutch
- `vocabulaire` (lines 47-114): 66 vocabulary words with categories
- `lidwoorden` (lines 117-120): Article rules (not actively used in exercises)
- `voorbeelden` (lines 122-131): Example words for article practice

## Key Features

### Bidirectional Practice
All modules support two directions via `richting` state:
- `'frans-nl'`: French → Dutch
- `'nl-frans'`: Dutch → French

### Accent Normalization
The app accepts answers with or without French accents using normalization:
```javascript
const normalize = (str) => str.toLowerCase().trim()
  .normalize('NFD').replace(/[\u0300-\u036f]/g, '');
```

### Input Enhancement
- Accent helper buttons (`AccentKnoppen`) insert special characters at cursor position
- Input refs track cursor position for proper character insertion
- Comprehensive keyboard shortcut guide for Windows and Mac

### Score Tracking
- `score`: Total points earned (10 points per correct answer)
- `streak`: Current consecutive correct answers

### Exercise Modes
- **VocabulaireModule** offers two modes: typing quiz and flashcards
- **GrammaticaModule** has theory and practice modes

## Assets

The `photos/` directory contains 4 JPEG images (likely reference materials for learning).

## Development Notes

### No Package Management
- No `package.json` present
- No build scripts or test commands
- This appears to be a component meant to be imported into an existing React project

### State Management
- Uses React hooks (`useState`) exclusively
- No external state management (Redux, Context, etc.)
- Each module maintains its own local state

### Styling
- Uses Tailwind CSS classes throughout
- Gradient backgrounds for visual appeal
- Responsive design with max-width containers

### Input Handling
- Enter key triggers answer checking in all modules
- Disabled state prevents multiple submissions
- Auto-focus on input fields for better UX
