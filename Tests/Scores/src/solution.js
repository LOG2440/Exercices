export default class ScoreCalculatorSolution {
    constructor() { }

    getStats(reviews) {
        const finalGrades = reviews.reduce((acc, review) => {
            if (this.validateStars(review)) {
                if (review.author) {
                    acc.authoredAverage.push(review.stars);
                }
                else {
                    acc.anonymousAverage.push(review.stars);
                }
                acc.totalAverage.push(review.stars);
            }
            return acc;
        }, {
            totalAverage: [],
            authoredAverage: [],
            anonymousAverage: []
        }
        );
        return {
            totalAverage: this.calculateAverages(finalGrades.totalAverage),
            anonymousAverage: this.calculateAverages(finalGrades.anonymousAverage),
            authoredAverage: this.calculateAverages(finalGrades.authoredAverage)
        };
    }

    validateStars(review) {
        return review.stars >= 1 && review.stars <= 5;
    }

    calculateAverages(array) {
        return array.reduce((acc, x) => acc + x, 0) / array.length;
    }
}