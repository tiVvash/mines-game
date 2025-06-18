import { useState } from "react"


export default function BetPanel () {
const [isPlying, setIsPlaying] = useState(false);
const [betAmount, setBetAmount] = useState(1);
const [mines, setMines] = useState(3)
    return (
        <div>
            <input type="number"></input>
            <button>Bet</button>
        </div>
    )
}