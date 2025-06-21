import { useEffect, useState } from "react";
import { generateGrid } from "../utils/GenerateGrid";
import type { Tile } from "../utils/GenerateGrid";

type GridProps = {
  isPlaying: boolean;
  mines: number;
  onGameOver: () => void;
  multiplier: number;
  setMultiplier: React.Dispatch<React.SetStateAction<number>>;
  betAmount: number;
  gameEnded: boolean;
  isCashOut: boolean;
  resetGameEnded: () => void;
};

export default function Grid({
  isPlaying,
  mines,
  onGameOver,
  multiplier,
  setMultiplier,
  betAmount,
  gameEnded,
  isCashOut,
  resetGameEnded,
}: GridProps) {
  const [grid, setGrid] = useState<Tile[]>(generateGrid(5, mines));;
  const [gameOver, setGameOver] = useState(false);
  const [revealAll, setRevealAll] = useState(false);

  const handleTileClick = (id: number) => {
    if (gameOver || !isPlaying) return;

    setGrid(prevGrid =>
      prevGrid.map(tile => {
        if (tile.id === id && !tile.revealed) {
          if (tile.isMine) {
            setGameOver(true);
            onGameOver();
          }
          return { ...tile, revealed: true };
        }
        return tile;
      })
    );

    // Increase multiplier when clicking safe tile
    setMultiplier(prev => parseFloat((prev + 0.2).toFixed(2)));
  };

  // Game Over (lost)
  useEffect(() => {
    if (gameEnded && !isCashOut) {
      setRevealAll(true);

      const timer = setTimeout(() => {
        setRevealAll(false);
        setGameOver(false);
        setGrid(generateGrid(5, mines));
        setMultiplier(1);
        resetGameEnded();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [gameEnded, isCashOut, resetGameEnded, setMultiplier, mines]);

  // Cash Out (instant reset)
  useEffect(() => {
    if (isCashOut) {
      setRevealAll(true);

      const timer = setTimeout(() => {
        setRevealAll(false);
        setGameOver(false);
        setGrid(generateGrid(5, mines));
        setMultiplier(1);
        resetGameEnded();
      }, 300); // short delay

      return () => clearTimeout(timer);
    }
  }, [isCashOut, resetGameEnded, setMultiplier, mines]);

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 60px)",
          gap: "5px",
          padding: "20px",
        }}
      >
        {grid.map(tile => (
          <button
            key={tile.id}
            className="tile"
            style={{
              backgroundColor:
                revealAll || tile.revealed
                  ? tile.isMine
                    ? "crimson"
                    : "seagreen"
                  : "gray",
            }}
            onClick={() => handleTileClick(tile.id)}
          >
            {revealAll || tile.revealed ? (tile.isMine ? "💣" : "✅") : ""}
          </button>
        ))}
      </div>
    </>
  );
}
