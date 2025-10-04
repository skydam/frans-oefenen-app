import React from 'react';
import { X } from 'lucide-react';

/**
 * AccentHulp - Modal component that shows how to type French accents
 * @param {Object} props
 * @param {Function} props.onClose - Callback when closing the modal
 */
const AccentHulp = React.memo(({ onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl max-h-[90vh] overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Franse Accenten Typen</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="space-y-6">
        <div className="bg-blue-50 rounded-xl p-4">
          <h3 className="font-bold text-lg mb-3">Belangrijk voor de toets!</h3>
          <p className="text-gray-700">
            Op de toets moet je Frans kunnen schrijven. Oefen dus vooral met <strong>typen</strong>!
            De app accepteert antwoorden met én zonder accenten, maar leer wel de juiste spelling.
          </p>
        </div>

        <div className="bg-yellow-50 rounded-xl p-4">
          <h3 className="font-bold text-lg mb-3">Snelle Methode: Klik op accent knoppen</h3>
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
          <h3 className="font-bold text-lg mb-3">Windows Toetsenbord</h3>
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
          <h3 className="font-bold text-lg mb-3">Mac Toetsenbord</h3>
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
          <h3 className="font-bold text-lg mb-3">Veel gebruikte Franse accenten</h3>
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
));

AccentHulp.displayName = 'AccentHulp';

export default AccentHulp;
