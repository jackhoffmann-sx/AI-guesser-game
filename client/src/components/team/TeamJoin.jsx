import { useState } from 'react';

function TeamJoin({ onJoin }) {
  const [teamName, setTeamName] = useState('');
  const [isJoining, setIsJoining] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!teamName.trim()) {
      alert('Please enter a team name');
      return;
    }

    setIsJoining(true);
    try {
      await onJoin(teamName.trim());
    } catch (error) {
      setIsJoining(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">👥</div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Join as a Team
            </h1>
            <p className="text-gray-600">
              Enter your team name to start playing
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="teamName"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Team Name
              </label>
              <input
                type="text"
                id="teamName"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="Enter your team name"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all text-lg"
                disabled={isJoining}
                autoFocus
              />
            </div>

            <button
              type="submit"
              disabled={isJoining || !teamName.trim()}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-bold py-4 px-6 rounded-lg transition-colors text-lg disabled:cursor-not-allowed"
            >
              {isJoining ? 'Joining...' : 'Join Game'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 text-center">
              Make sure the presenter has started the game session
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamJoin;
