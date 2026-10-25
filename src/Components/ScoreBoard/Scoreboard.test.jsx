import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ScoreBoard from './Scoreboard';

describe('ScoreBoard', () => {
    it('renders the players and their current wins and draws', () => {
        render(
            <ScoreBoard scoreCard={[
                { player: 'X', wins: 2, draws: 1 },
                { player: 'O', wins: 1, draws: 3 },
            ]} />
        );

        const rows = within(screen.getByRole('table')).getAllByRole('row');
        expect(screen.getByRole('heading', { name: 'ScoreBoard' })).toBeInTheDocument();
        expect(rows[1]).toHaveTextContent('X21');
        expect(rows[2]).toHaveTextContent('O13');
    });

    it('shows zero for unset win and draw counts', () => {
        render(
            <ScoreBoard scoreCard={[
                { player: 'X' },
                { player: 'O' },
            ]} />
        );

        expect(within(screen.getByRole('table')).getAllByRole('row')[1])
            .toHaveTextContent('X00');
    });
});
