const createCustomer = document.getElementById("createCustomer");
const responseDiv = document.getElementById("resultResponse");

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
                                             <h1 class="text-xl font-bold text-center mb-4">Création du client</h1>
                                             <form action="" id="createAccount" method="post">
                                                 <div class="mb-4">
                                                     <label for="accountType">Type de compte : </label>
                                                     <select name="accountType" id="accountType">
                                                         <option value="courant">Courant</option>
                                                         <option value="epargne">Epargne</option>
                                                     </select>
                                                 </div>
                                                 <div class="mb-4">
                                                     <label for="currentAccountBalance">Solde :</label>
                                                     <input class="block w-full border-2 rounded-md p-2" type="text" placeholder="Solde" name="currentAccountBalance"
                                                            id="currentAccountBalance">
                                                 </div>
                                                                               
                                                 <input type="submit" class="bg-blue-500 text-white p-2 rounded-md" value="Créer le compte">
                                             </form>
                                        </div>
                                        `;
            })
    });
}

