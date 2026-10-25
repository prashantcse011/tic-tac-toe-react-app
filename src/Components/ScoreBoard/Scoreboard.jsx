import Table from 'react-bootstrap/Table';

export default function ScoreBoard({scoreCard}) {
    const [player1Score, player2Score] = scoreCard;

    return (
        <div className="score-board">
            <div className="player-score">
                <h2>ScoreBoard</h2>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>Player</th>
                        <th>Wins</th>
                        <th>Draws</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>{player1Score?.player}</td>
                        <td>{player1Score?.wins || 0}</td>
                        <td>{player1Score?.draws || 0}</td>
                        </tr>
                        <tr>
                        <td>{player2Score.player}</td>
                        <td>{player2Score?.wins || 0}</td>
                        <td>{player2Score?.draws || 0}</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    );
}