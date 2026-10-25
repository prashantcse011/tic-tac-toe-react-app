import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('App', () => {
    it('renders the title and starts a two-player game after mode selection', () => {
        render(<App />);

        expect(screen.getByRole('heading', { name: 'Tic-Tac-Toe Game' })).toBeInTheDocument();
        expect(screen.queryByRole('table')).not.toBeInTheDocument();

        fireEvent.click(screen.getByRole('button', { name: '2 Player' }));

        expect(screen.getByText('Player 1: X vs Player 2: O')).toBeInTheDocument();
        expect(screen.getByText("Player 1's Turn (X)")).toBeInTheDocument();
    });

    it('starts a computer game after computer mode selection', () => {
        render(<App />);

        fireEvent.click(screen.getByRole('button', { name: 'Vs Computer' }));

        expect(screen.getByText('Player 1: X vs Computer')).toBeInTheDocument();
    });
});
