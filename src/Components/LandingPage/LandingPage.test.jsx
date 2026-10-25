import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import LandingPage from './LandingPage';

describe('LandingPage', () => {
    it('renders the game mode prompt and choices before a game starts', () => {
        render(
            <LandingPage
                setIsComputerMode={vi.fn()}
                isGameStarted={false}
                setIsGameStarted={vi.fn()}
            />
        );

        expect(screen.getByText('Please select the game mode')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: '2 Player' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Vs Computer' })).toBeInTheDocument();
    });

    it('selects the requested mode and starts the game', () => {
        const setIsComputerMode = vi.fn();
        const setIsGameStarted = vi.fn();
        render(
            <LandingPage
                setIsComputerMode={setIsComputerMode}
                isGameStarted={false}
                setIsGameStarted={setIsGameStarted}
            />
        );

        fireEvent.click(screen.getByRole('button', { name: 'Vs Computer' }));

        expect(setIsComputerMode).toHaveBeenCalledWith(true);
        expect(setIsGameStarted).toHaveBeenCalledWith(true);
    });

    it('hides mode selection after the game starts', () => {
        render(
            <LandingPage
                setIsComputerMode={vi.fn()}
                isGameStarted
                setIsGameStarted={vi.fn()}
            />
        );

        expect(screen.queryByRole('button', { name: '2 Player' })).not.toBeInTheDocument();
    });
});
