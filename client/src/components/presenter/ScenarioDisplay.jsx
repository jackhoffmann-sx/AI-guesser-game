function ScenarioDisplay({ round, scenario, showAnswer, roundScores }) {
  const renderOptions = () => {
    if (!scenario.options) return null;

    if (round.type === 'red-flags') {
      // Checkbox options
      return (
        <div className="space-y-3">
          {scenario.options.map((option) => {
            const isCorrect = scenario.correctAnswers?.includes(option.id);
            const shouldHighlight = showAnswer && isCorrect;

            return (
              <div
                key={option.id}
                className={`p-4 rounded-lg border-2 ${
                  shouldHighlight
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-300 bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 border-2 border-gray-400 rounded flex items-center justify-center">
                    {shouldHighlight && <span className="text-green-600">✓</span>}
                  </div>
                  <span className={`text-lg ${shouldHighlight ? 'font-semibold' : ''}`}>
                    {option.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      );
    } else {
      // Radio options
      return (
        <div className="space-y-3">
          {scenario.options.map((option) => {
            const isCorrect = option.id === scenario.correctAnswer;
            const shouldHighlight = showAnswer && isCorrect;

            return (
              <div
                key={option.id}
                className={`p-4 rounded-lg border-2 transition-all ${
                  shouldHighlight
                    ? 'border-green-500 bg-green-50 scale-105'
                    : 'border-gray-300 bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      shouldHighlight ? 'border-green-500' : 'border-gray-400'
                    }`}
                  >
                    {shouldHighlight && (
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-700">{option.id}</span>
                      {shouldHighlight && <span className="text-green-600 text-xl">✓</span>}
                    </div>
                    <p className={`text-lg mt-1 ${shouldHighlight ? 'font-semibold' : ''}`}>
                      {option.label}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    }
  };

  const renderRoundScores = () => {
    if (!showAnswer || !roundScores || Object.keys(roundScores).length === 0) {
      return null;
    }

    return (
      <div className="mt-6 p-6 bg-blue-50 rounded-lg border-2 border-blue-200">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Round Results</h3>
        <div className="space-y-3">
          {Object.values(roundScores).map((result) => (
            <div
              key={result.teamName}
              className={`flex items-center justify-between p-4 rounded-lg ${
                result.isCorrect ? 'bg-green-100 border-2 border-green-300' : 'bg-red-100 border-2 border-red-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">
                  {result.isCorrect ? '✅' : '❌'}
                </span>
                <div>
                  <div className="font-bold text-lg">{result.teamName}</div>
                  <div className="text-sm text-gray-600">
                    Answered in {result.timeToAnswer}s
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-2xl font-bold ${result.score > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {result.score > 0 ? '+' : ''}{result.score}
                </div>
                <div className="text-sm text-gray-600">
                  Total: {result.totalScore}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg p-8 shadow-lg">
      {/* Round Header */}
      <div className="mb-6 pb-6 border-b-2 border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-3xl font-bold text-gray-800">
            Round {round.id}: {round.title}
          </h2>
          <span className="text-lg text-gray-500">
            {scenario.points || 10} points
          </span>
        </div>
      </div>

      {/* Scenario Content */}
      <div className="space-y-6">
        {/* Original Prompt (for better-prompt type) */}
        {round.type === 'better-prompt' && scenario.originalPrompt && (
          <div className="p-4 bg-red-50 rounded-lg border-2 border-red-200">
            <h3 className="font-semibold text-red-900 mb-2">Original Prompt:</h3>
            <p className="text-lg text-red-800 italic">"{scenario.originalPrompt}"</p>
          </div>
        )}

        {/* Task (for tool-selection type) */}
        {round.type === 'tool-selection' && scenario.task && (
          <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-2">Task:</h3>
            <p className="text-lg text-blue-800">{scenario.task}</p>
          </div>
        )}

        {/* Prompt (for hallucination type) */}
        {scenario.prompt && (
          <div className="p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
            <h3 className="font-semibold text-gray-700 mb-2">Prompt:</h3>
            <p className="text-lg text-gray-800 italic">"{scenario.prompt}"</p>
          </div>
        )}

        {/* AI Response */}
        {scenario.aiResponse && (
          <div className="p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
            <h3 className="font-semibold text-purple-900 mb-2">AI Response:</h3>
            <p className="text-lg text-purple-900 whitespace-pre-line">
              {scenario.aiResponse}
            </p>
          </div>
        )}

        {/* Question */}
        <div className="pt-4">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            {scenario.question}
          </h3>
        </div>

        {/* Options */}
        {renderOptions()}

        {/* Round Scores */}
        {renderRoundScores()}

        {/* Explanation */}
        {showAnswer && scenario.explanation && (
          <div className="mt-6 p-6 bg-green-50 rounded-lg border-2 border-green-300">
            <h3 className="text-2xl font-bold text-green-900 mb-3">
              Explanation
            </h3>
            <p className="text-lg text-green-900 leading-relaxed">
              {scenario.explanation}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ScenarioDisplay;
