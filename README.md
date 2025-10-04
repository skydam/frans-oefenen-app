# 🇫🇷 Frans Oefenen - Interactive French Learning App

An interactive web application for practicing French vocabulary and grammar from **Grandes Lignes Chapitre 0 & 1**.

## ✨ Features

### 📚 Learning Modules
- **Getallen (Numbers)**: Practice numbers 0-20 in French
- **Dagen (Days)**: Learn the days of the week
- **Vocabulaire (Vocabulary)**: 60+ words from Chapters 0 & 1
- **Grammatica (Grammar)**: Practice French articles (le/la/l'/les/un/une)

### 🎯 Learning Tools
- ✅ **Bidirectional Practice**: French → Dutch and Dutch → French
- ✅ **Typing Practice**: Prepare for tests by typing answers
- ✅ **Accent Helper**: Built-in guide for typing French accents
- ✅ **Accent Buttons**: Click to insert special characters
- ✅ **Smart Validation**: Accepts answers with or without accents
- ✅ **Score Tracking**: Track your progress with points and streaks
- ✅ **Persistent Progress**: Score saved to browser localStorage
- ✅ **Flashcard Mode**: Alternative study method for vocabulary
- ✅ **Theory Mode**: Learn grammar rules before practicing

## 🚀 Quick Start

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd frans-oefenen-app

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to use the app.

### Building for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview

# Or start production server
npm start
```

## 📖 Usage

1. **Select a Module**: Choose from Numbers, Days, Vocabulary, or Grammar
2. **Choose Direction**: Practice French → Dutch or Dutch → French
3. **Type Your Answer**: Use keyboard or click accent buttons
4. **Get Feedback**: See if your answer is correct
5. **Build Your Streak**: Keep answering correctly to increase your streak!

### Typing French Accents

#### Quick Method (Recommended)
Click the accent buttons above the input field: **à é è ê ç ù û î ô**

#### Keyboard Shortcuts

**Mac:**
- é = Option + e, then e
- è = Option + \`, then e
- ê = Option + i, then e
- ç = Option + c

**Windows:**
- é = Alt + 130 (on numpad)
- è = Alt + 138
- ê = Alt + 136
- ç = Alt + 135

## 🏗️ Technical Architecture

### Tech Stack
- **Frontend**: React 18 with hooks
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS 3
- **Icons**: Lucide React
- **Server**: Express (production)
- **State Management**: React Context API
- **Routing**: Client-side module switching

### Project Structure

```
src/
├── components/       # Reusable UI components
├── modules/          # Learning modules
├── data/             # Educational content
├── context/          # React context (score management)
├── hooks/            # Custom React hooks
├── utils/            # Utility functions
├── App.jsx           # Main application
└── main.jsx          # React entry point
```

### Key Features

#### Performance Optimizations
- ✅ Code splitting (vendor bundle separate)
- ✅ React.memo for component optimization
- ✅ useCallback for memoized functions
- ✅ Lazy loading support ready

#### Error Handling
- ✅ Error boundary component
- ✅ Graceful error messages
- ✅ User-friendly fallback UI

#### Best Practices
- ✅ ES6 modules throughout
- ✅ Functional components with hooks
- ✅ Proper React patterns (useRef, not useState for DOM)
- ✅ Functional state updates (no stale closures)
- ✅ Context API (no prop drilling)

## 🎨 UI/UX

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Color-Coded Modules**: Each module has its own color scheme
- **Visual Feedback**: Green for correct, red for incorrect
- **Progress Indicators**: See which question you're on
- **Intuitive Navigation**: Easy to switch between modules

## 🔧 Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
npm start         # Start production server
```

## 📊 Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

This is an educational project. Feel free to:
- Add more vocabulary
- Add more chapters
- Improve the UI/UX
- Add new features
- Fix bugs

## 📝 License

Educational use. Free to use and modify.

## 🙏 Acknowledgments

- **Grandes Lignes**: French textbook series
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide**: Beautiful icon library
- **Vite**: Fast build tool

## 📧 Support

For issues or questions, please open an issue on GitHub.

---

**Happy learning! Bonne chance! 🇫🇷**
