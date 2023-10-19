const createAccount = document.getElementById("createAccount");
const infosAccount = document.getElementById('infosAccount');
const payment = document.getElementById('payment');

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
                'currentAccountBalance': parseInt(document.getElementById('currentAccountBalance').value),
                'overdraft': false,
                'interestRate': 1,
                'idCustomer': idCustomer,
            })
        })
            .then(response => response.json())
            .then(response => {
                infosAccount.innerHTML +=  `<div class="max-w-sm p-6 m-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-100 dark:border-gray-100">
                                                <p class="text-center font-medium">Numéro de Compte: ${response.accountNumber}</p>
                                                <p>Type de compte: ${response.accountType}</p>
                                                <p class="text-emerald-500" id="balance + ${response.id}">Solde: ${response.currentAccountBalance}</p>
                                                <p>Découvert: ${response.overdraft}</p>
                                                <p>Taux d'intérêt : ${response.interestRate}</p>
                                                <p>Id: ${response.id}</p>
                                            </div>`
            })
    });
}

if (payment) {
    payment.addEventListener("submit", (e) => {
        e.preventDefault();

        fetch('http://localhost:8000/api/transactions/payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'idBankAccount': parseInt(document.getElementById('accountSource').value),
                'idBankAccountCible': parseInt(document.getElementById('accountDest').value),
                'amount': parseFloat(document.getElementById('amountAccount').value),
            })
        })
            .then(response=>response.json())
            .then(response => {
                let calculTransfert = (parseFloat(document.getElementById('amountAccount').value) *2)
                let calculTransfertDest = (parseFloat(response.newAmount) + calculTransfert)
                console.log(calculTransfert)
               document.getElementById(`balance + ${document.getElementById('accountSource').value}`).innerHTML = 'Solde:' +  response.newAmount
               document.getElementById(`balance + ${document.getElementById('accountDest').value}`).innerHTML = 'Solde:' + calculTransfertDest

            })
    })
}

const searchDiv = document.getElementById("search");
const searchForm = searchDiv.querySelector("#searchForm");

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();

    fetch(`http://localhost:8000/api/bank/searchByCustomerName`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(customer => {
            if (customer) {
                responseDiv.innerHTML = `<div class="max-w-sm p-6 m-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-100 dark:border-gray-100">
                <div class="font-bold">Nom:</div>
                    <p>${customer.name}</p>
                <div class="font-bold">Prénom:</div>
                    <p>${customer.firstname}</p>
                <div class="font-bold">Numéro Tel:</div>
                    <p>${customer.phoneNumber}</p>
                <div class="font-bold">Adresse:</div>
                    <p>${customer.address}</p>
                <div class="font-bold">Mail:</div>
                    <p>${customer.mail}</p>
                <div class="font-bold">Id:</div>
                <p>${customer.id}</p>
            </div>`;

                fetch(`http://localhost:8000/api/customer/{id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                    .then(response => response.json())
                    .then(accounts => {
                        accounts.forEach(account => {
                            responseDiv.innerHTML += `<div class="max-w-sm p-6 m-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-100 dark:border-gray-100">
                        <div class="font-bold">Numéro de Compte:</div>
                            <p>${account.accountNumber}</p>
                        <div class="font-bold">Type de compte:</div>
                            <p>${account.accountType}</p>
                        <div class="font-bold">Solde:</div>
                            <p>${account.currentAccountBalance}</p>
                        <div class="font-bold">Découvert:</div>
                            <p>${account.overdraft}</p>
                        <div class="font-bold">Taux d'intérêt:</div>
                            <p>${account.interestRate}</p>
                        <div class="font-bold">Id du Client:</div>
                        <p>${account.idCustomer}</p>
                    </div>`;
                        });
                    });
            }
        });
});


