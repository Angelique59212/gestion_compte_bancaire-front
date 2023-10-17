const createAccount = document.getElementById("createAccount");
const responseAccount = document.getElementById("responseAccount");

if (createAccount) {
    createAccount.addEventListener("submit", (e) => {
        e.preventDefault();

        fetch('http://localhost:8000/api/bankAccount/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'accountNumber': Math.floor(Math.random() * 1000).toString(),
                'accountType': document.getElementById('accountType').value,
                'currentAccountBalance': document.getElementById('initialBalance').value,
                'overdraft': false,
                'interestRate': 1,
            })
        })
            .then(response => response.json())
            .then(response => {
                responseAccount.innerHTML = `<div class="card w-30">
                                                <p>Numéro de Compte: ${response.accountNumber}</p>
                                                <p>Type de compte: ${response.accountType}</p>
                                                <p>Solde: ${response.currentAccountBalance}</p>
                                                <p>Découvert: ${response.overdraft}</p>
                                                <p>Taux d'intérêt : ${response.interestRate}</p>
                                                <p>Id: ${response.id}</p>
                                            </div>;`
            })
    });
}
