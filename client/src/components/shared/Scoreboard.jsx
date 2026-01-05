function Scoreboard({ teams, compact = false }) {
  const sortedTeams = [...teams].sort((a, b) => b.score - a.score);

  const getColorClass = (color) => {
    const colorMap = {
      'team-blue': 'bg-blue-500 border-blue-600',
      'team-green': 'bg-green-500 border-green-600',
      'team-purple': 'bg-purple-500 border-purple-600',
      'team-orange': 'bg-orange-500 border-orange-600',
    };
    return colorMap[color] || 'bg-gray-500 border-gray-600';
  };

  const getMedalEmoji = (index) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return '';
  };

  if (compact) {
    return (
      <div className="bg-white rounded-lg p-4 shadow-lg">
        <h3 className="text-xl font-bold mb-3 text-gray-800">Team Scores</h3>
        <div className="flex flex-wrap gap-3">
          {sortedTeams.map((team, index) => (
            <div
              key={team.id}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white border-2 ${getColorClass(
                team.color
              )}`}
            >
              <span className="text-lg">{getMedalEmoji(index)}</span>
              <span className="font-semibold">{team.name}</span>
              <span className="font-bold">{team.score} pts</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Leaderboard
      </h2>
      <div className="space-y-4">
        {sortedTeams.map((team, index) => (
          <div
            key={team.id}
            className={`flex items-center justify-between p-4 rounded-lg border-2 text-white ${getColorClass(
              team.color
            )}`}
          >
            <div className="flex items-center gap-4">
              <div className="text-3xl font-bold w-12 text-center">
                {getMedalEmoji(index) || `#${index + 1}`}
              </div>
              <div>
                <div className="text-2xl font-bold">{team.name}</div>
              </div>
            </div>
            <div className="text-4xl font-bold">{team.score}</div>
          </div>
        ))}

        {teams.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            No teams have joined yet
          </div>
        )}
      </div>
    </div>
  );
}

export default Scoreboard;
