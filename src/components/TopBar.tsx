import { useState } from "react"
import './TopBar.css'
export default function TopBar() {
    const [showInstructions, setShowInstructions] = useState(false);
    return (
        <div className='TopBarContainer'>
            <div className=''>
                <select name="mines" id="mines.id">
                    <option value="Dice">Dice</option>
                </select>
                <button className="InstructionButton" onClick={() => setShowInstructions(!showInstructions)}>How To Play?</button>
                {showInstructions && (
                    <div className="instructionsBox">
                        <div>
                            <h3>How to Play</h3>
                            <button>X</button>
                        </div>
                        <div>
                            <p>Each tile hides either a star or a mine.</p>
                            <p>Increase a total number of stars for bigger odds and higher rewards. You can cash out after each turn, or try for increased winnings.</p>
                        </div>
                    </div>
                )}
            </div>
            <div className=''></div>
        </div>
    )
}