import React, { useState } from 'react';
import { solveSudoku } from './solver';
import { findUnsolvableCells } from './findUnsolvableCells';
import './SudokuBoard.css';

const SudokuBoard = () => {
    const initialBoard = Array(9).fill(null).map(() => Array(9).fill(0));
    const [board, setBoard] = useState(initialBoard);
    const [message, setMessage] = useState('');
    const [invalidCells, setInvalidCells] = useState([]);
    const [invalidRows, setInvalidRows] = useState(new Set());
    const [invalidCols, setInvalidCols] = useState(new Set());
    const [invalidSubgrids, setInvalidSubgrids] = useState(new Set());

    const handleChange = (row, col, value) => {
        const newBoard = board.map(r => r.slice());
        newBoard[row][col] = value ? parseInt(value, 10) : 0;
        setBoard(newBoard);
    };

    const handleSolve = () => {
        const result = solveSudoku(board.map(row => row.slice()));
        if (result.board) {
            setBoard(result.board);
            const { uniqueInvalidCells, invalidRows, invalidCols, invalidSubgrids } = findUnsolvableCells(result.board);
            setInvalidCells(uniqueInvalidCells);
            setInvalidRows(invalidRows);
            setInvalidCols(invalidCols);
            setInvalidSubgrids(invalidSubgrids);
            setMessage('Sudoku is correct!!!');
        } else {
            const { uniqueInvalidCells, invalidRows, invalidCols, invalidSubgrids } = findUnsolvableCells(board);
            setInvalidCells(uniqueInvalidCells);
            setInvalidRows(invalidRows);
            setInvalidCols(invalidCols);
            setInvalidSubgrids(invalidSubgrids);
            setMessage('Sudoku is incorrect or unsolvable!!!');
        }
    };

    return (
        <div className="app">
            <h1>Sudoku Solver</h1>
            <p>{message}</p>
            <table className="sudoku-board">
                <tbody>
                    {board.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cell, colIndex) => {
                                const isInvalidCell = invalidCells.some(([r, c]) => r === rowIndex && c === colIndex);
                                const isInvalidRow = invalidRows.has(rowIndex);
                                const isInvalidCol = invalidCols.has(colIndex);
                                const subgridIndex = Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3);
                                const isInvalidSubgrid = invalidSubgrids.has(subgridIndex);

                                return (
                                    <td
                                        key={colIndex}
                                        className={`cell ${isInvalidCell ? 'invalid-cell' : ''} ${isInvalidRow ? 'invalid-row' : ''} ${isInvalidCol ? 'invalid-col' : ''} ${isInvalidSubgrid ? 'invalid-subgrid' : ''}`}
                                    >
                                        <input
                                            type="number"
                                            value={cell || ''}
                                            min="1"
                                            max="9"
                                            onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
                                        />
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="button-container">
                <button onClick={handleSolve}>Solve</button>
            </div>
        </div>
    );
};

export default SudokuBoard;
