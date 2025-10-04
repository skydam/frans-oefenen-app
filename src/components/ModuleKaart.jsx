import React from 'react';

/**
 * ModuleKaart - Card component for module selection
 * @param {Object} props
 * @param {React.ReactNode} props.icon - Icon to display
 * @param {string} props.titel - Title of the module
 * @param {string} props.beschrijving - Description of the module
 * @param {string} props.kleur - Tailwind gradient classes for background color
 * @param {Function} props.onClick - Callback when card is clicked
 */
const ModuleKaart = React.memo(({ icon, titel, beschrijving, kleur, onClick }) => (
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
));

ModuleKaart.displayName = 'ModuleKaart';

export default ModuleKaart;
