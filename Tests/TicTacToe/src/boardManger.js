import TicTacToe from "./ticTacToe.js";

export default class BoardManager {

    constructor() {
        this.currentPlayer = "X";
        this.board = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
        ];
        this.ticTacToe = new TicTacToe();
        this.eventHandler = this.handleMove.bind(this);
    }

    addClickListeners() {
        const cells = document.getElementsByClassName("cell");
        Array.from(cells).forEach(cell => {
            cell.addEventListener('click', this.eventHandler);
        });
        document.getElementById("reset").addEventListener('click', () => this.resetBoard());
    }

    removeEventListeners() {
        const cells = document.getElementsByClassName("cell");
        Array.from(cells).forEach(cell => {
            cell.removeEventListener('click', this.eventHandler);
        });
    }

    handleMove(event) {
        const cellElement = event.target;
        const [x, y] = [cellElement.dataset.x, cellElement.dataset.y];
        if (this.board[x][y] === "") {
            this.board[x][y] = this.currentPlayer;
            cellElement.innerText = this.currentPlayer;
            const winStatus = this.ticTacToe.checkBoard(this.board);
            if (winStatus.winner) {
                this.removeEventListeners();
                const text = winStatus.winner === 'draw' ? 'Égalité!' : `Le gagnant est ${winStatus.winner}`;
                document.getElementById('winner-name').textContent = text;
            }
            this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
            document.getElementById('turn-name').textContent = `C'est le tour de ${this.currentPlayer}`;
        }
    }

    resetBoard() {
        this.currentPlayer = "X";
        this.board = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
        ];
        const cells = document.getElementsByClassName("cell");
        Array.from(cells).forEach(cell => cell.innerText = '');
        document.getElementById('turn-name').textContent = `C'est le tour de ${this.currentPlayer}`;
        document.getElementById('winner-name').textContent = "";
        this.addClickListeners();
    }
}