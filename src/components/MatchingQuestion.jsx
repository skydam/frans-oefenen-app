import React, { useState } from 'react';
import { Check, X } from 'lucide-react';

/**
 * MatchingQuestion - Match items from left column with right column
 * Redesigned for clearer interaction: click left item, then click right item to match
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
  const [selectedLeft, setSelectedLeft] = useState(null);

  const handleLeftClick = (leftItem) => {
    if (submitted) return;
    setSelectedLeft(leftItem);
  };

  const handleRightClick = (rightItem) => {
    if (submitted || !selectedLeft) return;

    // Check if this right item is already used
    const alreadyMatched = Object.values(matches).includes(rightItem);
    if (alreadyMatched) return;

    // Make the match
    setMatches(prev => ({
      ...prev,
      [selectedLeft]: rightItem
    }));

    setSelectedLeft(null);
  };

  const handleRemoveMatch = (leftItem) => {
    if (submitted) return;
    const newMatches = { ...matches };
    delete newMatches[leftItem];
    setMatches(newMatches);
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
      <p className="text-2xl font-bold text-center text-gray-800 mb-4">
        {question}
      </p>

      {/* Instructions */}
      {!submitted && (
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-3 mb-4">
          <p className="text-sm text-center text-blue-800 font-medium">
            {selectedLeft
              ? `Klik nu op het juiste antwoord rechts voor "${selectedLeft}"`
              : 'Klik eerst op een vraag links, dan op het passende antwoord rechts'
            }
          </p>
        </div>
      )}

      <div className="bg-gray-50 rounded-lg p-6">
        <div className="grid grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-gray-500 text-center mb-2">VRAGEN</p>
            {leftColumn.map((leftItem) => {
              const matched = matches[leftItem];
              const isSelected = selectedLeft === leftItem;
              const isCorrect = showFeedback && submitted && isMatchCorrect(leftItem);
              const isWrong = showFeedback && submitted && !isMatchCorrect(leftItem);

              let className = "p-3 rounded-lg border-2 text-center font-medium cursor-pointer transition-all";

              if (showFeedback && submitted) {
                if (isCorrect) {
                  className += " bg-green-100 border-green-500";
                } else {
                  className += " bg-red-100 border-red-500";
                }
              } else if (isSelected) {
                className += " bg-blue-200 border-blue-600 ring-2 ring-blue-400";
              } else if (matched) {
                className += " bg-blue-50 border-blue-400";
              } else {
                className += " bg-white border-gray-300 hover:border-blue-400 hover:bg-blue-50";
              }

              return (
                <div key={leftItem}>
                  <div
                    className={className}
                    onClick={() => !submitted && handleLeftClick(leftItem)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex-1 text-sm">{leftItem}</span>
                      {showFeedback && submitted && (
                        isCorrect ? (
                          <Check className="text-green-600 ml-2 flex-shrink-0" size={20} />
                        ) : (
                          <X className="text-red-600 ml-2 flex-shrink-0" size={20} />
                        )
                      )}
                    </div>
                  </div>

                  {/* Show match below left item */}
                  {matched && (
                    <div className="mt-2 flex items-center justify-center gap-2">
                      <span className="text-xs text-blue-600">→</span>
                      <div className="text-xs bg-blue-100 px-2 py-1 rounded border border-blue-300 max-w-[90%] truncate">
                        {matched}
                      </div>
                      {!submitted && (
                        <button
                          onClick={() => handleRemoveMatch(leftItem)}
                          className="text-xs text-red-600 hover:text-red-800"
                          title="Verwijder koppeling"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  )}

                  {/* Show correct answer if wrong */}
                  {showFeedback && submitted && !isCorrect && (
                    <p className="text-xs text-center text-gray-600 mt-1">
                      ✓ Juist: {correctMatches[leftItem]}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-gray-500 text-center mb-2">ANTWOORDEN</p>
            {rightColumn.map((rightItem) => {
              const isUsed = Object.values(matches).includes(rightItem);
              const canClick = !submitted && selectedLeft && !isUsed;

              let className = "p-3 rounded-lg border-2 text-center font-medium transition-all";

              if (submitted) {
                className += " bg-gray-100 border-gray-300 opacity-60 cursor-not-allowed";
              } else if (isUsed) {
                className += " bg-gray-100 border-gray-300 opacity-40 cursor-not-allowed";
              } else if (canClick) {
                className += " bg-white border-blue-400 hover:bg-blue-100 hover:border-blue-600 cursor-pointer ring-2 ring-blue-200";
              } else {
                className += " bg-white border-gray-300 cursor-not-allowed opacity-50";
              }

              return (
                <div
                  key={rightItem}
                  className={className}
                  onClick={() => handleRightClick(rightItem)}
                >
                  <span className="text-sm">{rightItem}</span>
                  {isUsed && !submitted && (
                    <span className="ml-2 text-xs text-gray-500">✓ gebruikt</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Submit button */}
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
      </div>
    </div>
  );
});

MatchingQuestion.displayName = 'MatchingQuestion';

export default MatchingQuestion;
