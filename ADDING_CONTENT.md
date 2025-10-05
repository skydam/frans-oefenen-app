# Adding New Content from Book Scans

This guide explains how to convert scanned textbook pages into practice exercises for the Frans Oefenen app.

## Overview

When you have scans from a French textbook (like Grandes Lignes), you'll need to extract the vocabulary, grammar examples, and other content and format them as JavaScript data files.

## Step-by-Step Process

### 1. Organize Your Scans

First, organize your book scans by chapter:
- `scans/chapter-2/page-24.jpg`
- `scans/chapter-2/page-25.jpg`
- etc.

### 2. Extract Content from Scans

You can use Claude (or another AI) to help extract content from scans. Upload the scan images and ask:

**Example prompt:**
```
Please extract all French vocabulary from this scan. For each word/phrase, provide:
- The French term
- The Dutch translation
- A category (e.g., "familie", "eten", "school", "acties")

Format as a JavaScript array.
```

### 3. Create Chapter Folder

Create a new folder for your chapter:
```bash
mkdir -p src/data/chapters/ch2-3
```

### 4. Create Data Files

Create the following files in your new chapter folder:

#### A. `metadata.js`

Basic information about the chapter:

```javascript
export const chapterMetadata = {
  id: 'ch2-3',
  name: 'Chapitre 2 & 3',
  description: 'Familie, eten en drinken',
  book: 'Grandes Lignes',
  level: 'Beginner',
  topics: ['Familie', 'Eten en drinken', 'Bezittelijk voornaamwoorden']
};
```

#### B. `vocabulaire.js`

All vocabulary words from the chapter:

```javascript
export const vocabulaire = [
  // Format: { frans: "French word", nederlands: "Dutch translation", categorie: "category" }

  { frans: "le père", nederlands: "de vader", categorie: "familie" },
  { frans: "la mère", nederlands: "de moeder", categorie: "familie" },
  { frans: "le pain", nederlands: "het brood", categorie: "eten" },
  { frans: "l'eau", nederlands: "het water", categorie: "drinken" },

  // For longer phrases or sentences:
  { frans: "Qu'est-ce que tu manges?", nederlands: "Wat eet jij?", categorie: "vragen" },
  { frans: "Je mange du pain.", nederlands: "Ik eet brood.", categorie: "antwoorden" },
];
```

**Tips for vocabulaire.js:**
- Use consistent categories throughout (helps students mentally organize)
- Include both individual words and common phrases
- For phrases with multiple translations, pick the most common one
- Use double quotes for strings containing apostrophes

#### C. `getallen.js` (if the chapter has numbers)

```javascript
export const getallen = [
  { getal: 21, frans: "vingt-et-un" },
  { getal: 22, frans: "vingt-deux" },
  { getal: 30, frans: "trente" },
  // Add alternatieven only if there are valid alternatives:
  { getal: 70, frans: "soixante-dix", alternatieven: ["septante"] }, // Belgian French
];
```

**Usually:** Only include if the chapter specifically teaches new numbers. Most chapters won't need this.

#### D. `dagen.js` (if the chapter has days/months/dates)

```javascript
export const dagen = [
  // For months:
  { frans: "janvier", nederlands: "januari" },
  { frans: "février", nederlands: "februari" },

  // For seasons:
  { frans: "le printemps", nederlands: "de lente" },
  { frans: "l'été", nederlands: "de zomer" },
];
```

**Usually:** Only needed if chapter teaches time-related vocabulary.

#### E. `voorbeelden.js` (grammar examples)

For grammar practice (articles, verb conjugations, etc.):

```javascript
export const voorbeelden = [
  // For articles (lidwoorden):
  { woord: "père", lidwoord: "le", geslacht: "mannelijk" },
  { woord: "mère", lidwoord: "la", geslacht: "vrouwelijk" },
  { woord: "eau", lidwoord: "l'", geslacht: "vrouwelijk" },
  { woord: "parents", lidwoord: "les", geslacht: "meervoud" },

  // Or for verb conjugations (if you extend the app):
  // { infinitief: "manger", vorm: "je mange", persoon: "je" },
];
```

**Tips:**
- Focus on words that demonstrate grammar rules
- Include edge cases (like l' for vowels)
- Ensure `geslacht` is one of: "mannelijk", "vrouwelijk", "meervoud"

### 5. Register the Chapter

Edit `src/data/chapters/index.js` and add your new chapter:

```javascript
// Add import at top:
import { chapterMetadata as ch23Metadata } from './ch2-3/metadata.js';
import { getallen as ch23Getallen } from './ch2-3/getallen.js';
import { dagen as ch23Dagen } from './ch2-3/dagen.js';
import { vocabulaire as ch23Vocabulaire } from './ch2-3/vocabulaire.js';
import { voorbeelden as ch23Voorbeelden } from './ch2-3/voorbeelden.js';

// Add to chapters object:
export const chapters = {
  'ch0-1': { /* existing */ },

  'ch2-3': {
    metadata: ch23Metadata,
    data: {
      getallen: ch23Getallen,
      dagen: ch23Dagen,
      vocabulaire: ch23Vocabulaire,
      voorbeelden: ch23Voorbeelden
    }
  }
};
```

### 6. (Optional) Create a Test Configuration

Create `src/data/testConfigs/test-ch2-3.js`:

```javascript
export const testConfig = {
  id: 'test-ch2-3',
  name: 'Toets Hoofdstuk 2-3',
  description: 'Gemengde vragen uit hoofdstuk 2 & 3',
  chapterId: 'ch2-3',
  icon: 'ClipboardCheck',
  color: 'from-blue-400 to-cyan-500',

  vragen: {
    getallen: 0,        // 0 if chapter doesn't have numbers
    dagen: 0,           // 0 if chapter doesn't have days/months
    vocabulaire: 18,    // Adjust based on difficulty
    grammatica: 7       // Adjust based on difficulty
  },

  totaal: 25,
  slaagPercentage: 70,  // Lower for harder chapters
  tijdLimiet: null
};
```

Then add to `src/data/testConfigs/index.js`:

```javascript
import { testConfig as testCh23 } from './test-ch2-3.js';

export const availableTests = [
  testCh01,
  testCh23,  // Add here
];
```

### 7. Test Your Changes

```bash
npm run dev
```

- Check that the chapter selector appears and you can switch chapters
- Try each practice module with the new content
- Take the test to verify question distribution
- Check that accents and special characters display correctly

### 8. Commit Your Changes

```bash
git add .
git commit -m "Add chapter 2-3 content"
git push
```

## Tips for Extracting Content from Scans

### Using Claude to Extract Content

1. **Upload the scan** to Claude and use this prompt:

```
I have a scan from a French textbook. Please extract all vocabulary in this format:

{ frans: "French word/phrase", nederlands: "Dutch translation", categorie: "category" }

Group by logical categories like "familie", "eten", "school", "acties", "vragen", "antwoorden".
Format as a JavaScript array ready to copy-paste into vocabulaire.js.
```

2. **For grammar examples**, use this prompt:

```
Extract all nouns with their articles from this scan. Format as:

{ woord: "word", lidwoord: "le/la/l'/les", geslacht: "mannelijk/vrouwelijk/meervoud" }

Include only the noun without the article in "woord".
```

3. **Review and verify** the extracted content:
   - Check for OCR errors (common with accents: é, è, ê, à, ç)
   - Verify translations are accurate
   - Ensure categories are consistent
   - Check that gender assignments are correct

### Common Pitfalls

❌ **Wrong:**
```javascript
{ frans: "le père", nederlands: "de vader", categorie: "familie" }  // Don't include article in vocabulary
```

✅ **Correct:**
```javascript
{ frans: "père", nederlands: "vader", categorie: "familie" }  // Just the word
```

---

❌ **Wrong:**
```javascript
{ woord: "le père", lidwoord: "le", geslacht: "mannelijk" }  // Don't include article in woord
```

✅ **Correct:**
```javascript
{ woord: "père", lidwoord: "le", geslacht: "mannelijk" }  // Just the noun
```

---

❌ **Wrong:**
```javascript
{ frans: "frère", nederlands: "broer/zus", categorie: "familie" }  // Multiple translations
```

✅ **Correct:**
```javascript
{ frans: "frère", nederlands: "broer", categorie: "familie" },
{ frans: "sœur", nederlands: "zus", categorie: "familie" }
```

### Categories to Use

Choose consistent, logical categories. Common examples:

**Vocabulary categories:**
- `"personen"` - people, professions
- `"familie"` - family members
- `"school"` - school-related
- `"eten"` - food
- `"drinken"` - drinks
- `"kleding"` - clothing
- `"kleuren"` - colors
- `"lichaam"` - body parts
- `"huis"` - house/home
- `"taal"` - language
- `"tijd"` - time-related
- `"acties"` - verbs/actions
- `"eigenschappen"` - adjectives
- `"vragen"` - questions
- `"antwoorden"` - responses
- `"groet"` - greetings

**Grammar categories:**
- Use `geslacht`: `"mannelijk"`, `"vrouwelijk"`, `"meervoud"`

## Minimal Example

If you're in a hurry, the **absolute minimum** you need is:

1. **Create folder:** `src/data/chapters/ch2-3/`

2. **Create metadata.js:**
```javascript
export const chapterMetadata = {
  id: 'ch2-3',
  name: 'Chapitre 2 & 3',
  description: 'Familie en eten',
  book: 'Grandes Lignes',
  topics: []
};
```

3. **Create vocabulaire.js with at least a few words:**
```javascript
export const vocabulaire = [
  { frans: "père", nederlands: "vader", categorie: "familie" },
  { frans: "mère", nederlands: "moeder", categorie: "familie" },
];
```

4. **Create empty files for the rest:**
```javascript
// getallen.js
export const getallen = [];

// dagen.js
export const dagen = [];

// voorbeelden.js
export const voorbeelden = [];
```

5. **Register in `chapters/index.js`**

The chapter will work! You can add more content later.

## Questions?

If you run into issues:
1. Check the console for errors (F12 in browser)
2. Verify your JavaScript syntax (missing commas, quotes, brackets)
3. Ensure all files are exported correctly
4. Check that imports in `index.js` match your filenames

The app will gracefully handle empty arrays, so you can add content incrementally!
