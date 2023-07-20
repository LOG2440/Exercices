import TicTacToe from "../src/ticTacToe.js";
import { jest } from "@jest/globals";

describe.skip("TicTacToe tests", () => {
    let ticTacToe;
    let testBoard;
    beforeEach(() => {
        testBoard = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
        ];
        ticTacToe = new TicTacToe();
    });

    it("isBoardFull should return true if all cases are filled", () => {
        testBoard = testBoard.map(row => row.map(_ => "X"));
        expect(ticTacToe.isBoardFull(testBoard)).toBe(true);
    });

    it("isBoardFull should return false if there are empty cases", () => {
        testBoard[0][0] = "X";
        testBoard[1][1] = "X";
        testBoard[2][2] = "O";
        expect(ticTacToe.isBoardFull(testBoard)).toBe(false);
    });

    it("checkBoard should detect a winner on a board on 3 elements on a row", () => {
        testBoard[0][0] = "X";
        testBoard[0][1] = "X";
        testBoard[0][2] = "X";
        expect(ticTacToe.checkBoard(testBoard)).toStrictEqual({ winner: "X" });
    });

    it("checkBoard should detect no winner if no one has 3 elements on a row", () => {
        testBoard[0][0] = "X";
        testBoard[0][1] = "X";
        testBoard[0][2] = "0";
        expect(ticTacToe.checkBoard(testBoard)).toStrictEqual({ winner: null });
    });

    it("checkBoard should detect all possible combinations", () => {
        ticTacToe.wins.forEach(combination => {
            const [rowA, colA] = combination[0];
            const [rowB, colB] = combination[1];
            const [rowC, colC] = combination[2];
            testBoard[rowA][colA] = "X";
            testBoard[rowB][colB] = "X";
            testBoard[rowC][colC] = "X";
            expect(ticTacToe.checkBoard(testBoard)).toStrictEqual({ winner: "X" });
            testBoard = [
                ["", "", ""],
                ["", "", ""],
                ["", "", ""]
            ];
        });
    });

    it("checkBoard should detect a draw if board is full", () => {
        testBoard = [
            ["X", "O", "X"],
            ["O", "O", "X"],
            ["O", "X", "O"]
        ];
        expect(ticTacToe.checkBoard(testBoard)).toStrictEqual({ winner: "draw" });
    });

    it("checkBoard should call isBoardFull", () => {
        const spy = jest.spyOn(ticTacToe, "isBoardFull").mockImplementation(() => { });
        ticTacToe.checkBoard(testBoard);
        expect(spy).toHaveBeenCalled();
    });

    it("checkBoard should not call isBoardFull if there is a winner", () => {
        const spy = jest.spyOn(ticTacToe, "isBoardFull").mockImplementation(() => { });
        testBoard[0][0] = "X";
        testBoard[0][1] = "X";
        testBoard[0][2] = "X";
        ticTacToe.checkBoard(testBoard);
        expect(spy).not.toHaveBeenCalled();
    })
});