import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import GameBoard from './GameBoard';

const boardCells = () => within(document.querySelector('.game-board-table')).getAllByRole('button');
const historyTable = () => document.querySelector('.game-board-history table');
const scoreboardTable = () => document.querySelector('.game-board-score table');

describe('GameBoard', () => {
    it('renders nine cells and the initial two-player turn', () => {
        render(<GameBoard player1="X" player2="O" isComputerMode={false} />);

        expect(boardCells()).toHaveLength(9);
        expect(screen.getByText("Player 1's Turn (X)")).toBeInTheDocument();
        expect(within(historyTable()).getAllByRole('row')).toHaveLength(1);
    });

    it('updates the board, alternates turns, and records moves in two-player mode', () => {
        render(<GameBoard player1="X" player2="O" isComputerMode={false} />);

        fireEvent.click(boardCells()[0]);
        expect(boardCells()[0]).toHaveTextContent('X');
        expect(screen.getByText("Player 2's Turn (O)")).toBeInTheDocument();

        fireEvent.click(boardCells()[3]);
        expect(boardCells()[3]).toHaveTextContent('O');
        expect(screen.getByText("Player 1's Turn (X)")).toBeInTheDocument();
        expect(within(historyTable()).getAllByRole('row')).toHaveLength(3);
    });

    it('updates the winner and scoreboard, and prevents further moves after a win', () => {
        render(<GameBoard player1="X" player2="O" isComputerMode={false} />);

        [0, 3, 1, 4, 2].forEach(index => fireEvent.click(boardCells()[index]));

        expect(screen.getByText('Player X wins!')).toBeInTheDocument();
        expect(within(scoreboardTable()).getByRole('row', { name: 'X 1 0' })).toBeInTheDocument();
        expect(boardCells()[0]).toHaveClass('btn-primary');

        const alert = vi.spyOn(window, 'alert').mockImplementation(() => {});
        fireEvent.click(boardCells()[5]);
        expect(alert).toHaveBeenCalledWith('Game Over! Please reset the game to play again.');
        expect(boardCells()[5]).not.toHaveTextContent('O');
        expect(within(historyTable()).getAllByRole('row')).toHaveLength(6);
        alert.mockRestore();
    });

    it('supports undo and reset for the current game', () => {
        render(<GameBoard player1="X" player2="O" isComputerMode={false} />);

        fireEvent.click(boardCells()[0]);
        fireEvent.click(boardCells()[3]);
        fireEvent.click(screen.getByRole('button', { name: 'Undo' }));

        expect(boardCells()[0]).toHaveTextContent('X');
        expect(boardCells()[3]).toBeEmptyDOMElement();
        expect(within(historyTable()).getAllByRole('row')).toHaveLength(2);

        fireEvent.click(screen.getByRole('button', { name: 'Reset', exact: true }));
        expect(boardCells().every(cell => cell.textContent === '')).toBe(true);
        expect(screen.getByText("Player 1's Turn (X)")).toBeInTheDocument();
    });

    it('makes an automatic valid computer move using the center when available', () => {
        render(<GameBoard player1="X" player2="O" isComputerMode />);

        fireEvent.click(boardCells()[0]);

        expect(boardCells()[0]).toHaveTextContent('X');
        expect(boardCells()[4]).toHaveTextContent('O');
        expect(within(historyTable()).getAllByRole('row')).toHaveLength(3);
    });

    it('blocks the human winning move when the computer has no winning move', () => {
        render(<GameBoard player1="X" player2="O" isComputerMode />);

        fireEvent.click(boardCells()[0]);
        fireEvent.click(boardCells()[2]);

        expect(boardCells()[1]).toHaveTextContent('O');
        expect(within(historyTable()).getAllByRole('row')).toHaveLength(5);
    });

    it('takes its winning move and ignores clicks once the game is complete', () => {
        render(<GameBoard player1="X" player2="O" isComputerMode />);

        [0, 8, 7].forEach(index => fireEvent.click(boardCells()[index]));

        expect(boardCells()[6]).toHaveTextContent('O');
        expect(screen.getByText('Computer wins!')).toBeInTheDocument();
        expect(within(scoreboardTable()).getByRole('row', { name: 'O 1 0' })).toBeInTheDocument();

        fireEvent.click(boardCells()[5]);
        expect(boardCells()[5]).toBeEmptyDOMElement();
        expect(within(historyTable()).getAllByRole('row')).toHaveLength(7);
    });

    it('ignores attempts to play in an occupied cell in computer mode', () => {
        render(<GameBoard player1="X" player2="O" isComputerMode />);

        fireEvent.click(boardCells()[0]);
        fireEvent.click(boardCells()[4]);

        expect(boardCells()[4]).toHaveTextContent('O');
        expect(within(historyTable()).getAllByRole('row')).toHaveLength(3);
    });
});
