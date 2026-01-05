import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            AI Detective
          </h1>
          <p className="text-2xl md:text-3xl text-white/90 mb-2">
            Spot the Hallucination
          </p>
          <p className="text-lg text-white/80">
            Interactive AI Critical Thinking Game
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <button
            onClick={() => navigate('/presenter')}
            className="bg-white hover:bg-gray-50 text-gray-900 rounded-xl p-8 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
          >
            <div className="text-6xl mb-4">🎮</div>
            <h2 className="text-3xl font-bold mb-3">Presenter</h2>
            <p className="text-gray-600 text-lg">
              Control the game flow, manage rounds, and display to projector
            </p>
          </button>

          <button
            onClick={() => navigate('/team')}
            className="bg-white hover:bg-gray-50 text-gray-900 rounded-xl p-8 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
          >
            <div className="text-6xl mb-4">👥</div>
            <h2 className="text-3xl font-bold mb-3">Team</h2>
            <p className="text-gray-600 text-lg">
              Join as a team to answer questions and compete for points
            </p>
          </button>
        </div>

        <div className="mt-12 text-center text-white/80 text-sm">
          <p>5 Rounds • 90 Seconds Each • Compete for the Highest Score</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
