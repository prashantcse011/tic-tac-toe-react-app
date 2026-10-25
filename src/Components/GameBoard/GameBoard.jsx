import { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Square from './Square';
import MoveHistory from '../MoveHistory/MoveHistory';
import ScoreBoard from '../ScoreBoard/Scoreboard';
import { checkWinner, checkDraw } from '../utils/utils';

const createEmptyBoard = () => Array.from(
    { length: 3 },
    () => Array.from({ length: 3 }, () => null)
);

export default function GameBoard({ player1, player2, isComputerMode }) {

    const [board, setBoard] = useState(createEmptyBoard);
    const [currentPlayer, setCurrentPlayer] = useState(player1);
    const [winner, setWinner] = useState(null);
    const [draw, setDraw] = useState(false);
    const [movesList, setMovesList] = useState([]);
    const [scoreCard, setScoreCard] = useState([{player: player1, wins: 0, draws: 0 }, {player: player2, wins: 0, draws: 0}]);
    const [visible, setVisible] = useState(false);
    const [winningCombination, setWinningCombination] = useState(null);

    const UpdateHeading = () => {
        if (winner) {
            if (isComputerMode) {
                return winner === player1 ? 'You win!' : 'Computer wins!';
            } else {
                return `Player ${winner} wins!`;
            }
        } else if (draw) {
            return 'The game is a draw!';
        } else {
            return currentPlayer === player1 ? `Player 1's Turn (${player1})` : `Player 2's Turn (${player2})`;
        }
    }

    const handleTwoPlayerClick = (rowIndex, colIndex) => {
        if (board[rowIndex][colIndex] === null && !winner && !draw) {
            setVisible(true);
            setMovesList([...movesList, {player: currentPlayer, row: rowIndex, col: colIndex}]);
            const newBoard = board.map(row => [...row]);
            newBoard[rowIndex][colIndex] = currentPlayer;
            setBoard(newBoard);
            if (checkWinner(newBoard)) {
                setWinner(currentPlayer);
                setScoreCard(scoreCard.map(player => player.player === currentPlayer ? {...player, wins: player.wins + 1} : player));
                setWinningCombination(checkWinner(newBoard).combination);
            } else if (checkDraw(newBoard)) {
                setDraw(true);
                setScoreCard(scoreCard.map(player => ({...player, draws: player.draws + 1})));
                
            } else {
            setCurrentPlayer(currentPlayer === player1 ? player2 : player1);
            }
        } else {
            if (winner || draw) {
                alert('Game Over! Please reset the game to play again.');
            } else {
                alert('This cell is already occupied. Please choose another cell.');
            }

        }
    }

    const handleComputerClick = (rowIndex, colIndex) => {
        if (winner || draw || currentPlayer !== player1 || board[rowIndex][colIndex] !== null) {
            return;
        }

        const boardAfterHumanMove = board.map(row => [...row]);
        boardAfterHumanMove[rowIndex][colIndex] = player1;
        const humanResult = checkWinner(boardAfterHumanMove);
        const nextMoves = [
            ...movesList,
            { player: player1, row: rowIndex, col: colIndex },
        ];
        setVisible(true);

        if (humanResult) {
            setBoard(boardAfterHumanMove);
            setMovesList(nextMoves);
            setWinner(player1);
            setScoreCard(currentScoreCard => currentScoreCard.map(player =>
                player.player === player1 ? { ...player, wins: player.wins + 1 } : player
            ));
            setWinningCombination(humanResult.combination);
            return;
        }

        if (checkDraw(boardAfterHumanMove)) {
            setBoard(boardAfterHumanMove);
            setMovesList(nextMoves);
            setDraw(true);
            setScoreCard(currentScoreCard => currentScoreCard.map(player => ({
                ...player,
                draws: player.draws + 1,
            })));
            return;
        }

        const findWinningMove = (mark) => {
            for (let row = 0; row < boardAfterHumanMove.length; row++) {
                for (let col = 0; col < boardAfterHumanMove[row].length; col++) {
                    if (boardAfterHumanMove[row][col] !== null) {
                        continue;
                    }

                    const candidateBoard = boardAfterHumanMove.map(boardRow => [...boardRow]);
                    candidateBoard[row][col] = mark;
                    if (checkWinner(candidateBoard)?.winner === mark) {
                        return [row, col];
                    }
                }
            }
            return null;
        };

        const computerMove = findWinningMove(player2)
            ?? findWinningMove(player1)
            ?? (boardAfterHumanMove[1][1] === null ? [1, 1] : null)
            ?? [[0, 0], [0, 2], [2, 0], [2, 2]].find(([row, col]) =>
                boardAfterHumanMove[row][col] === null
            )
            ?? boardAfterHumanMove.flatMap((row, rowIndex) =>
                row.map((cell, colIndex) => cell === null ? [rowIndex, colIndex] : null)
            ).find(Boolean);

        if (!computerMove) {
            setBoard(boardAfterHumanMove);
            setMovesList(nextMoves);
            setDraw(true);
            setScoreCard(currentScoreCard => currentScoreCard.map(player => ({
                ...player,
                draws: player.draws + 1,
            })));
            return;
        }

        const [computerRow, computerCol] = computerMove;
        const boardAfterComputerMove = boardAfterHumanMove.map(row => [...row]);
        boardAfterComputerMove[computerRow][computerCol] = player2;
        nextMoves.push({ player: player2, row: computerRow, col: computerCol });

        setBoard(boardAfterComputerMove);
        setMovesList(nextMoves);
        const computerResult = checkWinner(boardAfterComputerMove);
        if (computerResult) {
            setWinner(player2);
            setScoreCard(currentScoreCard => currentScoreCard.map(player =>
                player.player === player2 ? { ...player, wins: player.wins + 1 } : player
            ));
            setWinningCombination(computerResult.combination);
        } else if (checkDraw(boardAfterComputerMove)) {
            setDraw(true);
            setScoreCard(currentScoreCard => currentScoreCard.map(player => ({
                ...player,
                draws: player.draws + 1,
            })));
        } else {
            setCurrentPlayer(player1);
        }
    }

    const handleUndo = () => {
        if (movesList.length === 0 || winner || draw) {
            alert('No moves to undo or the game is over.');
            return;
        } else {
            if (isComputerMode) {
                const lastMove = movesList[movesList.length - 1];
                const secondLastMove = movesList[movesList.length - 2];
                const newBoard = board.map(row => [...row]);
                newBoard[lastMove.row][lastMove.col] = null;
                newBoard[secondLastMove.row][secondLastMove.col] = null;
                setBoard(newBoard);
                setMovesList(movesList.slice(0, -2));
                setCurrentPlayer(player1);
                setWinner(null);
                setDraw(false);
                setWinningCombination(null);
            } else {
                const lastMove = movesList[movesList.length - 1];
                const newBoard = board.map(row => [...row]);
                newBoard[lastMove.row][lastMove.col] = null;
                setBoard(newBoard);
                setMovesList(movesList.slice(0, -1));
                setCurrentPlayer(lastMove.player);
                setWinner(null);
                setDraw(false);
                setWinningCombination(null);
            }
            
        }
    }

    const handleReset = () => {
        setBoard(createEmptyBoard());
        setCurrentPlayer(player1);
        setWinner(null);
        setDraw(false);
        setMovesList([]);
        setVisible(false);
        setWinningCombination(null);
    }

    const handleResetScore = () => {
        setScoreCard([{player: player1, wins: 0, draws: 0 }, {player: player2, wins: 0, draws: 0}]);
    }

    return (
        <div className="game-board-grid">
            <div className="game-board-back">
                <Button size='sm' variant='primary' onClick={() => {window.location.reload()}}> Back</Button>
            </div>
            <div className="game-board-score">
                <ScoreBoard scoreCard={scoreCard} />    
            </div>
            <div className="game-board-score-reset-button">
                <Button size='sm' variant='primary' onClick={handleResetScore}>Reset ScoreBoard</Button>
            </div>
            <Table striped bordered hover className="game-board-heading">
                <tbody>
                    <tr>
                        <td>
                        <h3 >
                            {isComputerMode ? `Player 1: ${player1} vs Computer` : `Player 1: ${player1} vs Player 2: ${player2}`}
                        </h3>
                        </td>
                    </tr>
                    <tr>
                        <td>
                        <h4 className="game-board-heading1">
                            {UpdateHeading()}
                        </h4>
                        </td>
                    </tr>
                </tbody>
            </Table>
            
            <Table striped bordered hover className="game-board-table">
                <tbody>
                    {board.map((row, rowIndex) => (
                        <tr key={rowIndex} className="board-row">
                    {row.map((value, colIndex) => (
                        <td key={colIndex} className="board-cell">
                            <Square 
                            value={value} 
                            onClick={isComputerMode ? 
                                () => handleComputerClick(rowIndex, colIndex) : 
                                () => handleTwoPlayerClick(rowIndex, colIndex)} 
                            visible={visible}
                            variant={winningCombination?.some(([winRow, winCol]) =>
                                winRow === rowIndex && winCol === colIndex
                            ) ? 'primary' : 'light'} />
                        </td>
                    ))}
                </tr>
            ))}
                </tbody>
            
            </Table>
            <div className="game-board-history">
                <MoveHistory movesList={movesList} />
            </div>
            <Button variant="primary" className="game-board-undo" disabled={movesList.length === 0 || !!winningCombination || draw} onClick={handleUndo}>Undo</Button>
            <Button variant="primary" className="game-board-reset" onClick={handleReset}>Reset</Button>

        </div>

)
}
