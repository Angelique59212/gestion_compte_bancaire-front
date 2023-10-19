const createCustomer = document.getElementById("createCustomer");
const responseDiv = document.getElementById("resultResponse");
const createPayment = document.getElementById("payment");

let idCustomer =0;
if (createCustomer) {
    createCustomer.addEventListener("submit", (e) => {
        e.preventDefault();

        fetch('http://localhost:8000/api/customer/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'name': document.getElementById('lastName').value,
                'firstname': document.getElementById('firstName').value,
                'address': document.getElementById('address').value,
                'phoneNumber': document.getElementById('phone').value,
                'mail': document.getElementById('mail').value,
            })
        })
            .then(response => response.json())
            .then(response => {
                 idCustomer = response.id;
                responseDiv.innerHTML = `<div class="max-w-sm p-6 m-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-100 dark:border-gray-100">
                                         <div class="font-bold">Nom:</div>
                                            <p>${response.name}</p>
                                         <div class="font-bold">Prénom:</div>
                                            <p>${response.firstname}</p>
                                         <div class="font-bold">Numéro Tel:</div>
                                            <p>${response.phoneNumber}</p>
                                         <div class="font-bold">Adresse:</div>
                                            <p>${response.address}</p>
                                         <div class="font-bold">Mail:</div>
                                            <p>${response.mail}</p>
                                         <div class="font-bold">Id:</div>
                                            <p>${response.id}</p>
                                         </div>
                                                                             
                                        `;
                createCustomer.classList.add('invisible');
                createPayment.classList.remove('invisible');
                createAccount.classList.remove('invisible');
            })
    });
}








