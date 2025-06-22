import { useState } from "react";
import "./App.css";
import BetPanel from "./components/BetPanel";
import Grid from "./components/Grid";
import TopBar from "./components/TopBar";
import { generateGrid } from "./utils/GenerateGrid";
import type { Tile } from "./utils/GenerateGrid";
import BetSettingsPanel from "./components/BetSettingsPanel";

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [betAmount, setBetAmount] = useState(1);
  const [mines, setMines] = useState(3);
  const [balance, setBalance] = useState(1000);
  const [multiplier, setMultiplier] = useState(1);
  const [gameEnded, setGameEnded] = useState(false);
  const [isCashOut, setIsCashOut] = useState(false);
  const [grid, setGrid] = useState<Tile[]>(generateGrid(5, mines));

  const handleStartGame = () => {
    if (balance < betAmount) return;
    setGrid(generateGrid(5, mines));
    setIsPlaying(true);
    setBalance(prev => parseFloat((prev - betAmount).toFixed(2)));
  };

  const handleCashOut = () => {
    setBalance(prev => parseFloat((prev + betAmount * multiplier).toFixed(2)));
    setIsPlaying(false);
    setIsCashOut(true);
    setMultiplier(1);
  };

  const handleGameOver = () => {
    setIsPlaying(false);
    setGameEnded(true);
  };

  const resetGameEnded = () => {
    setGameEnded(false);
    setIsCashOut(false);
  };

  return (
    <div className="App">
      <TopBar
        balance={balance} />
      <BetSettingsPanel multiplier={multiplier}
        mines={mines}
        setMines={setMines} isPlaying={isPlaying} />

      <Grid
        grid={grid}
        setGrid={setGrid}
        isPlaying={isPlaying}
        mines={mines}
        onGameOver={handleGameOver}
        setMultiplier={setMultiplier}
        gameEnded={gameEnded}
        isCashOut={isCashOut}
        resetGameEnded={resetGameEnded}
      />

      <BetPanel
        isPlaying={isPlaying}
        betAmount={betAmount}
        setBetAmount={setBetAmount}
        onStartGame={handleStartGame}
        onCashOut={handleCashOut}
        multiplier={multiplier}
        gameEnded={gameEnded}

      />
    </div>
  );
}
