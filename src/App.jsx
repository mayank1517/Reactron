import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Leaderboard from "./Leaderboard";

import "./index.css";

const getRandomPosition = () => ({
  top: `${Math.random() * 80 + 10}%`,
  left: `${Math.random() * 80 + 10}%`,
});

function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(
    () => localStorage.getItem("bestScore") || 0
  );
  const [position, setPosition] = useState(getRandomPosition());
  const [round, setRound] = useState(1);
  const [timeLeft, setTimeLeft] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [round, isPaused]);

  useEffect(() => {
    if (timeLeft === 0) {
      if (score > bestScore) {
        localStorage.setItem("bestScore", score);
        setBestScore(score);
      }
    }
  }, [timeLeft]);

  const handleClick = () => {
    setScore((prev) => prev + 1);
    setRound((prev) => prev + 1);
    setTimeLeft(Math.max(1, 3 - round * 0.2));
    setPosition(getRandomPosition());
  };

  const restartGame = () => {
    setScore(0);
    setRound(1);
    setTimeLeft(3);
    setPosition(getRandomPosition());
    setIsPaused(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center relative overflow-hidden">
      <h1 className="text-3xl font-bold mb-4">⚡ Reaction Speed Game</h1>
      <div className="mb-2">
        Score: {score} | Best: {bestScore}
      </div>
      <div className="mb-2">Time Left: {timeLeft}s</div>
      <div className="mb-4">Round: {round}</div>
      <Leaderboard currentScore={score} />
      {timeLeft > 0 && !isPaused && (
        <motion.div
          className="w-16 h-16 bg-green-500 rounded-full absolute cursor-pointer shadow-lg"
          style={{ position: "absolute", ...position }}
          onClick={handleClick}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        />
      )}
      {timeLeft === 0 && (
        <div className="text-xl font-semibold mt-4">Game Over</div>
      )}
      <div className="mt-6 flex gap-4">
        <button
          onClick={restartGame}
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Restart
        </button>
        <button
          onClick={() => setIsPaused((prev) => !prev)}
          className="bg-yellow-500 px-4 py-2 rounded hover:bg-yellow-600 transition"
        >
          {isPaused ? "Resume" : "Pause"}
        </button>
      </div>
    </div>
  );
}

export default App;
