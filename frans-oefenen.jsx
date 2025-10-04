import React, { useState } from 'react';
import { BookOpen, Calendar, Hash, MessageSquare, Trophy, ArrowLeft, Check, X, Shuffle, HelpCircle, Keyboard } from 'lucide-react';

const FransOefenApp = () => {
  const [huidigeModule, setHuidigeModule] = useState('menu');
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [toonAccentHulp, setToonAccentHulp] = useState(false);

  // Getallen 0-20
  const getallen = [
    { getal: 0, frans: "zéro" },
    { getal: 1, frans: "un" },
    { getal: 2, frans: "deux" },
    { getal: 3, frans: "trois" },
    { getal: 4, frans: "quatre" },
    { getal: 5, frans: "cinq" },
    { getal: 6, frans: "six" },
    { getal: 7, frans: "sept" },
    { getal: 8, frans: "huit" },
    { getal: 9, frans: "neuf" },
    { getal: 10, frans: "dix" },
    { getal: 11, frans: "onze" },
    { getal: 12, frans: "douze" },
    { getal: 13, frans: "treize" },
    { getal: 14, frans: "quatorze" },
    { getal: 15, frans: "quinze" },
    { getal: 16, frans: "seize" },
    { getal: 17, frans: "dix-sept" },
    { getal: 18, frans: "dix-huit" },
    { getal: 19, frans: "dix-neuf" },
    { getal: 20, frans: "vingt" }
  ];

  // Dagen van de week
  const dagen = [
    { frans: "lundi", nederlands: "maandag" },
    { frans: "mardi", nederlands: "dinsdag" },
    { frans: "mercredi", nederlands: "woensdag" },
    { frans: "jeudi", nederlands: "donderdag" },
    { frans: "vendredi", nederlands: "vrijdag" },
    { frans: "samedi", nederlands: "zaterdag" },
    { frans: "dimanche", nederlands: "zondag" }
  ];

  // Vocabulaire Chapitre 0 & 1
  const vocabulaire = [
    // Chapitre 0
    { frans: "aujourd'hui", nederlands: "vandaag", categorie: "tijd" },
    { frans: "les devoirs", nederlands: "het huiswerk", categorie: "school" },
    { frans: "le garçon", nederlands: "de jongen", categorie: "personen" },
    { frans: "la fille", nederlands: "het meisje", categorie: "personen" },
    { frans: "la page", nederlands: "de bladzijde", categorie: "school" },
    { frans: "le mot", nederlands: "het woord", categorie: "school" },
    { frans: "apprends", nederlands: "leer", categorie: "acties" },
    { frans: "fais", nederlands: "doe/maak", categorie: "acties" },
    { frans: "travaille", nederlands: "werk", categorie: "acties" },
    { frans: "complète", nederlands: "vul in/aan", categorie: "acties" },
    
    // Chapitre 1 - Basis zinnen
    { frans: "je suis", nederlands: "ik ben", categorie: "zijn" },
    { frans: "tu parles", nederlands: "jij spreekt", categorie: "spreken" },
    { frans: "français", nederlands: "Frans", categorie: "taal" },
    { frans: "salut", nederlands: "hoi", categorie: "groet" },
    { frans: "bonjour", nederlands: "hallo, goedendag", categorie: "groet" },
    
    // Vragen
    { frans: "Comment tu t'appelles?", nederlands: "Hoe heet jij?", categorie: "vragen" },
    { frans: "Je m'appelle Roos.", nederlands: "Ik heet Roos.", categorie: "antwoorden" },
    { frans: "Tu habites où?", nederlands: "Waar woon jij?", categorie: "vragen" },
    { frans: "J'habite à Zwolle.", nederlands: "Ik woon in Zwolle.", categorie: "antwoorden" },
    { frans: "On a des devoirs?", nederlands: "Hebben we huiswerk?", categorie: "vragen" },
    
    // Familie
    { frans: "la famille", nederlands: "de familie, het gezin", categorie: "familie" },
    { frans: "le frère", nederlands: "de broer", categorie: "familie" },
    { frans: "la sœur", nederlands: "de zus", categorie: "familie" },
    { frans: "le chien", nederlands: "de hond", categorie: "dieren" },
    { frans: "le chat", nederlands: "de kat", categorie: "dieren" },
    { frans: "le poisson", nederlands: "de vis", categorie: "dieren" },
    { frans: "le jour", nederlands: "de dag", categorie: "tijd" },
    { frans: "le copain", nederlands: "de vriend", categorie: "personen" },
    
    // Plaatsen en dingen
    { frans: "la France", nederlands: "Frankrijk", categorie: "landen" },
    { frans: "les vacances", nederlands: "de vakantie", categorie: "tijd" },
    { frans: "la piscine", nederlands: "het zwembad", categorie: "plaatsen" },
    { frans: "un peu", nederlands: "een beetje", categorie: "hoeveelheid" },
    { frans: "attention", nederlands: "pas op", categorie: "uitroepen" },
    { frans: "la tente", nederlands: "de tent", categorie: "dingen" },
    
    // Bijvoeglijke naamwoorden en bijwoorden
    { frans: "petit(e)", nederlands: "klein", categorie: "eigenschappen" },
    { frans: "grand(e)", nederlands: "groot", categorie: "eigenschappen" },
    { frans: "d'accord", nederlands: "oké", categorie: "akkoord" },
    { frans: "mais", nederlands: "maar", categorie: "verbindingswoorden" },
    { frans: "pour", nederlands: "voor", categorie: "voorzetsels" },
    { frans: "et", nederlands: "en", categorie: "verbindingswoorden" },
    { frans: "bien", nederlands: "goed", categorie: "eigenschappen" },
    { frans: "aussi", nederlands: "ook", categorie: "bijwoorden" },
    { frans: "ici", nederlands: "hier", categorie: "plaats" },
    { frans: "pourquoi", nederlands: "waarom", categorie: "vragen" },
    { frans: "donc", nederlands: "dus", categorie: "verbindingswoorden" },
    
    // Werkwoorden en uitdrukkingen
    { frans: "il y a", nederlands: "er is, er zijn", categorie: "er zijn" },
    { frans: "on reste", nederlands: "wij blijven", categorie: "blijven" },
    { frans: "c'est", nederlands: "het is", categorie: "zijn" },
    { frans: "bon appétit", nederlands: "eet smakelijk", categorie: "uitdrukkingen" },
    { frans: "et toi?", nederlands: "en jij?", categorie: "vragen" },
    { frans: "j'aime", nederlands: "ik vind (het) leuk", categorie: "vinden" },
    { frans: "on joue", nederlands: "wij spelen", categorie: "spelen" },
    { frans: "j'habite", nederlands: "ik woon", categorie: "wonen" }
  ];

  // Grammatica - Lidwoorden
  const lidwoorden = [
    { type: "bepaald", mannelijk: "le", vrouwelijk: "la", meervoud: "les", uitleg: "de/het" },
    { type: "onbepaald", mannelijk: "un", vrouwelijk: "une", meervoud: "des", uitleg: "een" }
  ];

  const voorbeelden = [
    { woord: "camping", lidwoord: "le", meervoud: "les campings", geslacht: "m" },
    { woord: "fille", lidwoord: "la", meervoud: "les filles", geslacht: "v" },
    { woord: "garçon", lidwoord: "le", meervoud: "les garçons", geslacht: "m" },
    { woord: "tente", lidwoord: "la", meervoud: "les tentes", geslacht: "v" },
    { woord: "ami", lidwoord: "l'", meervoud: "les amis", geslacht: "m", klinker: true },
    { woord: "hôtel", lidwoord: "l'", meervoud: "les hôtels", geslacht: "m", klinker: true },
    { woord: "frère", lidwoord: "un", type: "onbepaald", geslacht: "m" },
    { woord: "sœur", lidwoord: "une", type: "onbepaald", geslacht: "v" }
  ];

  // Accent Helper Component
  const AccentHulp = ({ onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">🇫🇷 Franse Accenten Typen</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="bg-blue-50 rounded-xl p-4">
            <h3 className="font-bold text-lg mb-3">💡 Belangrijk voor de toets!</h3>
            <p className="text-gray-700">
              Op de toets moet je Frans kunnen schrijven. Oefen dus vooral met <strong>typen</strong>! 
              De app accepteert antwoorden met én zonder accenten, maar leer wel de juiste spelling.
            </p>
          </div>

          <div className="bg-yellow-50 rounded-xl p-4">
            <h3 className="font-bold text-lg mb-3">⚡ Snelle Methode: Klik op accent knoppen</h3>
            <p className="text-gray-700 mb-2">
              Boven elk invulveld staan knoppen met de Franse letters. Klik erop om ze toe te voegen!
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-white px-3 py-1 rounded border-2 border-blue-300">à</span>
              <span className="bg-white px-3 py-1 rounded border-2 border-blue-300">é</span>
              <span className="bg-white px-3 py-1 rounded border-2 border-blue-300">è</span>
              <span className="bg-white px-3 py-1 rounded border-2 border-blue-300">ê</span>
              <span className="bg-white px-3 py-1 rounded border-2 border-blue-300">ç</span>
              <span className="bg-white px-3 py-1 rounded border-2 border-blue-300">ù</span>
              <span className="bg-white px-3 py-1 rounded border-2 border-blue-300">û</span>
              <span className="bg-white px-3 py-1 rounded border-2 border-blue-300">î</span>
              <span className="bg-white px-3 py-1 rounded border-2 border-blue-300">ô</span>
            </div>
          </div>

          <div className="bg-green-50 rounded-xl p-4">
            <h3 className="font-bold text-lg mb-3">⌨️ Windows Toetsenbord</h3>
            <div className="space-y-2 text-sm">
              <p><strong>Optie 1: Alt codes (houd Alt ingedrukt + type nummer op numpad)</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>é = Alt + 130</li>
                <li>è = Alt + 138</li>
                <li>ê = Alt + 136</li>
                <li>à = Alt + 133</li>
                <li>ù = Alt + 151</li>
                <li>ç = Alt + 135</li>
              </ul>
              <p className="mt-3"><strong>Optie 2: Internationaal toetsenbord instellen</strong></p>
              <p className="text-gray-600">Via Instellingen → Tijd en taal → Taal → Frans toetsenbord toevoegen</p>
            </div>
          </div>

          <div className="bg-purple-50 rounded-xl p-4">
            <h3 className="font-bold text-lg mb-3">⌨️ Mac Toetsenbord</h3>
            <div className="space-y-2 text-sm">
              <p><strong>Houd Option (⌥) ingedrukt + accent toets, dan de letter:</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>é = Option + e, dan e</li>
                <li>è = Option + `, dan e</li>
                <li>ê = Option + i, dan e</li>
                <li>à = Option + `, dan a</li>
                <li>ù = Option + `, dan u</li>
                <li>ç = Option + c</li>
                <li>û = Option + i, dan u</li>
                <li>î = Option + i, dan i</li>
                <li>ô = Option + i, dan o</li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="font-bold text-lg mb-3">📝 Veel gebruikte Franse accenten</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div><strong>é</strong> - accent aigu (français, café)</div>
              <div><strong>è</strong> - accent grave (frère, mère)</div>
              <div><strong>ê</strong> - accent circonflexe (être,ête)</div>
              <div><strong>à</strong> - accent grave (à, voilà)</div>
              <div><strong>ç</strong> - c cédille (français, garçon)</div>
              <div><strong>ù</strong> - accent grave (où)</div>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-6 bg-blue-500 text-white py-3 rounded-lg font-bold hover:bg-blue-600"
        >
          Sluiten
        </button>
      </div>
    </div>
  );

  // Accent Buttons Component
  const AccentKnoppen = ({ onInsert }) => {
    const accenten = ['à', 'â', 'é', 'è', 'ê', 'ë', 'ï', 'î', 'ô', 'ù', 'û', 'ü', 'ç', 'œ'];
    
    return (
      <div className="mb-3">
        <p className="text-xs text-gray-600 mb-2">Klik op een letter om toe te voegen:</p>
        <div className="flex flex-wrap gap-2">
          {accenten.map(accent => (
            <button
              key={accent}
              onClick={() => onInsert(accent)}
              className="bg-blue-100 hover:bg-blue-200 text-blue-800 font-bold px-3 py-1 rounded transition-colors"
              type="button"
            >
              {accent}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const Hoofdmenu = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-center mb-2 text-gray-800">
                🇫🇷 Frans Oefenen
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
              <span className="font-bold text-green-800">Reeks: {streak} 🔥</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ModuleKaart
            icon={<Hash className="w-8 h-8" />}
            titel="Getallen 0-20"
            beschrijving="Typ de getallen in het Frans"
            kleur="from-blue-400 to-blue-600"
            onClick={() => setHuidigeModule('getallen')}
          />
          <ModuleKaart
            icon={<Calendar className="w-8 h-8" />}
            titel="Dagen van de Week"
            beschrijving="Schrijf de dagen in het Frans"
            kleur="from-purple-400 to-purple-600"
            onClick={() => setHuidigeModule('dagen')}
          />
          <ModuleKaart
            icon={<MessageSquare className="w-8 h-8" />}
            titel="Vocabulaire"
            beschrijving="Type alle woorden uit Ch. 0 & 1"
            kleur="from-green-400 to-green-600"
            onClick={() => setHuidigeModule('vocabulaire')}
          />
          <ModuleKaart
            icon={<BookOpen className="w-8 h-8" />}
            titel="Grammatica: Lidwoorden"
            beschrijving="Schrijf le/la/l'/les en un/une"
            kleur="from-pink-400 to-pink-600"
            onClick={() => setHuidigeModule('grammatica')}
          />
        </div>
        
        {toonAccentHulp && <AccentHulp onClose={() => setToonAccentHulp(false)} />}
      </div>
    </div>
  );

  const ModuleKaart = ({ icon, titel, beschrijving, kleur, onClick }) => (
    <button
      onClick={onClick}
      className={`bg-gradient-to-br ${kleur} text-white rounded-xl p-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200`}
    >
      <div className="flex items-center gap-4 mb-2">
        {icon}
        <h2 className="text-2xl font-bold">{titel}</h2>
      </div>
      <p className="text-white/90">{beschrijving}</p>
    </button>
  );

  const GetallenModule = () => {
    const [huidigeIndex, setHuidigeIndex] = useState(0);
    const [richting, setRichting] = useState('frans-nl'); // 'frans-nl' of 'nl-frans'
    const [antwoord, setAntwoord] = useState('');
    const [feedback, setFeedback] = useState(null);
    const [inputRef, setInputRef] = useState(null);

    const huidig = getallen[huidigeIndex];

    const voegAccentToe = (accent) => {
      if (inputRef) {
        const start = inputRef.selectionStart;
        const end = inputRef.selectionEnd;
        const text = antwoord;
        const newText = text.substring(0, start) + accent + text.substring(end);
        setAntwoord(newText);
        setTimeout(() => {
          inputRef.focus();
          inputRef.setSelectionRange(start + 1, start + 1);
        }, 0);
      } else {
        setAntwoord(antwoord + accent);
      }
    };

    const controleerAntwoord = () => {
      let correct = false;
      
      if (richting === 'frans-nl') {
        correct = antwoord.toString().trim() === huidig.getal.toString();
      } else {
        // Normaliseer voor vergelijking (accepteer met en zonder accenten)
        const normalize = (str) => str.toLowerCase().trim()
          .normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        correct = normalize(antwoord) === normalize(huidig.frans);
      }
      
      setFeedback(correct);
      if (correct) {
        setScore(score + 10);
        setStreak(streak + 1);
      } else {
        setStreak(0);
      }
    };

    const volgend = () => {
      setHuidigeIndex((huidigeIndex + 1) % getallen.length);
      setAntwoord('');
      setFeedback(null);
    };

    const wissel = () => {
      setRichting(richting === 'frans-nl' ? 'nl-frans' : 'frans-nl');
      setAntwoord('');
      setFeedback(null);
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 to-indigo-500 p-8">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => setHuidigeModule('menu')}
            className="mb-4 flex items-center gap-2 text-white hover:text-gray-200"
          >
            <ArrowLeft /> Terug naar Menu
          </button>

          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
              Getallen 0-20
            </h2>

            <button
              onClick={wissel}
              className="w-full mb-6 bg-indigo-500 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-indigo-600"
            >
              <Shuffle className="w-4 h-4" />
              {richting === 'frans-nl' ? 'Frans → Nederlands' : 'Nederlands → Frans'}
            </button>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 mb-6">
              <p className="text-sm text-gray-600 mb-2 text-center">
                {richting === 'frans-nl' ? 'Wat is dit getal in het Nederlands?' : 'Wat is dit getal in het Frans?'}
              </p>
              <p className="text-5xl font-bold text-center text-gray-800 mb-6">
                {richting === 'frans-nl' ? huidig.frans : huidig.getal}
              </p>

              {richting === 'nl-frans' && <AccentKnoppen onInsert={voegAccentToe} />}

              <input
                ref={(el) => setInputRef(el)}
                type="text"
                value={antwoord}
                onChange={(e) => setAntwoord(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !feedback && controleerAntwoord()}
                placeholder="Type je antwoord..."
                className="w-full p-3 border-2 border-gray-300 rounded-lg mb-4 text-lg"
                disabled={feedback !== null}
                autoFocus
              />

              {feedback === null && (
                <button
                  onClick={() => controleerAntwoord()}
                  className="w-full bg-blue-500 text-white py-3 rounded-lg font-bold hover:bg-blue-600"
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
                      Het juiste antwoord is: <strong>{richting === 'frans-nl' ? huidig.getal : huidig.frans}</strong>
                    </p>
                  )}
                </div>
              )}

              {feedback !== null && (
                <button
                  onClick={volgend}
                  className="w-full bg-indigo-500 text-white py-3 rounded-lg font-bold hover:bg-indigo-600"
                >
                  Volgende
                </button>
              )}
            </div>

            <p className="text-center text-sm text-gray-600">
              Vraag {huidigeIndex + 1} van {getallen.length}
            </p>
          </div>
        </div>
      </div>
    );
  };

  const DagenModule = () => {
    const [huidigeIndex, setHuidigeIndex] = useState(0);
    const [richting, setRichting] = useState('frans-nl');
    const [antwoord, setAntwoord] = useState('');
    const [feedback, setFeedback] = useState(null);
    const [inputRef, setInputRef] = useState(null);

    const huidig = dagen[huidigeIndex];

    const voegAccentToe = (accent) => {
      if (inputRef) {
        const start = inputRef.selectionStart;
        const end = inputRef.selectionEnd;
        const text = antwoord;
        const newText = text.substring(0, start) + accent + text.substring(end);
        setAntwoord(newText);
        setTimeout(() => {
          inputRef.focus();
          inputRef.setSelectionRange(start + 1, start + 1);
        }, 0);
      } else {
        setAntwoord(antwoord + accent);
      }
    };

    const controleerAntwoord = () => {
      let correct = false;
      const normalize = (str) => str.toLowerCase().trim()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      
      if (richting === 'frans-nl') {
        correct = normalize(antwoord) === normalize(huidig.nederlands);
      } else {
        correct = normalize(antwoord) === normalize(huidig.frans);
      }
      
      setFeedback(correct);
      if (correct) {
        setScore(score + 10);
        setStreak(streak + 1);
      } else {
        setStreak(0);
      }
    };

    const volgend = () => {
      setHuidigeIndex((huidigeIndex + 1) % dagen.length);
      setAntwoord('');
      setFeedback(null);
    };

    const wissel = () => {
      setRichting(richting === 'frans-nl' ? 'nl-frans' : 'frans-nl');
      setAntwoord('');
      setFeedback(null);
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 to-purple-600 p-8">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => setHuidigeModule('menu')}
            className="mb-4 flex items-center gap-2 text-white hover:text-gray-200"
          >
            <ArrowLeft /> Terug naar Menu
          </button>

          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
              Dagen van de Week
            </h2>

            <button
              onClick={wissel}
              className="w-full mb-6 bg-purple-500 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-purple-600"
            >
              <Shuffle className="w-4 h-4" />
              {richting === 'frans-nl' ? 'Frans → Nederlands' : 'Nederlands → Frans'}
            </button>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-8 mb-6">
              <p className="text-sm text-gray-600 mb-2 text-center">
                Welke dag is dit?
              </p>
              <p className="text-5xl font-bold text-center text-gray-800 mb-6">
                {richting === 'frans-nl' ? huidig.frans : huidig.nederlands}
              </p>

              {richting === 'nl-frans' && <AccentKnoppen onInsert={voegAccentToe} />}

              <input
                ref={(el) => setInputRef(el)}
                type="text"
                value={antwoord}
                onChange={(e) => setAntwoord(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !feedback && controleerAntwoord()}
                placeholder="Type je antwoord..."
                className="w-full p-3 border-2 border-gray-300 rounded-lg mb-4 text-lg"
                disabled={feedback !== null}
                autoFocus
              />

              {feedback === null && (
                <button
                  onClick={() => controleerAntwoord()}
                  className="w-full bg-purple-500 text-white py-3 rounded-lg font-bold hover:bg-purple-600"
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
                      Het juiste antwoord is: <strong>{richting === 'frans-nl' ? huidig.nederlands : huidig.frans}</strong>
                    </p>
                  )}
                </div>
              )}

              {feedback !== null && (
                <button
                  onClick={volgend}
                  className="w-full bg-purple-500 text-white py-3 rounded-lg font-bold hover:bg-purple-600"
                >
                  Volgende
                </button>
              )}
            </div>

            <p className="text-center text-sm text-gray-600">
              Vraag {huidigeIndex + 1} van {dagen.length}
            </p>
          </div>
        </div>
      </div>
    );
  };

  const VocabulaireModule = () => {
    const [huidigeIndex, setHuidigeIndex] = useState(0);
    const [richting, setRichting] = useState('frans-nl');
    const [antwoord, setAntwoord] = useState('');
    const [feedback, setFeedback] = useState(null);
    const [flashcardOmgedraaid, setFlashcardOmgedraaid] = useState(false);
    const [oefenModus, setOefenModus] = useState('quiz'); // 'quiz' of 'flashcards'
    const [inputRef, setInputRef] = useState(null);

    const huidig = vocabulaire[huidigeIndex];

    const voegAccentToe = (accent) => {
      if (inputRef) {
        const start = inputRef.selectionStart;
        const end = inputRef.selectionEnd;
        const text = antwoord;
        const newText = text.substring(0, start) + accent + text.substring(end);
        setAntwoord(newText);
        setTimeout(() => {
          inputRef.focus();
          inputRef.setSelectionRange(start + 1, start + 1);
        }, 0);
      } else {
        setAntwoord(antwoord + accent);
      }
    };

    const controleerAntwoord = () => {
      let correct = false;
      const verwacht = richting === 'frans-nl' ? huidig.nederlands : huidig.frans;
      
      // Normaliseer voor vergelijking (accepteer met en zonder accenten)
      const normalize = (str) => str.toLowerCase().trim()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      
      // Accepteer beide antwoorden als er meerdere vertalingen zijn (gescheiden door komma)
      const mogelijkeAntwoorden = verwacht.split(',').map(a => normalize(a));
      const gegevenNorm = normalize(antwoord);
      
      correct = mogelijkeAntwoorden.some(mogelijk => gegevenNorm === mogelijk);
      
      setFeedback(correct);
      if (correct) {
        setScore(score + 10);
        setStreak(streak + 1);
      } else {
        setStreak(0);
      }
    };

    const volgend = () => {
      setHuidigeIndex((huidigeIndex + 1) % vocabulaire.length);
      setAntwoord('');
      setFeedback(null);
      setFlashcardOmgedraaid(false);
    };

    const wissel = () => {
      setRichting(richting === 'frans-nl' ? 'nl-frans' : 'frans-nl');
      setAntwoord('');
      setFeedback(null);
      setFlashcardOmgedraaid(false);
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-400 to-emerald-600 p-8">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => setHuidigeModule('menu')}
            className="mb-4 flex items-center gap-2 text-white hover:text-gray-200"
          >
            <ArrowLeft /> Terug naar Menu
          </button>

          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
              Vocabulaire Ch. 0 & 1
            </h2>

            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setOefenModus('quiz')}
                className={`flex-1 py-2 rounded-lg font-semibold ${oefenModus === 'quiz' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
              >
                Typen (aanbevolen)
              </button>
              <button
                onClick={() => setOefenModus('flashcards')}
                className={`flex-1 py-2 rounded-lg font-semibold ${oefenModus === 'flashcards' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
              >
                Flashcards
              </button>
            </div>

            <button
              onClick={wissel}
              className="w-full mb-6 bg-green-500 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-green-600"
            >
              <Shuffle className="w-4 h-4" />
              {richting === 'frans-nl' ? 'Frans → Nederlands' : 'Nederlands → Frans'}
            </button>

            {oefenModus === 'flashcards' ? (
              <div>
                <div
                  onClick={() => setFlashcardOmgedraaid(!flashcardOmgedraaid)}
                  className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-12 cursor-pointer hover:shadow-lg transition-all min-h-80 flex flex-col items-center justify-center mb-6"
                >
                  <p className="text-sm text-gray-600 mb-4">
                    {flashcardOmgedraaid ? '(klik om terug te draaien)' : '(klik om om te draaien)'}
                  </p>
                  <p className="text-4xl font-bold text-center text-gray-800 mb-2">
                    {flashcardOmgedraaid 
                      ? (richting === 'frans-nl' ? huidig.nederlands : huidig.frans)
                      : (richting === 'frans-nl' ? huidig.frans : huidig.nederlands)
                    }
                  </p>
                  <p className="text-sm text-gray-500 italic">
                    {huidig.categorie}
                  </p>
                </div>

                <button
                  onClick={volgend}
                  className="w-full bg-green-500 text-white py-3 rounded-lg font-bold hover:bg-green-600"
                >
                  Volgende
                </button>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-8 mb-6">
                <p className="text-sm text-gray-600 mb-2 text-center">
                  Wat betekent dit?
                </p>
                <p className="text-4xl font-bold text-center text-gray-800 mb-2">
                  {richting === 'frans-nl' ? huidig.frans : huidig.nederlands}
                </p>
                <p className="text-sm text-gray-500 text-center mb-6 italic">
                  {huidig.categorie}
                </p>

                <AccentKnoppen onInsert={voegAccentToe} />

                <input
                  ref={(el) => setInputRef(el)}
                  type="text"
                  value={antwoord}
                  onChange={(e) => setAntwoord(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && !feedback && controleerAntwoord()}
                  placeholder="Type je antwoord..."
                  className="w-full p-3 border-2 border-gray-300 rounded-lg mb-4 text-lg"
                  disabled={feedback !== null}
                  autoFocus
                />

                {feedback === null && (
                  <button
                    onClick={() => controleerAntwoord()}
                    className="w-full bg-green-500 text-white py-3 rounded-lg font-bold hover:bg-green-600"
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
                        Het juiste antwoord is: <strong>{richting === 'frans-nl' ? huidig.nederlands : huidig.frans}</strong>
                      </p>
                    )}
                  </div>
                )}

                {feedback !== null && (
                  <button
                    onClick={volgend}
                    className="w-full bg-green-500 text-white py-3 rounded-lg font-bold hover:bg-green-600"
                  >
                    Volgende
                  </button>
                )}
              </div>
            )}

            <p className="text-center text-sm text-gray-600">
              Woord {huidigeIndex + 1} van {vocabulaire.length}
            </p>
          </div>
        </div>
      </div>
    );
  };

  const GrammaticaModule = () => {
    const [huidigeIndex, setHuidigeIndex] = useState(0);
    const [antwoord, setAntwoord] = useState('');
    const [feedback, setFeedback] = useState(null);
    const [theorieModus, setTheorieModus] = useState(true);
    const [inputRef, setInputRef] = useState(null);

    const huidig = voorbeelden[huidigeIndex];

    const voegAccentToe = (accent) => {
      if (inputRef) {
        const start = inputRef.selectionStart;
        const end = inputRef.selectionEnd;
        const text = antwoord;
        const newText = text.substring(0, start) + accent + text.substring(end);
        setAntwoord(newText);
        setTimeout(() => {
          inputRef.focus();
          inputRef.setSelectionRange(start + 1, start + 1);
        }, 0);
      } else {
        setAntwoord(antwoord + accent);
      }
    };

    const controleerAntwoord = () => {
      const normalize = (str) => str.toLowerCase().trim()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const correct = normalize(antwoord) === normalize(huidig.lidwoord);
      setFeedback(correct);
      
      if (correct) {
        setScore(score + 10);
        setStreak(streak + 1);
      } else {
        setStreak(0);
      }
    };

    const volgend = () => {
      setHuidigeIndex((huidigeIndex + 1) % voorbeelden.length);
      setAntwoord('');
      setFeedback(null);
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-400 to-rose-600 p-8">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => setHuidigeModule('menu')}
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
                  <h3 className="font-bold text-xl mb-4 text-gray-800">💡 Tip</h3>
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
                  ref={(el) => setInputRef(el)}
                  type="text"
                  value={antwoord}
                  onChange={(e) => setAntwoord(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && !feedback && antwoord && controleerAntwoord()}
                  placeholder="Type: le, la, l', un of une"
                  className="w-full p-3 border-2 border-gray-300 rounded-lg mb-4 text-lg"
                  disabled={feedback !== null}
                  autoFocus
                />

                <p className="text-xs text-gray-500 mb-4 text-center">
                  💡 Tip: Voor l' moet je l en dan ' typen (apostrof)
                </p>

                {feedback === null && antwoord && (
                  <button
                    onClick={controleerAntwoord}
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
                Vraag {huidigeIndex + 1} van {voorbeelden.length}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {huidigeModule === 'menu' && <Hoofdmenu />}
      {huidigeModule === 'getallen' && <GetallenModule />}
      {huidigeModule === 'dagen' && <DagenModule />}
      {huidigeModule === 'vocabulaire' && <VocabulaireModule />}
      {huidigeModule === 'grammatica' && <GrammaticaModule />}
      {toonAccentHulp && <AccentHulp onClose={() => setToonAccentHulp(false)} />}
    </div>
  );
};

export default FransOefenApp;