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


/*
Exercice supplémentaire :

Le site web permet de rentrer une note de 0 à 5 (min=0), or la fonction validateStars()
considère une note valide si elle est entre 1 et 5. Ceci peut causer des problèmes si un
produit a plusieurs notes de 0 puisque la moyenne calculée ne sera pas la même que celle
attendue. Un utilisateur peut penser que le système "gonfle" les notes des produits en
ignorant les notes de 0.

Ceci aurait pu être détecté par des tests d'intégration. Par exemple :
    [ { author: null, stars: 4 }, { author: "Jean", stars: 5 }, { author: null, stars: 0 }]
devrait donner une moyenen globale de 3 (4+5+0)/3, mais le résultat sera plutôt 4.5 (4+5)/2 

La validation par le serveur reste une bonne pratique puisqu'on ne voudrait pas que la page
web soit l'autorité finale sur la note maximale possible, surtout si un utilisateur peut modifier
la limité sur l'élément HTML.

*/