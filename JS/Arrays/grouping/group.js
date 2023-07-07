const users = [
    { name: "Michel", team: 1 },
    { name: "Bob", team: 2 },
    { name: "Marie", team: 3 },
    { name: "Julie", team: 1 },
    { name: "Claire", team: 3 }
];

const teams = [];
console.log(teams);
/* Valeur attendue :
[ { team: 1, members: [ 'Michel', 'Julie' ] },
  { team: 2, members: [ 'Bob' ] },
  { team: 3, members: [ 'Marie', 'Claire' ] } ]
*/