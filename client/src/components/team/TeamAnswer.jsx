import { useState } from 'react';

function TeamAnswer({ round, scenario, timeRemaining, isPaused, onSubmit }) {
  const [selectedAnswer, setSelectedAnswer] = useState(
    round.type === 'red-flags' ? [] : null
  );

  const handleOptionClick = (optionId) => {
    if (round.type === 'red-flags') {
      // Multiple selection
      setSelectedAnswer((prev) => {
        if (prev.includes(optionId)) {
          return prev.filter((id) => id !== optionId);
        } else {
          return [...prev, optionId];
        }
      });
    } else {
      // Single selection
      setSelectedAnswer(optionId);
    }
  };

  const handleSubmit = () => {
    if (round.type === 'red-flags' && selectedAnswer.length === 0) {
      alert('Please select at least one option');
      return;
    }

    if (round.type !== 'red-flags' && !selectedAnswer) {
      alert('Please select an answer');
      return;
    }

    onSubmit(selectedAnswer);
  };

  const getTimeColor = () => {
    if (timeRemaining <= 10) return 'text-red-600';
    if (timeRemaining <= 30) return 'text-orange-500';
    return 'text-green-600';
  };

  const renderOptions = () => {
    if (round.type === 'red-flags') {
      // Checkbox options
      return (
        <div className="space-y-3">
          {scenario.options.map((option) => {
            const isSelected = selectedAnswer.includes(option.id);

            return (
              <button
                key={option.id}
                onClick={() => handleOptionClick(option.id)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 bg-white hover:border-gray-400'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 border-2 rounded flex items-center justify-center transition-all ${
                      isSelected
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-400 bg-white'
                    }`}
                  >
                    {isSelected && <span className="text-white text-sm">✓</span>}
                  </div>
                  <span className={`text-lg ${isSelected ? 'font-semibold' : ''}`}>
                    {option.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      );
    } else {
      // Radio options
      return (
        <div className="space-y-3">
          {scenario.options.map((option) => {
            const isSelected = selectedAnswer === option.id;

            return (
              <button
                key={option.id}
                onClick={() => handleOptionClick(option.id)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 bg-white hover:border-gray-400'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      isSelected ? 'border-blue-500' : 'border-gray-400'
                    }`}
                  >
                    {isSelected && (
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-700">{option.id}</span>
                    </div>
                    <p className={`text-base mt-1 ${isSelected ? 'font-semibold' : ''}`}>
                      {option.label}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Timer Display */}
      <div className="bg-white rounded-lg p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <span className="text-gray-600 font-semibold">Time Remaining:</span>
          <div className={`text-3xl font-mono font-bold ${getTimeColor()}`}>
            {Math.floor(timeRemaining / 60)}:{String(timeRemaining % 60).padStart(2, '0')}
          </div>
        </div>
        {isPaused && (
          <div className="text-center text-yellow-600 font-semibold mt-2">
            ⏸️ PAUSED
          </div>
        )}
        {timeRemaining <= 30 && timeRemaining > 10 && (
          <div className="text-center text-orange-600 text-sm mt-2">
            ⚡ Submit within 30 seconds for speed bonus!
          </div>
        )}
        {timeRemaining <= 10 && (
          <div className="text-center text-red-600 font-bold text-sm mt-2 animate-pulse">
            ⚠️ HURRY! Time almost up!
          </div>
        )}
      </div>

      {/* Question Content */}
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Round {round.id}: {round.title}
          </h2>
          <div className="text-sm text-gray-500">
            Scenario {scenario.id || 1}
          </div>
        </div>

        <div className="space-y-4 mb-6">
          {/* Original Prompt (for better-prompt type) */}
          {round.type === 'better-prompt' && scenario.originalPrompt && (
            <div className="p-4 bg-red-50 rounded-lg border-2 border-red-200">
              <h3 className="font-semibold text-red-900 mb-2 text-sm">
                Original Prompt:
              </h3>
              <p className="text-base text-red-800 italic">"{scenario.originalPrompt}"</p>
            </div>
          )}

          {/* Task (for tool-selection type) */}
          {round.type === 'tool-selection' && scenario.task && (
            <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-2 text-sm">Task:</h3>
              <p className="text-base text-blue-800">{scenario.task}</p>
            </div>
          )}

          {/* Prompt (for hallucination type) */}
          {scenario.prompt && (
            <div className="p-3 bg-gray-50 rounded-lg border-2 border-gray-200">
              <h3 className="font-semibold text-gray-700 mb-2 text-sm">Prompt:</h3>
              <p className="text-base text-gray-800 italic">"{scenario.prompt}"</p>
            </div>
          )}

          {/* AI Response */}
          {scenario.aiResponse && (
            <div className="p-3 bg-purple-50 rounded-lg border-2 border-purple-200">
              <h3 className="font-semibold text-purple-900 mb-2 text-sm">
                AI Response:
              </h3>
              <p className="text-base text-purple-900 whitespace-pre-line">
                {scenario.aiResponse}
              </p>
            </div>
          )}
        </div>

        {/* Question */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-800">
            {scenario.question}
          </h3>
          {round.type === 'red-flags' && (
            <p className="text-sm text-gray-600 mt-1">
              (Select all that apply)
            </p>
          )}
        </div>

        {/* Options */}
        {renderOptions()}

        {/* Submit Button */}
        <div className="mt-6">
          <button
            onClick={handleSubmit}
            disabled={
              round.type === 'red-flags'
                ? selectedAnswer.length === 0
                : !selectedAnswer
            }
            className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-bold py-4 px-6 rounded-lg transition-colors text-lg disabled:cursor-not-allowed"
          >
            Submit Answer
          </button>
          {round.type === 'red-flags' && (
            <p className="text-center text-sm text-gray-500 mt-2">
              {selectedAnswer.length} option{selectedAnswer.length !== 1 ? 's' : ''} selected
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default TeamAnswer;
