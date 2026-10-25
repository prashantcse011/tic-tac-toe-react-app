import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Square from './Square';

describe('Square', () => {
    it('renders its value and calls onClick when pressed', () => {
        const onClick = vi.fn();
        render(<Square value="X" onClick={onClick} />);

        fireEvent.click(screen.getByRole('button', { name: 'X' }));

        expect(onClick).toHaveBeenCalledOnce();
    });

    it('uses the supplied button variant', () => {
        render(<Square value="O" onClick={() => {}} variant="primary" />);

        expect(screen.getByRole('button', { name: 'O' })).toHaveClass('btn-primary');
    });
});
