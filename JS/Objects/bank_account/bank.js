const BankAccount = (balance) =>
    (function (copyBalance) {
        let balance = copyBalance; // Variable "privée"
        const createMessage = function () { // Méthode "privée"
            console.log(`Compte créé avec un montant de ${balance}$`);
        };
        createMessage();
        return {
            withdraw: function (amount) {
                if (balance >= amount) {
                    balance -= amount;
                    return balance;
                } else {
                    return "Fonds insuffisants";
                }
            },
            deposit: function (amount) {
                if (amount >= 0) {
                    balance += amount;
                    return balance;
                } else {
                    return "Impossible de déposer un montant négatif";
                }
            },
            checkBalance: function () { return balance }
        };
    })(balance);

// TODO
// class BankAccount { }

const firstAccount = BankAccount(100); // "Compte créé avec un montant de 100$"
console.log(firstAccount.balance); // undefined
console.log(firstAccount.checkBalance()); // 100
console.log(firstAccount.withdraw(20)); // 80
console.log(firstAccount.deposit(30)); // 110
console.log(firstAccount.createMessage); // undefined
const secondAccount = BankAccount(20); // "Compte créé avec un montant de 20$"
console.log(secondAccount.withdraw(30)); // "Fonds insuffisants"
console.log(secondAccount.deposit(-20)); // "Impossible de déposer un montant négatif"