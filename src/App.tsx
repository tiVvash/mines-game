import { useState } from 'react'
import './App.css'
import { generateGrid } from './utils/GenerateGrid';
import type { Tile } from './utils/GenerateGrid';

function App() {
  const [grid, setGrid] = useState<Tile[]>(generateGrid(5, 5));
  const [gameOver, setGameOver] = useState(false);


  const handleTileClick = (id: number) => {
    if (gameOver) return;
    setGrid(prevGrid =>
      prevGrid.map(tile => {
        if (tile.id === id) {
          if (tile.isMine) {
            setGameOver(true);
          }

          return { ...tile, revealed: true };
        }
        return tile;
      })
    );
  };

  const handleReset = () => {
    const newGrid = generateGrid(5,5);
    setGrid(newGrid);
    setGameOver(false);
  }

  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 60px)', gap: '5px', padding: '20px' }}>
        {grid.map(tile => (
          <button
            key={tile.id}
            className="tile"
            style={{
              backgroundColor: tile.revealed
                ? tile.isMine
                  ? "crimson"
                  : "seagreen"
                : "gray",
            }}
            onClick={() => handleTileClick(tile.id)}
          >
            {tile.revealed ? (tile.isMine ? "💣" : "✅") : ""}
          </button>
        ))}
      </div>
      <button onClick={handleReset}>Reset</button>
    </>
  );
}

export default App
