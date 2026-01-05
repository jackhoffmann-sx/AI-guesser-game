function Timer({ timeRemaining, isActive, isPaused }) {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  const getTimerColor = () => {
    if (!isActive) return 'text-gray-500';
    if (timeRemaining <= 10) return 'text-red-600 animate-pulse';
    if (timeRemaining <= 30) return 'text-orange-500';
    return 'text-green-600';
  };

  const getProgressPercentage = () => {
    return (timeRemaining / 90) * 100;
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <div className="text-center mb-4">
        <div className={`text-6xl font-mono font-bold ${getTimerColor()}`}>
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
        <div className="text-sm text-gray-500 mt-2">
          {isPaused ? '⏸️ PAUSED' : isActive ? '⏱️ TIME REMAINING' : '⏹️ NOT ACTIVE'}
        </div>
      </div>

      {isActive && (
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className={`h-full transition-all duration-1000 ease-linear ${
              timeRemaining <= 10
                ? 'bg-red-500'
                : timeRemaining <= 30
                ? 'bg-orange-500'
                : 'bg-green-500'
            }`}
            style={{ width: `${getProgressPercentage()}%` }}
          />
        </div>
      )}
    </div>
  );
}

export default Timer;
