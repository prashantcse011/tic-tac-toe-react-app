
export const checkWinner = (board) => {
    const winningCombinations = [
        [[0, 0], [0, 1], [0, 2]],
        [[1, 0], [1, 1], [1, 2]],
        [[2, 0], [2, 1], [2, 2]],
        [[0, 0], [1, 0], [2, 0]],
        [[0, 1], [1, 1], [2, 1]],
        [[0, 2], [1, 2], [2, 2]],
        [[0, 0], [1, 1], [2, 2]],
        [[0, 2], [1, 1], [2, 0]],
    ];
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a[0]][a[1]] && board[a[0]][a[1]] === board[b[0]][b[1]] 
            && board[a[0]][a[1]] === board[c[0]][c[1]]) {
            return {winner: board[a[0]][a[1]], combination};
        }
    }
    return;
};

export const checkDraw = (board) => {
    for (let row of board) {
        for (let cell of row) {
            if (cell === null) {
                return false;
            }
        }
    }
    return true;
};