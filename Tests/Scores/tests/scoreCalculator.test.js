import ScoreCalculator from "../src/scoreCalculator.js";
// import { default as ScoreCalculator } from "../src/solution.js";

import DEFAULT_REVIEWS from "./utils.js";
import { jest } from "@jest/globals";

describe("ScoreCalculator tests", () => {

    let calculator;
    let reviews;
    beforeEach(() => {
        calculator = new ScoreCalculator();
        reviews = DEFAULT_REVIEWS;
    });

    describe("getStats tests", () => {

        it("getStats should get average statistics for reviews", () => {
            const expected = { totalAverage: 3, authoredAverage: 4, anonymousAverage: 2 };
            const result = calculator.getStats(reviews);
            expect(result).toEqual(expected);
        });

        it("getStats should return NaN authoredAverage if all reviews are anonymous", () => {
            reviews = reviews.filter(x => x.author === null);
            const expected = { totalAverage: 2, authoredAverage: NaN, anonymousAverage: 2 };
            const result = calculator.getStats(reviews);
            expect(result).toEqual(expected);
        });

        it("getStats should return NaN anonymousAverage if all reviews have authors", () => {
            reviews = reviews.filter(x => x.author !== null);
            const expected = { totalAverage: 4, authoredAverage: 4, anonymousAverage: NaN };
            const result = calculator.getStats(reviews);
            expect(result).toEqual(expected);
        });

        it("getStats should return NaN if there are no reviews", () => {
            reviews = [];
            const expected = { totalAverage: NaN, authoredAverage: NaN, anonymousAverage: NaN };
            const result = calculator.getStats(reviews);
            expect(result).toEqual(expected);
        });

        it("getStats should call validateStars to verify if all reviews are valid", () => {
            const spy = jest.spyOn(calculator, 'validateStars').mockImplementation(() => { });
            calculator.getStats(reviews);
            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledTimes(reviews.length);
        });

        // Test d'intégration
        it("getStats should ignore invalid reviews", () => {
            reviews.push({ author: "Test", stars: 10 });
            const expected = { totalAverage: 3, authoredAverage: 4, anonymousAverage: 2 };
            const result = calculator.getStats(reviews);
            expect(result).toEqual(expected);
        });

        it("getStats should call calculateAverage to get final result", () => {
            const spy = jest.spyOn(calculator, 'calculateAverages').mockImplementation(() => { });
            calculator.getStats(reviews);
            expect(spy).toHaveBeenCalled();
        });
    });

    describe("validateStars tests", () => {

        it("validateStars should return true if value is between min(1) and max(5)", () => {
            const review = { author: null, stars: 2 };
            const result = calculator.validateStars(review);
            expect(result).toBe(true);
        });

        it("validateStars should return true if value is at max(5)", () => {
            const review = { author: null, stars: 5 };
            const result = calculator.validateStars(review);
            expect(result).toBe(true);
        });

        it("validateStars should return false if value is under min(1)", () => {
            const review = { author: null, stars: 0 };
            const result = calculator.validateStars(review);
            expect(result).toBe(false);
        });

        it("validateStars should return false if value is over max(6)", () => {
            const review = { author: null, stars: 6 };
            const result = calculator.validateStars(review);
            expect(result).toBe(false);
        });
    });

    describe("calculateAverages tests", () => {
        it("calculateAverages should return the average on an array", () => {
            const arr = [1, 4, 5, 5];
            const expectedAverage = 3.75;
            const result = calculator.calculateAverages(arr);
            expect(result).toEqual(expectedAverage);
        });

        it("calculateAverages should return NaN for an empty array", () => {
            const arr = [];
            const expectedAverage = NaN;
            const result = calculator.calculateAverages(arr);
            expect(result).toEqual(expectedAverage);
        });
    });

})