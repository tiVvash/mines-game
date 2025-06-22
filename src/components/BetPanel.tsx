import "./BetPanel.css";

type BetPanelProps = {
    isPlaying: boolean;
    betAmount: number;
    setBetAmount: (amount: number) => void;
    multiplier: number;
    onStartGame: () => void;
    onCashOut: () => void;
    gameEnded: boolean;
};

export default function BetPanel({
    isPlaying,
    betAmount,
    setBetAmount,
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

            <div className="betColLeft">
                <div className="betUSD">
                    <p>Bet, USD</p>
                    <span>{betAmount.toFixed(2)}</span>
                </div>
                <div className="incDecBtn" >

                    <button onClick={decreaseBet} disabled={isPlaying}>-</button>
                    <button onClick={increaseBet} disabled={isPlaying}>+</button>
                </div>

            </div>


            <div className="betButtons">
                {isPlaying ? (
                    <button className="cashout-btn" onClick={onCashOut}>Cash Out (${(betAmount * multiplier).toFixed(2)})</button>
                ) : (
                    <button
                        className="start-btn"
                        onClick={onStartGame}
                        disabled={gameEnded}
                    >
                        Bet
                    </button>
                )}
            </div>
        </div>
    );
}