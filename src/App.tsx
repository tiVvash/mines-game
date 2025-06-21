import { useState } from "react";
import "./App.css";
import BetPanel from "./components/BetPanel";
import Grid from "./components/Grid";

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [betAmount, setBetAmount] = useState(1);
  const [mines, setMines] = useState(3);
  const [balance, setBalance] = useState(1000);
  const [multiplier, setMultiplier] = useState(1);
  const [gameEnded, setGameEnded] = useState(false);
  const [isCashOut, setIsCashOut] = useState(false);

  const handleStartGame = () => {
    if (balance < betAmount) return;
    setIsPlaying(true);
    setBalance(prev => parseFloat((prev - betAmount).toFixed(2)));
  };

  const handleCashOut = () => {
    setBalance(prev => parseFloat((prev + betAmount * multiplier).toFixed(2)));
    setIsPlaying(false);
    setIsCashOut(true); // will trigger Grid useEffect
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
      <h1>Balance: ${balance.toFixed(2)}</h1>

      <BetPanel
        isPlaying={isPlaying}
        betAmount={betAmount}
        setBetAmount={setBetAmount}
        mines={mines}
        setMines={setMines}
        onStartGame={handleStartGame}
        onCashOut={handleCashOut}
        balance={balance}         
        multiplier={multiplier}     
        gameEnded={gameEnded}  
      />

      <Grid
        isPlaying={isPlaying}
        mines={mines}
        onGameOver={handleGameOver}
        multiplier={multiplier}
        setMultiplier={setMultiplier}
        betAmount={betAmount}
        gameEnded={gameEnded}
        isCashOut={isCashOut}
        resetGameEnded={resetGameEnded}
      />
    </div>
  );
}
