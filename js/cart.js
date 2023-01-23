/////////////////////////////Variables///////////////////////////////

let myCart;
let totalProducts;
let totalPrice;
let errorFormulairePrenom;
let errorFormulaireNom;
let errorFormulaireadresse;
let errorFormulaireVille;
let errorFormulaireEmail;
const boutonCommander = document.getElementById("order");
const ValidationFormulaire = document.querySelector(".cart__order__form");
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

  document.querySelectorAll(".cart__item").forEach((article) =>
    article.addEventListener("change", function (e) {
      updateArticle(e);
    })
  );
  document.querySelectorAll(".deleteItem").forEach((btn) =>
    btn.addEventListener("click", function (e) {
      deleteArticle(e);
    })
  );
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

function updateArticle(e) {
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


 
 

  function checkinput(input) {
    let myRegex, msgError, validInput; 

    switch (input.id) {
      case "firstName":
      case "lastName":
      case "city":
        myRegex = /^(?![\s.]+$)[A-zÀ-ú\s\-']{1,25}$/;
        validInput = myRegex.test(input.value);
        msgError = "Veuillez supprimer les chiffres de votre champ.";
        break;
      case "address":
        myRegex = /^[0-9]{1,3}(?![\s.]+$)[a-zA-Z\s\-'.]+$/;
        validInput = myRegex.test(input.value);
        msgError = "Veuillez sair votre adresse.";
        break;

      case "email":
        myRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        validInput = myRegex.test(input.value);
        msgError = 'Veuillez sair votre email (doit contenir "@").';
        break;

    }

    const pElt = document.getElementById(`${input.id}ErrorMsg`);

    if (!validInput) {
      pElt.innerText = msgError;
      pElt.style.color = "red";
      //  pElt.style.fontSize = "x-large"
      return false;
    }else{
      pElt.innerText = '';
      pElt.style.color = "";
      return true;
    }

  }
  
  const commande = {
    contact: {
      firstName:'',
      lastName: '',
      address: '',
      city: '',
      email: '',
    },
    products: [],
  };

  
  const order = document.getElementById('order').addEventListener('click', function(e){
    e.preventDefault();
    let formError = 0;  
    document.querySelectorAll(".cart__order__form input").forEach((input) => {
      if (input.id === "order") return;
      
      if(!checkinput(input)) formError++
      else commande.contact[input.id] = input.value;
      
    });
   const tabId = myCart.map(product => product.id)
   commande.products = tabId;

    if (formError === 0) {
      if (myCart.length) {
        console.log(commande);
        localStorage.setItem("Contact", JSON.stringify(commande));

        const options = {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(commande),
        };
        console.log(options);
        // on envoie les données Contact et l'id des produits à l'API
        fetch("http://localhost:3000/api/products/order", options)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            // on redirige vers la page de confirmation de commande en passant l'orderId (numéro de commande) dans l'URL
            document.location.href = `confirmation.html?orderId=${data.orderId}`;
          });
      }
    } 
    });

  /////////////////fonctions controlant les inputs formulaire//////////////////////
  

  // order.addEventListener("click", function (e) {
  //   e.preventDefault();
  //   controleInputs();
  //   const numberOfItems = localStorage.length;
  //   if (numberOfItems === 0) {
  //     alert("aucun produit n'est présent dans votre panier");
  //   } else if (
  //     errorFormulairePrenom ||
  //     errorFormulaireNom ||
  //     errorFormulaireadresse ||
  //     errorFormulaireVille ||
  //     errorFormulaireEmail
  //   ) {
  //     alert(
  //       "Veuillez vérifier les information saisies dans le formulaire de contact"
  //     );
  //   } else {
  //     console.log(myCart);
  //     let id = [];
  //     for (let l = 0; l < myCart.length; l++) {
  //       id.push(myCart[l].id);
  //       console.log(myCart[l].id);
  //     }
  //     console.log(id);

  //    
  //     console.log(commande);
  //     localStorage.setItem("Contact", JSON.stringify(commande));

  //     const options = {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(commande),
  //     };
  //     console.log(options);
  //     // on envoie les données Contact et l'id des produits à l'API
  //     fetch("http://localhost:3000/api/products/order", options)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         console.log(data);
  //         // on redirige vers la page de confirmation de commande en passant l'orderId (numéro de commande) dans l'URL
  //         // document.location.href = `confirmation.html?orderId=${data.orderId}`;
  //       });
  //   }
  // });

