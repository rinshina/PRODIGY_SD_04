export function findUnsolvableCells(board) {
    const invalidCells = [];
    const invalidRows = new Set();
    const invalidCols = new Set();
    const invalidSubgrids = new Set();
    const N = 9;

    function isUnique(arr) {
        const nums = arr.filter(num => num > 0);
        return nums.length === new Set(nums).size;
    }

    // Check rows and mark invalid cells
    for (let row = 0; row < N; row++) {
        const rowValues = board[row];
        if (!isUnique(rowValues)) {
            invalidRows.add(row);
            for (let col = 0; col < N; col++) {
                if (rowValues.filter(num => num === rowValues[col]).length > 1) {
                    invalidCells.push([row, col]);
                }
            }
        }
    }

    // Check columns and mark invalid cells
    for (let col = 0; col < N; col++) {
        const colValues = board.map(row => row[col]);
        if (!isUnique(colValues)) {
            invalidCols.add(col);
            for (let row = 0; row < N; row++) {
                if (colValues.filter(num => num === colValues[row]).length > 1) {
                    invalidCells.push([row, col]);
                }
            }
        }
    }

    // Check 3x3 subgrids and mark invalid cells
    for (let startRow = 0; startRow < N; startRow += 3) {
        for (let startCol = 0; startCol < N; startCol += 3) {
            const grid = [];
            for (let r = startRow; r < startRow + 3; r++) {
                for (let c = startCol; c < startCol + 3; c++) {
                    grid.push([r, c, board[r][c]]);
                }
            }
            const gridValues = grid.map(([r, c, num]) => num);
            if (!isUnique(gridValues)) {
                const subgridIndex = (startRow / 3) * 3 + (startCol / 3);
                invalidSubgrids.add(subgridIndex);
                grid.forEach(([r, c]) => {
                    if (gridValues.filter(num => num === board[r][c]).length > 1) {
                        invalidCells.push([r, c]);
                    }
                });
            }
        }
    }

    // Remove duplicates from invalidCells
    const uniqueInvalidCells = [...new Set(invalidCells.map(cell => cell.toString()))].map(cell => cell.split(',').map(Number));

    return { uniqueInvalidCells, invalidRows, invalidCols, invalidSubgrids };
}
