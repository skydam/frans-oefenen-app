import React from 'react';
import { Check, X } from 'lucide-react';

/**
 * MultipleChoiceQuestion - Radio button selection component
 * @param {Object} props
 * @param {string} props.question - Question text
 * @param {string} props.instruction - Optional instruction text
 * @param {Array} props.options - Array of option strings
 * @param {string} props.selectedAnswer - Currently selected answer
 * @param {Function} props.onSelect - Callback when option selected
 * @param {boolean} props.showFeedback - Whether to show correct/incorrect feedback
 * @param {string} props.correctAnswer - The correct answer
 * @param {boolean} props.columnFormat - Whether to display in column grid format
 */
const MultipleChoiceQuestion = React.memo(({
  question,
  instruction,
  options,
  selectedAnswer,
  onSelect,
  showFeedback,
  correctAnswer,
  columnFormat = false
}) => {
  return (
    <div className="space-y-4">
      {instruction && (
        <p className="text-lg font-semibold text-gray-700 text-center mb-2">
          {instruction}
        </p>
      )}

      <p className="text-2xl font-bold text-center text-gray-800 mb-4">
        {question}
      </p>

      {columnFormat ? (
        // Grid format for article swap questions
        <div className="space-y-2">
          {options.map((option) => {
            const isSelected = selectedAnswer === option;
            const isCorrect = showFeedback && option === correctAnswer;
            const isWrong = showFeedback && isSelected && option !== correctAnswer;

            let className = "flex items-center justify-center p-3 border-2 rounded-lg cursor-pointer transition-all";

            if (showFeedback) {
              if (isCorrect) {
                className += " bg-green-100 border-green-500";
              } else if (isWrong) {
                className += " bg-red-100 border-red-500";
              } else {
                className += " border-gray-300 opacity-50";
              }
            } else if (isSelected) {
              className += " border-blue-500 bg-blue-50";
            } else {
              className += " border-gray-300 hover:border-blue-400";
            }

            return (
              <label key={option} className={className}>
                <input
                  type="radio"
                  name="answer"
                  value={option}
                  checked={isSelected}
                  onChange={() => !showFeedback && onSelect(option)}
                  disabled={showFeedback}
                  className="mr-3"
                />
                <span className="text-lg font-medium">{option}</span>

                {showFeedback && isCorrect && (
                  <Check className="ml-auto text-green-600" />
                )}
                {showFeedback && isWrong && (
                  <X className="ml-auto text-red-600" />
                )}
              </label>
            );
          })}
        </div>
      ) : (
        // Standard vertical list format
        <div className="space-y-3">
          {options.map((option) => {
            const isSelected = selectedAnswer === option;
            const isCorrect = showFeedback && option === correctAnswer;
            const isWrong = showFeedback && isSelected && option !== correctAnswer;

            let className = "flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all";

            if (showFeedback) {
              if (isCorrect) {
                className += " bg-green-100 border-green-500";
              } else if (isWrong) {
                className += " bg-red-100 border-red-500";
              } else {
                className += " border-gray-300 opacity-50";
              }
            } else if (isSelected) {
              className += " border-blue-500 bg-blue-50";
            } else {
              className += " border-gray-300 hover:border-blue-400";
            }

            return (
              <label key={option} className={className}>
                <input
                  type="radio"
                  name="answer"
                  value={option}
                  checked={isSelected}
                  onChange={() => !showFeedback && onSelect(option)}
                  disabled={showFeedback}
                  className="mr-3 h-5 w-5"
                />
                <span className="text-lg flex-1">{option}</span>

                {showFeedback && isCorrect && (
                  <Check className="ml-2 text-green-600" />
                )}
                {showFeedback && isWrong && (
                  <X className="ml-2 text-red-600" />
                )}
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
});

MultipleChoiceQuestion.displayName = 'MultipleChoiceQuestion';

export default MultipleChoiceQuestion;
