import { isValidSudoku } from './validateSudoku';

export function solveSudoku(board) {
    const solvedBoard = board.map(row => row.slice());
    const invalidCells = [];

    if (solve(solvedBoard, invalidCells) && isValidSudoku(solvedBoard)) {
        return { board: solvedBoard, invalidCells };
    } else {
        return { board: null, invalidCells };
    }
}

function solve(board, invalidCells) {
    const emptySpot = findEmptySpot(board);
    if (!emptySpot) return true; // No empty spot, solution found

    const [row, col] = emptySpot;
    for (let num = 1; num <= 9; num++) {
        if (isValid(board, row, col, num)) {
            board[row][col] = num;
            if (solve(board, invalidCells)) return true;
            board[row][col] = 0; // Reset on backtrack
        }
    }
    return false; // Trigger backtrack
}

function findEmptySpot(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) return [row, col];
        }
    }
    return null;
}

function isValid(board, row, col, num) {
    // Check row
    for (let i = 0; i < 9; i++) {
        if (board[row][i] === num) return false;
    }

    // Check column
    for (let i = 0; i < 9; i++) {
        if (board[i][col] === num) return false;
    }

    // Check 3x3 sub-grid
    const startRow = row - (row % 3);
    const startCol = col - (col % 3);
    for (let i = startRow; i < startRow + 3; i++) {
        for (let j = startCol; j < startCol + 3; j++) {
            if (board[i][j] === num) return false;
        }
    }

    return true;
}
