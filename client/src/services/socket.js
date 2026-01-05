import { io } from 'socket.io-client';

// Use environment variable for production, fallback to localhost for development
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3001';

class SocketService {
  constructor() {
    this.socket = null;
    this.listeners = new Map();
  }

  connect() {
    if (this.socket?.connected) {
      return this.socket;
    }

    this.socket = io(SOCKET_URL, {
      transports: ['websocket'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5
    });

    this.socket.on('connect', () => {
      console.log('Connected to server');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    this.socket.on('connect_error', (error) => {
      console.error('Connection error:', error);
    });

    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  // Team actions
  joinTeam(teamName) {
    return new Promise((resolve, reject) => {
      if (!this.socket) {
        reject(new Error('Socket not connected'));
        return;
      }

      this.socket.emit('join-team', { name: teamName });

      this.socket.once('team-joined', (teamData) => {
        resolve(teamData);
      });

      setTimeout(() => reject(new Error('Join timeout')), 5000);
    });
  }

  submitAnswer(answer) {
    if (!this.socket) {
      throw new Error('Socket not connected');
    }

    return new Promise((resolve, reject) => {
      this.socket.emit('submit-answer', { answer });

      this.socket.once('answer-submitted', (response) => {
        resolve(response);
      });

      setTimeout(() => reject(new Error('Submit timeout')), 5000);
    });
  }

  // Presenter actions
  joinPresenter() {
    return new Promise((resolve, reject) => {
      if (!this.socket) {
        reject(new Error('Socket not connected'));
        return;
      }

      this.socket.emit('join-presenter');

      this.socket.once('presenter-joined', (gameState) => {
        resolve(gameState);
      });

      setTimeout(() => reject(new Error('Join timeout')), 5000);
    });
  }

  startRound(roundData) {
    if (!this.socket) {
      throw new Error('Socket not connected');
    }
    this.socket.emit('start-round', roundData);
  }

  togglePause() {
    if (!this.socket) {
      throw new Error('Socket not connected');
    }
    this.socket.emit('toggle-pause');
  }

  stopTimer() {
    if (!this.socket) {
      throw new Error('Socket not connected');
    }
    this.socket.emit('stop-timer');
  }

  revealAnswer(correctAnswerData) {
    if (!this.socket) {
      throw new Error('Socket not connected');
    }
    this.socket.emit('reveal-answer', correctAnswerData);
  }

  endRound() {
    if (!this.socket) {
      throw new Error('Socket not connected');
    }
    this.socket.emit('end-round');
  }

  resetGame() {
    if (!this.socket) {
      throw new Error('Socket not connected');
    }
    this.socket.emit('reset-game');
  }

  getState() {
    if (!this.socket) {
      throw new Error('Socket not connected');
    }
    this.socket.emit('get-state');
  }

  // Event listeners
  on(event, callback) {
    if (!this.socket) {
      console.warn('Socket not connected');
      return;
    }

    this.socket.on(event, callback);

    // Store listener for cleanup
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(callback);
  }

  off(event, callback) {
    if (!this.socket) {
      return;
    }

    if (callback) {
      this.socket.off(event, callback);

      // Remove from listeners map
      const eventListeners = this.listeners.get(event);
      if (eventListeners) {
        const index = eventListeners.indexOf(callback);
        if (index > -1) {
          eventListeners.splice(index, 1);
        }
      }
    } else {
      this.socket.off(event);
      this.listeners.delete(event);
    }
  }

  removeAllListeners() {
    if (this.socket) {
      this.socket.removeAllListeners();
      this.listeners.clear();
    }
  }
}

// Export singleton instance
export const socketService = new SocketService();
export default socketService;
