const createCustomer = document.getElementById("createCustomer");
const responseDiv = document.getElementById("resultResponse");
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
                responseDiv.innerHTML = `<div class="card w-30">
                                            <p>Nom: ${response.name}</p>
                                            <p>Prénom: ${response.firstname}</p>
                                            <p>Numéro Tel: ${response.phoneNumber}</p>
                                            <p>Adresse: ${response.address}</p>
                                            <p>Mail: ${response.mail}</p>
                                            <p>Id: ${response.id}</p>
                                        </div>
                                        <div class="card w-30">
                                             <div id="responseAccount" class="w-1/3 p-8 border border-blue-800">
                                        </div>    
                                        `;
                createCustomer.classList.add('invisible');
                createAccount.classList.remove('invisible');
            })
    });
}




