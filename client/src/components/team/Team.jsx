import { useState, useEffect } from 'react';
import socketService from '../../services/socket';
import { gameData } from '../../data/gameData';
import TeamJoin from './TeamJoin';
import TeamAnswer from './TeamAnswer';

function Team() {
  const [connected, setConnected] = useState(false);
  const [team, setTeam] = useState(null);
  const [gameState, setGameState] = useState({
    currentRound: 0,
    currentScenario: 0,
    timeRemaining: 90,
    isActive: false,
    isPaused: false,
    showAnswer: false,
    teams: []
  });
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [lastRoundScores, setLastRoundScores] = useState(null);

  useEffect(() => {
    if (!team) return;

    // Listen for game state updates
    socketService.on('game-state-update', (state) => {
      setGameState(state);
    });

    socketService.on('round-started', (data) => {
      setGameState((prev) => ({
        ...prev,
        currentRound: data.round,
        currentScenario: data.scenario,
        timeRemaining: data.timeRemaining,
        isActive: true,
        isPaused: false,
        showAnswer: false
      }));
      setHasSubmitted(false);
      setSelectedAnswer(null);
      setLastRoundScores(null);
    });

    socketService.on('timer-update', (data) => {
      setGameState((prev) => ({
        ...prev,
        timeRemaining: data.timeRemaining
      }));
    });

    socketService.on('timer-toggled', (data) => {
      setGameState((prev) => ({
        ...prev,
        isPaused: data.isPaused
      }));
    });

    socketService.on('time-expired', () => {
      setGameState((prev) => ({
        ...prev,
        isActive: false
      }));
    });

    socketService.on('answer-revealed', (data) => {
      setGameState((prev) => ({
        ...prev,
        teams: data.teams,
        showAnswer: true,
        isActive: false
      }));
      setLastRoundScores(data.roundScores);

      // Update team score
      const updatedTeam = data.teams.find(t => t.id === team.id);
      if (updatedTeam) {
        setTeam(prev => ({ ...prev, score: updatedTeam.score }));
      }
    });

    socketService.on('round-ended', (data) => {
      setGameState((prev) => ({
        ...prev,
        currentRound: data.currentRound || prev.currentRound,
        currentScenario: data.currentScenario || prev.currentScenario,
        teams: data.teams,
        isActive: false,
        showAnswer: false,
        timeRemaining: 90
      }));
      setHasSubmitted(false);
      setSelectedAnswer(null);
      setLastRoundScores(null);

      // Update team score
      const updatedTeam = data.teams.find(t => t.id === team.id);
      if (updatedTeam) {
        setTeam(prev => ({ ...prev, score: updatedTeam.score }));
      }
    });

    socketService.on('game-reset', (state) => {
      setGameState(state);
      setHasSubmitted(false);
      setSelectedAnswer(null);
      setLastRoundScores(null);
      setTeam(prev => ({ ...prev, score: 0 }));
    });

    return () => {
      socketService.removeAllListeners();
    };
  }, [team]);

  const handleJoinTeam = async (teamName) => {
    try {
      socketService.connect();

      const teamData = await socketService.joinTeam(teamName);
      setTeam(teamData);
      setConnected(true);

      // Get current state
      socketService.getState();
    } catch (error) {
      console.error('Failed to join team:', error);
      alert('Failed to join team. Please try again.');
    }
  };

  const handleSubmitAnswer = async (answer) => {
    try {
      await socketService.submitAnswer(answer);
      setHasSubmitted(true);
      setSelectedAnswer(answer);
    } catch (error) {
      console.error('Failed to submit answer:', error);
      alert('Failed to submit answer. Please try again.');
    }
  };

  const getCurrentRound = () => {
    if (gameState.currentRound === 0) return null;
    return gameData.rounds[gameState.currentRound - 1];
  };

  const getCurrentScenario = () => {
    const round = getCurrentRound();
    if (!round) return null;

    if (round.type === 'real-world') {
      return round;
    }

    return round.scenarios?.[gameState.currentScenario];
  };

  if (!connected || !team) {
    return <TeamJoin onJoin={handleJoinTeam} />;
  }

  const currentRound = getCurrentRound();
  const currentScenario = getCurrentScenario();

  const getTeamColorClass = () => {
    const colorMap = {
      'team-blue': 'from-blue-500 to-blue-600',
      'team-green': 'from-green-500 to-green-600',
      'team-purple': 'from-purple-500 to-purple-600',
      'team-orange': 'from-orange-500 to-orange-600',
    };
    return colorMap[team.color] || 'from-gray-500 to-gray-600';
  };

  const getMyRoundScore = () => {
    if (!lastRoundScores || !team) return null;
    return lastRoundScores[team.id];
  };

  const myRoundScore = getMyRoundScore();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Team Header */}
      <div className={`bg-gradient-to-r ${getTeamColorClass()} text-white p-6 shadow-lg`}>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-1">{team.name}</h1>
              <p className="text-white/80">Team Interface</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold">{team.score}</div>
              <div className="text-sm text-white/80">Total Points</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-6">
        {/* Waiting State */}
        {!currentRound && (
          <div className="bg-white rounded-lg p-12 shadow-lg text-center">
            <div className="text-6xl mb-4">⏳</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Waiting for round to start...
            </h2>
            <p className="text-xl text-gray-600">
              The presenter will start the next round soon
            </p>
          </div>
        )}

        {/* Active Round */}
        {currentRound && currentScenario && gameState.isActive && !hasSubmitted && (
          <TeamAnswer
            round={currentRound}
            scenario={currentScenario}
            timeRemaining={gameState.timeRemaining}
            isPaused={gameState.isPaused}
            onSubmit={handleSubmitAnswer}
          />
        )}

        {/* Submitted State */}
        {currentRound && hasSubmitted && !gameState.showAnswer && gameState.isActive && (
          <div className="bg-white rounded-lg p-12 shadow-lg text-center">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Answer Submitted!
            </h2>
            <p className="text-xl text-gray-600 mb-6">
              Waiting for other teams...
            </p>
            <div className="text-gray-500">
              Your answer will be revealed soon
            </div>
          </div>
        )}

        {/* Round Ended / Time Expired */}
        {currentRound && !gameState.isActive && !gameState.showAnswer && (
          <div className="bg-white rounded-lg p-12 shadow-lg text-center">
            <div className="text-6xl mb-4">⏹️</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Round Ended
            </h2>
            <p className="text-xl text-gray-600 mb-4">
              Waiting for next round...
            </p>
            <div className="text-gray-500">
              Your current score: <span className="font-bold text-gray-700">{team.score}</span> points
            </div>
          </div>
        )}

        {/* Results */}
        {currentRound && gameState.showAnswer && myRoundScore && (
          <div className="bg-white rounded-lg p-8 shadow-lg">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">
                {myRoundScore.isCorrect ? '🎉' : '😔'}
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                {myRoundScore.isCorrect ? 'Correct!' : 'Incorrect'}
              </h2>
            </div>

            {/* Show what the user answered and correct answer */}
            <div className="mb-6 space-y-3">
              {selectedAnswer && (
                <div className={`p-4 border-2 rounded-lg ${
                  myRoundScore.isCorrect
                    ? 'bg-green-50 border-green-300'
                    : 'bg-red-50 border-red-300'
                }`}>
                  <div className={`text-sm font-semibold mb-2 ${
                    myRoundScore.isCorrect ? 'text-green-900' : 'text-red-900'
                  }`}>
                    Your Answer: {myRoundScore.isCorrect ? '✓' : '✗'}
                  </div>
                  <div className={`text-lg ${
                    myRoundScore.isCorrect ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {Array.isArray(selectedAnswer) ? (
                      <div className="space-y-1">
                        {selectedAnswer.map((ans, idx) => (
                          <div key={idx}>• {ans}</div>
                        ))}
                      </div>
                    ) : (
                      <div className="font-semibold">{selectedAnswer}</div>
                    )}
                  </div>
                </div>
              )}

              {!myRoundScore.isCorrect && currentScenario && (
                <div className="p-4 bg-green-50 border-2 border-green-300 rounded-lg">
                  <div className="text-sm font-semibold text-green-900 mb-2">
                    Correct Answer:
                  </div>
                  <div className="text-lg text-green-800">
                    {Array.isArray(currentScenario.correctAnswers) ? (
                      <div className="space-y-1">
                        {currentScenario.correctAnswers.map((ans, idx) => (
                          <div key={idx}>• {ans}</div>
                        ))}
                      </div>
                    ) : currentScenario.correctAnswer ? (
                      <div className="font-semibold">{currentScenario.correctAnswer}</div>
                    ) : null}
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="text-sm text-gray-600 mb-1">Round Score</div>
                <div className={`text-3xl font-bold ${myRoundScore.score > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {myRoundScore.score > 0 ? '+' : ''}{myRoundScore.score}
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="text-sm text-gray-600 mb-1">Total Score</div>
                <div className="text-3xl font-bold text-blue-600">
                  {team.score}
                </div>
              </div>
            </div>

            <div className="text-center text-gray-600">
              <p>You answered in <span className="font-semibold">{myRoundScore.timeToAnswer}s</span></p>
              {myRoundScore.timeToAnswer <= 30 && myRoundScore.isCorrect && (
                <p className="text-green-600 font-semibold mt-2">
                  ⚡ Speed Bonus: +5 points
                </p>
              )}
            </div>
          </div>
        )}

        {/* Leaderboard During Results */}
        {gameState.showAnswer && gameState.teams.length > 0 && (
          <div className="mt-6 bg-white rounded-lg p-6 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              Current Standings
            </h3>
            <div className="space-y-3">
              {[...gameState.teams]
                .sort((a, b) => b.score - a.score)
                .map((t, index) => {
                  const isMyTeam = t.id === team.id;
                  const colorMap = {
                    'team-blue': 'bg-blue-500',
                    'team-green': 'bg-green-500',
                    'team-purple': 'bg-purple-500',
                    'team-orange': 'bg-orange-500',
                  };
                  const colorClass = colorMap[t.color] || 'bg-gray-500';

                  return (
                    <div
                      key={t.id}
                      className={`flex items-center justify-between p-4 rounded-lg ${
                        isMyTeam ? 'ring-4 ring-yellow-400' : ''
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 ${colorClass} rounded-full flex items-center justify-center text-white font-bold text-xl`}>
                          #{index + 1}
                        </div>
                        <div className="text-lg font-semibold">
                          {t.name}
                          {isMyTeam && <span className="ml-2 text-yellow-600">★</span>}
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-gray-800">
                        {t.score}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Team;
