import { useState, useEffect } from 'react'
import { generateGrid } from '../utils/GenerateGrid';
import type { Tile } from '../utils/GenerateGrid';
import './Grid.css'


export default function Grid() {
    const [grid, setGrid] = useState<Tile[]>(generateGrid(5, 5));
    const [gameOver, setGameOver] = useState(false);
  

    useEffect(() => {
      if (gameOver) {
        const timer = setTimeout(() => {
          handleReset();
        }, 3000); 
    
        return () => clearTimeout(timer); 
      }
    }, [gameOver]);

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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 60px)', gap: '5px', padding: '20px', backgroundColor: '#077FCC'}}>
        {grid.map(tile => (
          <button
            key={tile.id}
            className="tile"
            style={{
              backgroundColor: tile.revealed
                ? tile.isMine
                ? 'tile tile-mine'
                : 'tile tile-safe'
              : 'tile tile-hidden'
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