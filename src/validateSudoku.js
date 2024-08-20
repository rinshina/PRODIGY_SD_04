
export function isValidSudoku(board) {
    const N = 9;
    
    function isUnique(arr) {
        const nums = arr.filter(num => num > 0);
        return nums.length === new Set(nums).size;
    }

    for (let i = 0; i < N; i++) {
        // Check rows
        if (!isUnique(board[i])) return false;
        
        // Check columns
        const col = board.map(row => row[i]);
        if (!isUnique(col)) return false;
        
        // Check 3x3 subgrids
        const startRow = 3 * Math.floor(i / 3);
        const startCol = 3 * (i % 3);
        const grid = [];
        for (let r = startRow; r < startRow + 3; r++) {
            for (let c = startCol; c < startCol + 3; c++) {
                grid.push(board[r][c]);
            }
        }
        if (!isUnique(grid)) return false;
    }
    
    return true;
}
