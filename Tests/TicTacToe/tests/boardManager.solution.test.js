import BoardManager from "../src/boardManger.js";
import { jest } from "@jest/globals";

describe("BoardManager tests", () => {
    let boardManager;

    function buildHTML() {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        document.body.append(cell);
        const button = document.createElement("button");
        button.setAttribute("id", "reset");
        document.body.append(button);

        const winnerName = document.createElement("h2");
        winnerName.setAttribute("id", "winner-name");
        document.body.append(winnerName);

        const turnName = document.createElement("h2");
        turnName.setAttribute("id", "turn-name");
        document.body.append(turnName);
    }

    beforeEach(() => {
        boardManager = new BoardManager();
        boardManager.ticTacToe = {
            checkBoard: () => ({ winner: null })
        }
        buildHTML();
    });

    afterEach(() => {
        document.body.innerHTML = '';
        jest.resetAllMocks();
    })

    it("addClickListeners should add listeners to cells and reset button", () => {
        const cellSpy = jest.spyOn(boardManager, "eventHandler").mockImplementation(() => { });
        const buttonSpy = jest.spyOn(boardManager, "resetBoard").mockImplementation(() => { });
        const cell = document.getElementsByClassName("cell")[0];

        boardManager.addClickListeners();
        cell.dispatchEvent(new MouseEvent("click"));
        expect(cellSpy).toHaveBeenCalled();

        document.getElementById("reset").dispatchEvent(new MouseEvent("click"));
        expect(buttonSpy).toHaveBeenCalled();
    });

    it("removeEventListeners should disable click events on cells", () => {
        const cellSpy = jest.spyOn(boardManager, "eventHandler").mockImplementation(() => { });
        const cell = document.getElementsByClassName("cell")[0];

        boardManager.removeEventListeners();
        cell.dispatchEvent(new MouseEvent("click"));
        expect(cellSpy).not.toHaveBeenCalled();
    });

    it("resetBoard should set the value to defaults", () => {
        boardManager.board[0][0] = "X";
        boardManager.resetBoard();
        expect(boardManager.board).toStrictEqual([
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
        ]);
        expect(boardManager.currentPlayer).toBe("X");
        const cells = document.getElementsByClassName("cell");
        Array.from(cells).forEach(cell => {
            expect(cell.innerText).toBe("");
        });
        expect(document.getElementById('turn-name').textContent).toBe(`C'est le tour de ${boardManager.currentPlayer}`);
        expect(document.getElementById('winner-name').textContent).toBe("");
    });

    it("resetBoard should call addClickListeners", () => {
        const spy = jest.spyOn(boardManager, "addClickListeners").mockImplementation(() => { });
        boardManager.resetBoard();
        expect(spy).toHaveBeenCalled();
    });

    describe("handleMove tests", () => {

        let cell;
        let eventMock;
        beforeEach(() => {
            cell = document.createElement("div");
            cell.dataset.x = 0;
            cell.dataset.y = 0;
            eventMock = { target: cell };
        })

        it("handleMove should call change board if click is on empty case", () => {
            boardManager.handleMove(eventMock);
            expect(boardManager.board[0][0]).toBe("X");
            expect(cell.innerText).toBe("X");
        });

        it("handleMove should change current player after a move", () => {
            expect(boardManager.currentPlayer).toBe("X");
            boardManager.handleMove(eventMock);
            expect(boardManager.currentPlayer).toBe("O");
            // Simuler un click ailleurs
            cell.dataset.x = 1;
            cell.dataset.y = 1;
            boardManager.handleMove(eventMock);
            expect(boardManager.currentPlayer).toBe("X");
        });

        it("handleMove should not change current player after an invalid move", () => {
            boardManager.board[0][0] = "X";
            expect(boardManager.currentPlayer).toBe("X");
            boardManager.handleMove(eventMock);
            expect(boardManager.currentPlayer).toBe("X");
        });

        it("handleMove should call removeEventListeners if there's a winner or draw", () => {
            const spy = jest.spyOn(boardManager, 'removeEventListeners').mockImplementation(() => { });
            boardManager.ticTacToe.checkBoard = () => ({ winner: "X" });
            boardManager.handleMove(eventMock);
            expect(spy).toHaveBeenCalled();
            expect(document.getElementById('winner-name').textContent.includes("X")).toBe(true);
        });

        it("handleMove should not call removeEventListeners if there's no winner or draw", () => {
            const spy = jest.spyOn(boardManager, 'removeEventListeners').mockImplementation(() => { });
            boardManager.handleMove(eventMock);
            expect(spy).not.toHaveBeenCalled();
            expect(document.getElementById('winner-name').textContent).toBe("");
        });

        it("handleMove should handle draw", () => {
            boardManager.ticTacToe.checkBoard = () => ({ winner: "draw" });
            boardManager.handleMove(eventMock);
            expect(document.getElementById('winner-name').textContent.includes("Égalité")).toBe(true);
        });
    });
});