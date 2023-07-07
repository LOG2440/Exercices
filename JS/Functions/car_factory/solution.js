/**
 * @typedef {Object} Car
 * @property {string} make
 * @property {string} model
 * @property {number} year
 * @property {()=>string} info
 */

/**
 * Créer une usine de voiture pour une marque spéciale.
 * Contient un compteur de voitures construites qui commence à 0 et est incrémenté à chaque nouvelle voiture créé
 * @param {string} make : la marque de la voiture 
 * @returns {{ carsBuilt: ()=>number, carBuilder: (model:string)=>(year:number)=> Car }}
 * @returns une fonction avec 2 méthodes fléchées :
 * 
 *  carsBuilt qui retourne le compteur de voitures créées.
 * 
 *  carBuilder qui prend un modèle en parmètre et retourne une fonction qui prend une année en paramètre et retourne un objet de voiture {make,model,year,info()}
 * 
 *  info() retourne l'information de la voiture dans le format suivant : "make model : year". 
 *  Cette fonction N'EST PAS une fonction fléchée
 */
function CarFactory(make) {
    let totalCars = 0;
    return {
        carsBuilt: () => totalCars,
        carBuilder: (model) => (year) => {
            totalCars++;
            return {
                make,
                model,
                year,
                info() { return `${make} ${model} : ${year}` }
            }
        }
    }
}


/// Exemples d'utilisation
const fordFactory = CarFactory('Ford');
console.log(fordFactory.carsBuilt()); // 0

const mustangBuilder = fordFactory.carBuilder('Mustang');
const mustang = mustangBuilder(1970);
console.log(mustang.info()); // Ford Mustant : 1970
console.log(fordFactory.carsBuilt()); // 1

const focusBuilder = fordFactory.carBuilder('Focus');
const focus = focusBuilder(2019);
console.log(focus.info()); // Ford Focus : 2019
console.log(fordFactory.carsBuilt()); //2


/**
 * Échanger une voiture pour un modèle d'une autre année
 * @param {Car} car La voiture initiale
 * @param {number} newYear l'année du nouveau modèle à échanger
 * @returns un objet car avec la nouvelle année
 */
function CarUpgrader(car, newYear) {
    car.year = newYear;
    return car;
}

/// Échange d'un modèle plus récent
const newFordFocus = CarUpgrader(focus, 2023);
console.log(newFordFocus.year); // 2023
console.log(newFordFocus.info()); // Ford Focus : 2019
/// Question : pourquoi est-ce que le nom est-il toujours Ford Focus : 2019 
/// Comment peut-on règler ce problème ?

// Solution :
// Le paramètre year référé dans info() est celui du paramètre de la fonction initiale et non celui de l'objet
// Modification possible : réécrire info() de la manière suivante dans l'objet retourné par carBuilder :

newFordFocus.info = function () { return `${this.make} ${this.model} : ${this.year}` };
console.log(newFordFocus.info()); // Ford Focus : 2023


// Notez que ceci ne serait pas valide si vous implémentez info comme une fonction fléchée 
// puisque this ne fait pas référence à l'objet retourné par carBuilder
newFordFocus.info = () => `${this.make} ${this.model} : ${this.year}`;
console.log(newFordFocus.info()); // undefined undefined : undefined
