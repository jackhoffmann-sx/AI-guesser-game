const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);

// Allowed origins for CORS
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175',
  'http://localhost:5176',
  // Add your production URLs here:
  // 'https://your-app.vercel.app',
  // 'https://your-custom-domain.com'
];

// Add environment variable for production origin if set
if (process.env.CLIENT_URL) {
  allowedOrigins.push(process.env.CLIENT_URL);
}

const io = new Server(server, {
  cors: {
    origin: function (origin, callback) {
      // Allow requests with no origin (mobile apps, Postman, etc.)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== 'production') {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Game state
let gameState = {
  currentRound: 0,
  currentScenario: 0,
  timeRemaining: 90,
  isActive: false,
  isPaused: false,
  showAnswer: false,
  teams: [],
  answers: {}
};

let timerInterval = null;

// Helper function to calculate score
function calculateScore(isCorrect, timeToAnswer, roundPoints = 10) {
  if (!isCorrect) return -5;

  const baseScore = roundPoints;
  const speedBonus = timeToAnswer <= 30 ? 5 : 0;

  return baseScore + speedBonus;
}

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  // Handle team joining
  socket.on('join-team', (teamData) => {
    const existingTeam = gameState.teams.find(t => t.name === teamData.name);

    if (existingTeam) {
      existingTeam.socketId = socket.id;
      socket.emit('team-joined', existingTeam);
    } else {
      const newTeam = {
        id: Date.now().toString(),
        name: teamData.name,
        socketId: socket.id,
        score: 0,
        answers: [],
        color: getTeamColor(gameState.teams.length)
      };
      gameState.teams.push(newTeam);
      socket.emit('team-joined', newTeam);
    }

    io.emit('game-state-update', getPublicGameState());
    console.log('Team joined:', teamData.name);
  });

  // Handle presenter joining
  socket.on('join-presenter', () => {
    socket.join('presenter');
    socket.emit('presenter-joined', gameState);
    console.log('Presenter joined');
  });

  // Start round
  socket.on('start-round', (roundData) => {
    gameState.currentRound = roundData.round;
    gameState.currentScenario = roundData.scenario || 0;
    gameState.timeRemaining = roundData.duration || 90;
    gameState.isActive = true;
    gameState.isPaused = false;
    gameState.showAnswer = false;
    gameState.answers = {};

    startTimer();

    io.emit('round-started', {
      round: gameState.currentRound,
      scenario: gameState.currentScenario,
      timeRemaining: gameState.timeRemaining
    });

    console.log(`Round ${gameState.currentRound} started`);
  });

  // Pause/Resume timer
  socket.on('toggle-pause', () => {
    gameState.isPaused = !gameState.isPaused;

    if (gameState.isPaused) {
      clearInterval(timerInterval);
    } else {
      startTimer();
    }

    io.emit('timer-toggled', { isPaused: gameState.isPaused });
  });

  // Stop timer (end round early)
  socket.on('stop-timer', () => {
    gameState.isActive = false;
    gameState.isPaused = false;
    clearInterval(timerInterval);

    io.emit('time-expired');
    console.log('Timer stopped by presenter');
  });

  // Submit answer
  socket.on('submit-answer', (answerData) => {
    const team = gameState.teams.find(t => t.socketId === socket.id);

    if (!team || !gameState.isActive) {
      return;
    }

    const timeToAnswer = 90 - gameState.timeRemaining;

    gameState.answers[team.id] = {
      teamId: team.id,
      answer: answerData.answer,
      timeToAnswer: timeToAnswer,
      timestamp: Date.now()
    };

    socket.emit('answer-submitted', { success: true });

    // Notify presenter that a team has submitted
    io.to('presenter').emit('team-submitted', {
      teamName: team.name,
      teamId: team.id
    });

    console.log(`Team ${team.name} submitted answer`);
  });

  // Reveal answer and calculate scores
  socket.on('reveal-answer', (correctAnswerData) => {
    gameState.showAnswer = true;
    gameState.isActive = false;
    clearInterval(timerInterval);

    // Calculate scores for this round
    const roundScores = {};

    Object.values(gameState.answers).forEach(answer => {
      const team = gameState.teams.find(t => t.id === answer.teamId);
      if (!team) return;

      let isCorrect = false;

      // Handle different answer types
      if (Array.isArray(correctAnswerData.correctAnswer)) {
        // Multiple correct answers (red flags round)
        const userAnswers = Array.isArray(answer.answer) ? answer.answer : [answer.answer];
        isCorrect = arraysEqual(userAnswers.sort(), correctAnswerData.correctAnswer.sort());
      } else {
        // Single correct answer
        isCorrect = answer.answer === correctAnswerData.correctAnswer;
      }

      const score = calculateScore(isCorrect, answer.timeToAnswer, correctAnswerData.points);
      team.score += score;

      roundScores[team.id] = {
        teamName: team.name,
        isCorrect,
        score,
        timeToAnswer: answer.timeToAnswer,
        totalScore: team.score
      };

      team.answers.push({
        round: gameState.currentRound,
        scenario: gameState.currentScenario,
        answer: answer.answer,
        isCorrect,
        score,
        timeToAnswer: answer.timeToAnswer
      });
    });

    io.emit('answer-revealed', {
      correctAnswer: correctAnswerData.correctAnswer,
      explanation: correctAnswerData.explanation,
      roundScores,
      teams: gameState.teams.map(t => ({
        id: t.id,
        name: t.name,
        score: t.score,
        color: t.color
      }))
    });

    console.log('Answer revealed, scores calculated');
  });

  // End round
  socket.on('end-round', () => {
    gameState.isActive = false;
    gameState.showAnswer = false;
    gameState.answers = {}; // Clear any submitted answers
    clearInterval(timerInterval);

    io.emit('round-ended', {
      currentRound: gameState.currentRound,
      currentScenario: gameState.currentScenario,
      teams: gameState.teams.map(t => ({
        id: t.id,
        name: t.name,
        score: t.score,
        color: t.color
      }))
    });

    console.log('Round ended');
  });

  // Reset game
  socket.on('reset-game', () => {
    gameState = {
      currentRound: 0,
      currentScenario: 0,
      timeRemaining: 90,
      isActive: false,
      isPaused: false,
      showAnswer: false,
      teams: gameState.teams.map(t => ({
        ...t,
        score: 0,
        answers: []
      })),
      answers: {}
    };

    clearInterval(timerInterval);

    io.emit('game-reset', getPublicGameState());
    console.log('Game reset');
  });

  // Get current state
  socket.on('get-state', () => {
    socket.emit('game-state-update', getPublicGameState());
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Timer function
function startTimer() {
  clearInterval(timerInterval);

  timerInterval = setInterval(() => {
    if (!gameState.isPaused && gameState.isActive) {
      gameState.timeRemaining--;

      io.emit('timer-update', { timeRemaining: gameState.timeRemaining });

      if (gameState.timeRemaining <= 0) {
        clearInterval(timerInterval);
        gameState.isActive = false;
        io.emit('time-expired');
        console.log('Time expired');
      }
    }
  }, 1000);
}

// Helper functions
function getTeamColor(index) {
  const colors = ['team-blue', 'team-green', 'team-purple', 'team-orange'];
  return colors[index % colors.length];
}

function arraysEqual(a, b) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

function getPublicGameState() {
  return {
    currentRound: gameState.currentRound,
    currentScenario: gameState.currentScenario,
    timeRemaining: gameState.timeRemaining,
    isActive: gameState.isActive,
    isPaused: gameState.isPaused,
    showAnswer: gameState.showAnswer,
    teams: gameState.teams.map(t => ({
      id: t.id,
      name: t.name,
      score: t.score,
      color: t.color
    }))
  };
}

// Basic health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', teams: gameState.teams.length });
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
