import './BetSettingsPannel.css'

type BetSettingsPanelProps = {
    multiplier: number;
    mines: number;
    setMines: (mines: number) => void;
    isPlaying: boolean;
}
export default function BetSettingsPanel({ isPlaying, multiplier,    mines,
    setMines, }: BetSettingsPanelProps) {
    return (
        <div className="BetSettingsContainer">
            <p>Multiplier: {multiplier.toFixed(2)}x</p>
            <div className="ColRight">
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
        </div>
    )
}