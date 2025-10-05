import React, { useState } from 'react';
import { Check, X } from 'lucide-react';

/**
 * MatchingQuestion - Match items from left column with right column
 * @param {Object} props
 * @param {string} props.question - Question text
 * @param {Array} props.leftColumn - Left column items
 * @param {Array} props.rightColumn - Right column items (scrambled)
 * @param {Object} props.correctMatches - Object mapping left → right correct pairs
 * @param {Function} props.onComplete - Callback when submitted
 * @param {boolean} props.showFeedback - Whether to show feedback
 */
const MatchingQuestion = React.memo(({
  question,
  leftColumn,
  rightColumn,
  correctMatches,
  onComplete,
  showFeedback
}) => {
  const [matches, setMatches] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleMatch = (leftItem, rightItem) => {
    if (submitted) return;

    setMatches(prev => ({
      ...prev,
      [leftItem]: rightItem
    }));
  };

  const handleSubmit = () => {
    setSubmitted(true);

    // Calculate score
    let correct = 0;
    Object.keys(correctMatches).forEach(leftItem => {
      if (matches[leftItem] === correctMatches[leftItem]) {
        correct++;
      }
    });

    const isAllCorrect = correct === Object.keys(correctMatches).length;
    onComplete(isAllCorrect, correct);
  };

  const isMatchCorrect = (leftItem) => {
    return matches[leftItem] === correctMatches[leftItem];
  };

  const allMatched = Object.keys(matches).length === leftColumn.length;

  return (
    <div className="space-y-4">
      <p className="text-2xl font-bold text-center text-gray-800 mb-6">
        {question}
      </p>

      <div className="bg-gray-50 rounded-lg p-6">
        <div className="grid grid-cols-2 gap-4">
          {/* Left Column */}
          <div className="space-y-2">
            {leftColumn.map((leftItem) => {
              const matched = matches[leftItem];
              const isCorrect = showFeedback && submitted && isMatchCorrect(leftItem);
              const isWrong = showFeedback && submitted && !isMatchCorrect(leftItem);

              let className = "p-3 rounded-lg border-2 text-center font-medium transition-all";

              if (showFeedback && submitted) {
                if (isCorrect) {
                  className += " bg-green-100 border-green-500";
                } else {
                  className += " bg-red-100 border-red-500";
                }
              } else if (matched) {
                className += " bg-blue-50 border-blue-500";
              } else {
                className += " bg-white border-gray-300";
              }

              return (
                <div key={leftItem}>
                  <div className={className}>
                    <div className="flex items-center justify-between">
                      <span className="flex-1">{leftItem}</span>
                      {showFeedback && submitted && (
                        isCorrect ? (
                          <Check className="text-green-600 ml-2" />
                        ) : (
                          <X className="text-red-600 ml-2" />
                        )
                      )}
                    </div>
                  </div>
                  {matched && (
                    <p className="text-sm text-center text-blue-600 mt-1 font-medium">
                      ↓ {matched}
                    </p>
                  )}
                  {showFeedback && submitted && !isCorrect && (
                    <p className="text-xs text-center text-gray-600 mt-1">
                      Juist: {correctMatches[leftItem]}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column */}
          <div className="space-y-2">
            {rightColumn.map((rightItem) => {
              const isUsed = Object.values(matches).includes(rightItem);

              let className = "p-3 rounded-lg border-2 text-center font-medium cursor-pointer transition-all";

              if (submitted) {
                className += " opacity-50 cursor-not-allowed bg-gray-100 border-gray-300";
              } else if (isUsed) {
                className += " bg-gray-100 border-gray-300 opacity-50";
              } else {
                className += " bg-white border-gray-300 hover:bg-blue-50 hover:border-blue-400";
              }

              return (
                <div key={rightItem} className="relative">
                  <div className={className}>
                    {rightItem}
                  </div>
                  {!submitted && (
                    <div className="absolute -left-2 top-0 bottom-0 flex flex-col justify-center opacity-0 hover:opacity-100 transition-opacity">
                      {leftColumn.map((leftItem) => (
                        <button
                          key={leftItem}
                          onClick={() => handleMatch(leftItem, rightItem)}
                          disabled={isUsed}
                          className="text-xs bg-blue-500 text-white px-1 py-0.5 rounded mb-1 hover:bg-blue-600 disabled:opacity-30"
                          title={`Match met "${leftItem}"`}
                        >
                          ← {leftItem.substring(0, 10)}...
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {!submitted && (
          <button
            onClick={handleSubmit}
            disabled={!allMatched}
            className={`w-full mt-6 py-3 rounded-lg font-bold transition-colors ${
              allMatched
                ? 'bg-blue-500 hover:bg-blue-600 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {allMatched ? 'Controleer Combinaties' : `Maak alle combinaties (${Object.keys(matches).length}/${leftColumn.length})`}
          </button>
        )}

        {/* Instructions */}
        {!submitted && (
          <p className="text-xs text-center text-gray-500 mt-2">
            Klik op een item rechts om het te koppelen aan een item links
          </p>
        )}
      </div>
    </div>
  );
});

MatchingQuestion.displayName = 'MatchingQuestion';

export default MatchingQuestion;
