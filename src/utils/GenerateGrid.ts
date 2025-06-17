export interface Tile {
    id: number;
    isMine: boolean;
    revealed: boolean;
}

export function generateGrid(gridSize = 5, mineCount = 5): Tile[] {
    const totalTiles = gridSize * gridSize;
    const grid: Tile[] = [];

    for (let i = 0; i < totalTiles; i++) {
        grid.push({
            id: i,
            isMine: false,
            revealed: false
        });
    }

    let minesPlaced = 0;
    while (minesPlaced < mineCount) {
        const index = Math.floor(Math.random() * totalTiles);
        if (!grid[index].isMine) {
            grid[index].isMine = true;
            minesPlaced++;
        }
    }

    return grid;
}