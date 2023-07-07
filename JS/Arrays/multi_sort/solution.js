const books = [
    { id: 1, price: 10.50, available: true },
    { id: 2, price: 13.00, available: false },
    { id: 3, price: 8.50, available: false },
    { id: 4, price: 20.75, available: true },
    { id: 5, price: 10.50, available: false },
];

// Regrouper les livres selon leur disponibilité ET par leur prix en ordre croissant
const sorted = [...books].sort((a, b) => {
    // rappel : l'opération "-" convertir un boolean en number
    // si a > b, alors a sera placé APRÈS b
    return b.available - a.available || a.price - b.price;
});


console.log(sorted);
/* Valeur attendue :
[ { id: 1, price: 10.5, available: true },
  { id: 4, price: 20.75, available: true },
  { id: 3, price: 8.5, available: false },
  { id: 5, price: 10.5, available: false },
  { id: 2, price: 13, available: false } ]
*/

console.log(books);
/* Valeur attendue :
[ { id: 1, price: 10.5, available: true },
  { id: 2, price: 13, available: false },
  { id: 3, price: 8.5, available: false },
  { id: 4, price: 20.75, available: true },
  { id: 5, price: 10.5, available: false } ]
*/