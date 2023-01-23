/////////////////////////////Variables///////////////////////////////

let myCart;
let totalProducts;
let totalPrice;
let errorFormulairePrenom ;
let errorFormulaireNom ;
let errorFormulaireadresse ;
let errorFormulaireVille ;
let errorFormulaireEmail ;
const boutonCommander = document.getElementById("order");
const ValidationFormulaire = document.querySelector(".cart__order__form")
/////////////////////////////Variables///////////////////////////////

/////////////////////////////////////////Recupérations des informations contenues dans le local storage///////////////////////////////////////////////

RecupLocalStorage();

function RecupLocalStorage() {
  myCart = JSON.parse(localStorage.getItem("panier"));
  addProducts();
}

function addProducts() {
  document.querySelector("#cart__items").innerHTML = "";

  myCart.map((canap) => {
    canap.info.personalisation.map((perso) => {
      document.querySelector("#cart__items").innerHTML += `
      <article class="cart__item" data-id="${canap.id}" data-color="${perso.color}" data-quantity="${perso.quantity}" data-price="${canap.info.price}">
      <div class="cart__item__img">
        <img src="${canap.info.imageUrl}" alt="${canap.info.altTxt}">
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__description">
          <h2>${canap.info.name}</h2>
          <p>${perso.color}</p>
          <p>${canap.info.price}  € </p>
        </div>
        <div class="cart__item__content__settings">
          <div class="cart__item__content__settings__quantity">
            <p>Qté : </p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${perso.quantity}">
          </div>
          <div class="cart__item__content__settings__delete">
          <p class="deleteItem" data-id="${canap.id}" data-color="${perso.color}">Supprimer</p>
          </div>
        </div>
      </div>
    </article>      
          `;
    });
  });
  totalCart();

  document.querySelectorAll(".cart__item").forEach(article => article.addEventListener('change', function(e) {updateArticle(e) }))
  document.querySelectorAll(".deleteItem").forEach(btn => btn.addEventListener('click', function(e) {deleteArticle(e) }))
}

function totalCart() {
  totalProducts = 0;
  totalPrice = 0;
  let petittotal = 0;

  myCart.map((modelCanap) =>
    modelCanap.info.personalisation.map((perso) => {
      totalProducts += perso.quantity;
      petittotal = Number(modelCanap.info.price * perso.quantity);
      totalPrice += petittotal;
    })
  );

  // Affichage des résultats dans le HTML
  document.getElementById("totalQuantity").textContent = totalProducts;
  document.getElementById("totalPrice").textContent = totalPrice;
}


function updateArticle(e){
  const currentId = e.currentTarget.dataset.id;
    const currentColor = e.currentTarget.dataset.color;
    const currentQuantity = Number(e.currentTarget.dataset.quantity);

    // console.log(currentId,currentColor,currentQuantity);

    myCart.map((modelCanap) => {
      if (modelCanap.id === currentId) {
        modelCanap.info.personalisation.map((perso) => {
          if (perso.color === currentColor) {
            perso.quantity = Number(e.target.value);
          }
        });
      }
    });
    localStorage.setItem("panier", JSON.stringify(myCart));
    addProducts();
}

function deleteArticle(e) {
  const idselect = e.currentTarget.dataset.id;
  const colorselect = e.currentTarget.dataset.color;

  const newTab = myCart.map((modelCanap) => {
    if (modelCanap.id === idselect) {
      let res = modelCanap.info.personalisation.filter(
        (perso) => perso.color !== colorselect
      );
      modelCanap.info.personalisation = res;
      localStorage.setItem("panier", JSON.stringify(myCart));
      addProducts();
    }
  });


}















                  /////////////////fonction générale controle des inputs formulaire/////////////////
controleInputs()



function controleInputs(){
  

 
    let inputPrenom = document.querySelector('#firstName'); //declaration emplacement input
    inputPrenom.addEventListener('change', function() {   // ecoute de l'input
      const prenomRgex = /^(?![\s.]+$)[A-zÀ-ú\s\-']{1,25}$/    // limitation des caracteres  par Regex
      let firstNameErrorMsg = document.getElementById("firstNameErrorMsg")  //
      let controlePrenom = prenomRgex.test(inputPrenom.value);
      
      if (controlePrenom) {           // si test regex OK =>
          firstNameErrorMsg.innerText = '';  // pas de message d'erreur
          errorFormulairePrenom = false;
          console.log(errorFormulairePrenom);
          
      } 
      else {   // Si test Regex negatif  on stop l'envoi formulaire et message d'erreur apparait sous champs problematique
          firstNameErrorMsg.innerText = 'Veuillez indiquer un Prenom, Lettres uniquement !';
          errorFormulairePrenom = true;
          firstNameErrorMsg.style.color = "red"
          firstNameErrorMsg.style.fontSize = "x-large"
          console.log(errorFormulairePrenom);
      }
    });
  
 
    let inputNom = document.querySelector('#lastName');
    inputNom.addEventListener('change', function() {
      const nomRgex = /^(?![\s.]+$)[A-zÀ-ú\s\-']{1,25}$/
      let nomErrorMsg = document.getElementById("lastNameErrorMsg")
      let controlenom = nomRgex.test(inputNom.value);
      if (controlenom) {
          nomErrorMsg.innerText = '';
          errorFormulaireNom = false;
          console.log(errorFormulaireNom);
      } 
      else {
          nomErrorMsg.innerText = 'Veuillez indiquer un Nom, Lettres uniquement !.';
          errorFormulaireNom = true;
          nomErrorMsg.style.color = "red"
          nomErrorMsg.style.fontSize = "x-large"
          console.log(errorFormulaireNom);
      }
    });
  
  
    let inputAdresse = document.querySelector('#address');
    inputAdresse.addEventListener('change', function() {
      const adresseRgex = /^[0-9]{1,3}(?![\s.]+$)[a-zA-Z\s\-'.]+$/
      let adresseErrorMsg = document.getElementById("addressErrorMsg")
      let controleadresse = adresseRgex.test(inputAdresse.value);
      if (controleadresse) {
        adresseErrorMsg.innerText = '';
        errorFormulaireadresse = false;
        
      } 
      else {
        adresseErrorMsg.innerText = 'Veuillez sair un numéro et un nom de voie !.';
        errorFormulaireadresse = true;
        adresseErrorMsg.style.color = "red"
        adresseErrorMsg.style.fontSize = "x-large"
      }
    });
  
  
    let inputVille = document.querySelector('#city');
    inputVille.addEventListener('change', function() {
    const villeRgex = /^(?![\s.]+$)[A-zÀ-ú\s\-]{1,25}$/
    let villeErrorMsg = document.getElementById("cityErrorMsg")
      let controleVille = villeRgex.test(inputVille.value);
      if (controleVille) {
        villeErrorMsg.innerText = '';
        errorFormulaireVille = false;
      } 
      else {
        villeErrorMsg.innerText = 'Veuillez sair votre localité !';
        errorFormulaireVille = true;
        villeErrorMsg.style.color = "red"
        villeErrorMsg.style.fontSize = "x-large"
      }
    })
  
  
    let inputEmail = document.querySelector('#email');
    inputEmail.addEventListener('change', function() {
    const emailRgex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    let emailErrorMsg = document.getElementById("emailErrorMsg")
      let controleEmail = emailRgex.test(inputEmail.value);
      if (controleEmail) {
        emailErrorMsg.innerText = '';
        errorFormulaireEmail = false;
       
      } 
      else {
        emailErrorMsg.innerText = 'Veuillez sair votre email (doit contenir "@").';
        errorFormulaireEmail = true;
        emailErrorMsg.style.color = "red"
        emailErrorMsg.style.fontSize = "x-large"
        
      }
    })
    
    
    



    

    /////////////////fonctions controlant les inputs formulaire//////////////////////  
    let order = document.querySelector("#order")

    order.addEventListener("click", function(e){
        e.preventDefault();
        const numberOfItems = localStorage.length;
          if (numberOfItems === 0){
              alert("aucun produit n'est présent dans votre panier")
          }else if(errorFormulairePrenom  || errorFormulaireNom  || errorFormulaireadresse  || errorFormulaireVille || errorFormulaireEmail){
            alert ("Veuillez vérifier les information saisies dans le formulaire de contact")
          }
          else{
            console.log(myCart);
            let id = [];
            for (let l = 0; l<myCart.length;l++) {
              id.push(myCart[l].id);
              console.log(myCart[l].id);
            }
            console.log(id)
          
            const commande ={
              contact: {
                firstName: inputPrenom.value,
                lastName: inputNom.value,
                address: inputAdresse.value,
                city: inputVille.value,
                email: inputEmail.value,
              },
              products : id,
            }
           console.log(commande);
           localStorage.setItem("Contact", JSON.stringify(commande))
            
           
           const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json', 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(commande)
        };
            console.log(options);
        // on envoie les données Contact et l'id des produits à l'API
        fetch("http://localhost:3000/api/products/order", options)
        .then((response) => response.json())
        .then((data) => {
                console.log(data);
            // on redirige vers la page de confirmation de commande en passant l'orderId (numéro de commande) dans l'URL
            document.location.href = `confirmation.html?orderId=${data.orderId}`;
        })
             

          }

    })

};



  
  
  

  
  