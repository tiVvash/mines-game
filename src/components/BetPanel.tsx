import React from "react";
import "./BetPanel.css";

type BetPanelProps = {
    balance: number;
    isPlaying: boolean;
    betAmount: number;
    setBetAmount: (amount: number) => void;
    mines: number;
    setMines: (mines: number) => void;
    multiplier: number;
    onStartGame: () => void;
    onCashOut: () => void;
    gameEnded: boolean;
  };
  
  export default function BetPanel({
    balance,
    isPlaying,
    betAmount,
    setBetAmount,
    mines,
    setMines,
    multiplier,
    onStartGame,
    onCashOut,
    gameEnded,
  }: BetPanelProps) {
    const increaseBet = () => {
        setBetAmount(parseFloat((betAmount + 0.1).toFixed(2)));
    };

    const decreaseBet = () => {
        setBetAmount(Math.max(0.1, parseFloat((betAmount - 0.1).toFixed(2))));
    };

    return (
        <div className="BetContainer">
          <div>
            <p>Balance: ${balance.toFixed(2)}</p>
          </div>
    
          <div className="betColLeft">
            <p>Bet, USD</p>
            <div className="bet-input">
              <button onClick={decreaseBet} disabled={isPlaying}>-</button>
              <span>{betAmount.toFixed(2)}</span>
              <button onClick={increaseBet} disabled={isPlaying}>+</button>
            </div>
          </div>
    
          <div className="betColRight">
            <p>Mines</p>
            <select
              value={mines}
              onChange={(e) => setMines(Number(e.target.value))}
              disabled={isPlaying}
            >
              {Array.from({ length: 24 }, (_, i) => i + 1).map((num) => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
    
          <div className="betButtons">
            {isPlaying ? (
              <button className="cashout-btn" onClick={onCashOut}>Cash Out (${(betAmount * multiplier).toFixed(2)})</button>
            ) : (
              <button 
                className="start-btn" 
                onClick={onStartGame}
                disabled={gameEnded} // block start if game is resetting
              >
                Start Game
              </button>
            )}
          </div>
        </div>
      );
    }