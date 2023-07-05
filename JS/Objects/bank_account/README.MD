# Transformation d'IIFE en classe

La version `ES2015` a introduit la notation `class` en JS. Avant cette syntaxe, les développeurs utilisaient les `IIFE` pour simuler le comportement des classes.

Le code fourni dans [bank.js](./bank.js) est un exemple d'une fonction créée par une IIFE qui permet de créer un compte de banque. Ce compte de banque possède une balance initialisée à sa création. Il est possible de retirer ou déposer des montants dans le compte, mais il n'est pas possible de retirer plus que la balance disponible ou de déposer un montant négatif.

Modifiez le code fourni pour transformer l'IIFE utilisée en une classe `BankAccount`. La classe doit garder le même comportement que le code initial.

Voici un exemple d'utilisation de l'IIFE :

```js
const firstAccount = BankAccount(100); // "Compte créé avec un montant de 100$"
console.log(firstAccount.balance); // undefined
console.log(firstAccount.checkBalance()); // 100

console.log(firstAccount.withdraw(20)); // 80
console.log(firstAccount.deposit(30)); // 110
console.log(firstAccount.createMessage); // undefined

const secondAccount = BankAccount(20); // "Compte créé avec un montant de 20$"
console.log(secondAccount.withdraw(30)); // "Fonds insuffisants"
console.log(secondAccount.deposit(-20)); // "Impossible de déposer un montant négatif"
```

**Notes** : 
- lorsque vous transformez `BankAccount` en classe, n'oubliez pas qu'il faut utiliser le mot clé `new` lors de son utilisation.
- l'accès à une variable de classe privée `#x` va générer une erreur et non retourner `undefined` comme l'exemple plus haut. Le résultat de certaines commandes sera légérement différent.


# Solution

La solution de l'exercice est disponible dans le fichier [solution.js](./solution.js).
