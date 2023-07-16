export default class TicTacToe {
    constructor() {
        this.wins = [
            // rangées
            [[0, 0], [0, 1], [0, 2]],
            [[1, 0], [1, 1], [1, 2]],
            [[2, 0], [2, 1], [2, 2]],
            // colonnes
            [[0, 0], [1, 0], [2, 0]],
            [[0, 1], [1, 1], [2, 1]],
            [[0, 2], [1, 2], [2, 2]],
            // diagonales
            [[0, 0], [1, 1], [2, 2]],
            [[0, 2], [1, 1], [2, 0]]
        ];
    }

    checkBoard(board) {
        let check;
        this.wins.forEach(combination => {
            const [rowA, colA] = combination[0];
            const [rowB, colB] = combination[1];
            const [rowC, colC] = combination[2];
            if (
                board[rowA][colA] !== "" &&
                board[rowA][colA] === board[rowB][colB] &&
                board[rowA][colA] === board[rowC][colC]
            ) {
                check = { winner: board[rowA][colA] }
                return;
            }
        });

        return check
            ? check
            : this.isBoardFull(board)
                ? { winner: 'draw' }
                : { winner: null };
    }

    isBoardFull(board) {
        return board.every(row => row.every(cell => cell !== ''));
    }
}