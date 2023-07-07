const books = [
    { id: 1, price: 10.50, available: true },
    { id: 2, price: 13.00, available: false },
    { id: 3, price: 8.50, available: false },
    { id: 4, price: 20.75, available: true },
    { id: 5, price: 10.50, available: false },
];

const sorted = [];

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