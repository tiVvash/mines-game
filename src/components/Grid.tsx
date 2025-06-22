import { useEffect, useState } from "react";
import { generateGrid } from "../utils/GenerateGrid";
import type { Tile } from "../utils/GenerateGrid";
import { FaStar } from 'react-icons/fa';
import './Grid.css'

type GridProps = {
  isPlaying: boolean;
  mines: number;
  onGameOver: () => void;
  setMultiplier: React.Dispatch<React.SetStateAction<number>>;
  gameEnded: boolean;
  isCashOut: boolean;
  resetGameEnded: () => void;
  grid: Tile[];
  setGrid: React.Dispatch<React.SetStateAction<Tile[]>>;
};

export default function Grid({
  isPlaying,
  mines,
  onGameOver,
  setMultiplier,
  gameEnded,
  isCashOut,
  resetGameEnded,
  grid,
  setGrid,
}: GridProps) {

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

    setMultiplier(prev => parseFloat((prev + 0.2).toFixed(2)));
  };


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


  useEffect(() => {
    if (isCashOut) {
      setRevealAll(true);

      const timer = setTimeout(() => {
        setRevealAll(false);
        setGameOver(false);
        setGrid(generateGrid(5, mines));
        setMultiplier(1);
        resetGameEnded();
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [isCashOut, resetGameEnded, setMultiplier, mines]);

  return (
    <div className="GridContainer">
      <div className="grid">
        {grid.map(tile => (
          <button
            key={tile.id}
            className={`tile ${revealAll || tile.revealed
              ? tile.isMine
                ? "revealed-mine"
                : "revealed-safe"
              : ""
              }`}
            onClick={() => handleTileClick(tile.id)}
          >
            {revealAll || tile.revealed ? (tile.isMine ? "💣" : <FaStar color="white" size={20} />) : ""}
          </button>

        ))}
      </div>
    </div>
  );
}
