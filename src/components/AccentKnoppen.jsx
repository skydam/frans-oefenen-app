import React from 'react';

/**
 * AccentKnoppen - Displays clickable buttons for French accent characters
 * @param {Object} props
 * @param {Function} props.onInsert - Callback when an accent is clicked
 */
const AccentKnoppen = React.memo(({ onInsert }) => {
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
});

AccentKnoppen.displayName = 'AccentKnoppen';

export default AccentKnoppen;
