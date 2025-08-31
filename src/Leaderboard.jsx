const mockLeaderboard = [
  { name: "Mayank", score: 42 },
  { name: "Aarav", score: 35 },
  { name: "Isha", score: 30 },
  { name: "Dev", score: 28 },
  { name: "Tara", score: 25 },
];

export default function Leaderboard() {
  return (
    <div className="mt-8 bg-gray-800 p-4 rounded w-64">
      <h2 className="text-lg font-bold mb-2">🏆 Leaderboard</h2>
      <ul>
        {mockLeaderboard.map((player, i) => (
          <li
            key={i}
            className="flex justify-between py-1 border-b border-gray-700"
          >
            <span>{player.name}</span>
            <span>{player.score}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
