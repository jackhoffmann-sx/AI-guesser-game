import { useState, useEffect } from 'react';
import socketService from '../../services/socket';
import { gameData } from '../../data/gameData';
import Timer from '../shared/Timer';
import Scoreboard from '../shared/Scoreboard';
import ScenarioDisplay from './ScenarioDisplay';
import ControlPanel from './ControlPanel';

function Presenter() {
  const [connected, setConnected] = useState(false);
  const [gameState, setGameState] = useState({
    currentRound: 0,
    currentScenario: 0,
    timeRemaining: 90,
    isActive: false,
    isPaused: false,
    showAnswer: false,
    teams: []
  });
  const [showExplanation, setShowExplanation] = useState(false);
  const [roundScores, setRoundScores] = useState({});

  useEffect(() => {
    // Connect to socket
    socketService.connect();

    // Join as presenter
    socketService.joinPresenter()
      .then((state) => {
        setConnected(true);
        setGameState(state);
      })
      .catch((error) => {
        console.error('Failed to join as presenter:', error);
      });

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
        isPaused: false
      }));
      setShowExplanation(false);
      setRoundScores({});
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
      setShowExplanation(true);
      setRoundScores(data.roundScores);
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
      setShowExplanation(false);
      setRoundScores({});
    });

    socketService.on('game-reset', (state) => {
      setGameState(state);
      setShowExplanation(false);
      setRoundScores({});
    });

    socketService.on('team-submitted', (data) => {
      console.log(`${data.teamName} submitted an answer`);
    });

    return () => {
      socketService.removeAllListeners();
    };
  }, []);

  const handleStartRound = (roundIndex, scenarioIndex = 0) => {
    const round = gameData.rounds[roundIndex];
    if (!round) return;

    const duration = round.duration || 90;

    socketService.startRound({
      round: roundIndex + 1,
      scenario: scenarioIndex,
      duration
    });
  };

  const handleTogglePause = () => {
    socketService.togglePause();
  };

  const handleRevealAnswer = () => {
    const round = gameData.rounds[gameState.currentRound - 1];
    if (!round) return;

    let correctAnswerData;

    if (round.type === 'real-world') {
      // For multi-question rounds, we'd need to handle this differently
      // For now, just handle single scenario rounds
      return;
    }

    const scenario = round.scenarios?.[gameState.currentScenario];
    if (!scenario) return;

    if (round.type === 'red-flags') {
      correctAnswerData = {
        correctAnswer: scenario.correctAnswers,
        explanation: scenario.explanation,
        points: scenario.points
      };
    } else {
      correctAnswerData = {
        correctAnswer: scenario.correctAnswer,
        explanation: scenario.explanation,
        points: scenario.points
      };
    }

    socketService.revealAnswer(correctAnswerData);
  };

  const handleNextScenario = () => {
    const round = gameData.rounds[gameState.currentRound - 1];
    if (!round) return;

    const nextScenario = gameState.currentScenario + 1;

    if (nextScenario < round.scenarios.length) {
      handleStartRound(gameState.currentRound - 1, nextScenario);
    } else {
      // Round complete
      socketService.endRound();
    }
  };

  const handleEndRound = () => {
    // Stop the timer and lock answers, but don't end the round
    // This allows presenter to still reveal answers
    socketService.stopTimer();
  };

  const handleResetGame = () => {
    if (confirm('Are you sure you want to reset the game? All scores will be lost.')) {
      socketService.resetGame();
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

  if (!connected) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Connecting to server...</p>
        </div>
      </div>
    );
  }

  const currentRound = getCurrentRound();
  const currentScenario = getCurrentScenario();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            AI Detective - Presenter View
          </h1>
          <p className="text-gray-600">
            Control the game flow and display content to teams
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Timer */}
            <Timer
              timeRemaining={gameState.timeRemaining}
              isActive={gameState.isActive}
              isPaused={gameState.isPaused}
            />

            {/* Scenario Display */}
            {currentRound && currentScenario && (
              <ScenarioDisplay
                round={currentRound}
                scenario={currentScenario}
                showAnswer={showExplanation}
                roundScores={roundScores}
              />
            )}

            {!currentRound && (
              <div className="bg-white rounded-lg p-12 shadow-lg text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Welcome to AI Detective!
                </h2>
                <p className="text-xl text-gray-600 mb-6">
                  Select a round from the control panel to begin
                </p>
                <p className="text-gray-500">
                  Teams: {gameState.teams.length} joined
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Scoreboard */}
            <Scoreboard teams={gameState.teams} compact={true} />

            {/* Control Panel */}
            <ControlPanel
              currentRound={gameState.currentRound}
              currentScenario={gameState.currentScenario}
              isActive={gameState.isActive}
              isPaused={gameState.isPaused}
              showAnswer={showExplanation}
              onStartRound={handleStartRound}
              onTogglePause={handleTogglePause}
              onRevealAnswer={handleRevealAnswer}
              onNextScenario={handleNextScenario}
              onEndRound={handleEndRound}
              onResetGame={handleResetGame}
              gameData={gameData}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Presenter;
