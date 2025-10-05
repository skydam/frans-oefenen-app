import React, { useState } from 'react';
import { Check, X, ArrowUp, ArrowDown } from 'lucide-react';

/**
 * SequencingQuestion - Click-to-order interface for sequencing
 * @param {Object} props
 * @param {string} props.question - Question text
 * @param {Array} props.items - Scrambled items to order
 * @param {Array} props.correctOrder - Correct order of items
 * @param {Function} props.onComplete - Callback when user submits order
 * @param {boolean} props.showFeedback - Whether to show feedback
 */
const SequencingQuestion = React.memo(({
  question,
  items,
  correctOrder,
  onComplete,
  showFeedback
}) => {
  const [currentOrder, setCurrentOrder] = useState(items);
  const [submitted, setSubmitted] = useState(false);

  const moveUp = (index) => {
    if (index === 0) return;
    const newOrder = [...currentOrder];
    [newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]];
    setCurrentOrder(newOrder);
  };

  const moveDown = (index) => {
    if (index === currentOrder.length - 1) return;
    const newOrder = [...currentOrder];
    [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
    setCurrentOrder(newOrder);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    const isCorrect = JSON.stringify(currentOrder) === JSON.stringify(correctOrder);
    onComplete(isCorrect);
  };

  return (
    <div className="space-y-4">
      <p className="text-2xl font-bold text-center text-gray-800 mb-6">
        {question}
      </p>

      <div className="bg-gray-50 rounded-lg p-6">
        <div className="space-y-2">
          {currentOrder.map((item, index) => {
            const isCorrectPosition = showFeedback && submitted && item === correctOrder[index];
            const isWrongPosition = showFeedback && submitted && item !== correctOrder[index];

            let className = "flex items-center justify-between p-3 rounded-lg transition-all";

            if (showFeedback && submitted) {
              if (isCorrectPosition) {
                className += " bg-green-100 border-2 border-green-500";
              } else {
                className += " bg-red-100 border-2 border-red-500";
              }
            } else {
              className += " bg-white border-2 border-gray-300";
            }

            return (
              <div key={`${item}-${index}`} className={className}>
                <span className="text-sm font-semibold text-gray-500 mr-3">
                  {index + 1}
                </span>

                <span className="text-lg font-medium flex-1">
                  {item}
                </span>

                {!submitted && (
                  <div className="flex gap-1">
                    <button
                      onClick={() => moveUp(index)}
                      disabled={index === 0}
                      className={`p-1 rounded ${
                        index === 0
                          ? 'text-gray-300 cursor-not-allowed'
                          : 'text-blue-600 hover:bg-blue-100'
                      }`}
                    >
                      <ArrowUp className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => moveDown(index)}
                      disabled={index === currentOrder.length - 1}
                      className={`p-1 rounded ${
                        index === currentOrder.length - 1
                          ? 'text-gray-300 cursor-not-allowed'
                          : 'text-blue-600 hover:bg-blue-100'
                      }`}
                    >
                      <ArrowDown className="w-5 h-5" />
                    </button>
                  </div>
                )}

                {showFeedback && submitted && (
                  <div className="ml-2">
                    {isCorrectPosition ? (
                      <Check className="text-green-600" />
                    ) : (
                      <X className="text-red-600" />
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {!submitted && (
          <button
            onClick={handleSubmit}
            className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-bold transition-colors"
          >
            Controleer Volgorde
          </button>
        )}

        {showFeedback && submitted && (
          <div className="mt-4 p-3 rounded-lg bg-gray-100">
            <p className="text-sm text-gray-700">
              <strong>Juiste volgorde:</strong> {correctOrder.join(' → ')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
});

SequencingQuestion.displayName = 'SequencingQuestion';

export default SequencingQuestion;
