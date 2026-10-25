import Table from 'react-bootstrap/Table';

export default function MoveHistory({movesList}) {
    

    return (
        <div className="score-board">
            <div className="player-score">
                
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>Move</th>
                        <th>Player</th>
                        <th>Position</th>
                        </tr>
                    </thead>
                    <tbody>
                        {movesList.map((move, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{move.player}</td>
                                <td>Row: {move.row + 1}, Col: {move.col + 1}</td>
                            </tr>
                        )
                        )}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}