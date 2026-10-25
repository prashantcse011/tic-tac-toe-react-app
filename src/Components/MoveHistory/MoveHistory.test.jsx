import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import MoveHistory from './MoveHistory';

describe('MoveHistory', () => {
    it('renders each move with its player and one-based position', () => {
        render(
            <MoveHistory movesList={[
                { player: 'X', row: 0, col: 2 },
                { player: 'O', row: 1, col: 1 },
            ]} />
        );

        const rows = within(screen.getByRole('table')).getAllByRole('row');
        expect(rows).toHaveLength(3);
        expect(rows[1]).toHaveTextContent('1XRow: 1, Col: 3');
        expect(rows[2]).toHaveTextContent('2ORow: 2, Col: 2');
    });

    it('renders an empty history table when there are no moves', () => {
        render(<MoveHistory movesList={[]} />);

        expect(within(screen.getByRole('table')).getAllByRole('row')).toHaveLength(1);
    });
});
