function ControlPanel({
  currentRound,
  currentScenario,
  isActive,
  isPaused,
  showAnswer,
  onStartRound,
  onTogglePause,
  onRevealAnswer,
  onNextScenario,
  onEndRound,
  onResetGame,
  gameData
}) {
  const getCurrentRoundData = () => {
    if (currentRound === 0) return null;
    return gameData.rounds[currentRound - 1];
  };

  const currentRoundData = getCurrentRoundData();

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <h3 className="text-2xl font-bold mb-6 text-gray-800">Game Controls</h3>

      {/* Round Selection */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-gray-700 mb-3">Select Round</h4>
        <div className="space-y-2">
          {gameData.rounds.map((round, index) => (
            <button
              key={round.id}
              onClick={() => onStartRound(index, 0)}
              disabled={isActive}
              className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all ${
                currentRound === index + 1
                  ? 'border-blue-500 bg-blue-50 font-semibold'
                  : 'border-gray-300 hover:border-blue-300 hover:bg-gray-50'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <div className="flex items-center justify-between">
                <span>Round {round.id}: {round.title}</span>
                {currentRound === index + 1 && (
                  <span className="text-blue-600 text-sm">Active</span>
                )}
              </div>
              <div className="text-sm text-gray-500 mt-1">
                {round.type === 'real-world' ?
                  `${round.questions?.length || 0} questions` :
                  `${round.scenarios?.length || 0} scenarios`}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Scenario Navigation */}
      {currentRoundData && currentRoundData.type !== 'real-world' && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Scenario Progress</h4>
          <div className="flex items-center gap-2">
            {currentRoundData.scenarios.map((_, index) => (
              <button
                key={index}
                onClick={() => onStartRound(currentRound - 1, index)}
                disabled={isActive}
                className={`flex-1 h-3 rounded-full transition-all ${
                  index === currentScenario
                    ? 'bg-blue-500'
                    : index < currentScenario
                    ? 'bg-green-500'
                    : 'bg-gray-300'
                } disabled:cursor-not-allowed`}
                title={`Scenario ${index + 1}`}
              />
            ))}
          </div>
          <div className="text-center text-sm text-gray-600 mt-2">
            Scenario {currentScenario + 1} of {currentRoundData.scenarios.length}
          </div>
        </div>
      )}

      {/* Timer Controls */}
      {isActive && (
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-700 mb-3">Timer</h4>
          <div className="space-y-2">
            <button
              onClick={onTogglePause}
              className="w-full px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg transition-colors"
            >
              {isPaused ? '▶️ Resume' : '⏸️ Pause'}
            </button>
            <button
              onClick={onEndRound}
              className="w-full px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors"
            >
              ⏹️ Stop Timer & Lock Answers
            </button>
          </div>
        </div>
      )}

      {/* Answer Controls */}
      <div className="mb-6 space-y-3">
        <h4 className="text-lg font-semibold text-gray-700">Actions</h4>

        {!isActive && !showAnswer && currentRound > 0 && (
          <button
            onClick={() => onStartRound(currentRound - 1, currentScenario)}
            className="w-full px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors"
          >
            ▶️ Start/Restart Round
          </button>
        )}

        {!showAnswer && !isActive && currentRound > 0 && (
          <button
            onClick={onRevealAnswer}
            className="w-full px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors"
          >
            🎯 Reveal Answer
          </button>
        )}

        {showAnswer && currentRoundData && currentRoundData.type !== 'real-world' && (
          <>
            {currentScenario < currentRoundData.scenarios.length - 1 ? (
              <button
                onClick={onNextScenario}
                className="w-full px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-lg transition-colors"
              >
                ➡️ Next Scenario
              </button>
            ) : (
              <button
                onClick={onNextScenario}
                className="w-full px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-lg transition-colors"
              >
                ✅ Complete Round
              </button>
            )}
          </>
        )}
      </div>

      {/* Reset Game */}
      <div className="pt-6 border-t-2 border-gray-200">
        <button
          onClick={onResetGame}
          className="w-full px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors"
        >
          🔄 Reset Game
        </button>
      </div>

      {/* Status Display */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg text-sm">
        <div className="space-y-1 text-gray-600">
          <div>Status: <span className="font-semibold">{isActive ? '🟢 Active' : '⚪ Inactive'}</span></div>
          {currentRound > 0 && (
            <>
              <div>Round: <span className="font-semibold">{currentRound}</span></div>
              <div>Scenario: <span className="font-semibold">{currentScenario + 1}</span></div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ControlPanel;
