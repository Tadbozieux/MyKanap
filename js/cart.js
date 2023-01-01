const cart = [];

retrieveItemsFromCache(); //appel fonction retrieveItemsFromCache qui permet de recupérer le local storage

function retrieveItemsFromCache() {
  const numberOfItems = localStorage.length;
  for (let i = 0; i < numberOfItems; i++) {
    let item = localStorage.getItem(localStorage.key(i));
    // console.log("objet a la position " , i, "est", item) //donnes les items de JSON
    const objetitem = JSON.parse(item); //transforme JSON en Objet  (inverse JSON.stringify)
    // console.log(objetitem)
    cart.push(objetitem);
    // console.log(cart)
  }
}

hydrateCart(cart);
function hydrateCart(cart) {
  cart.map((canap) => {
    // incorporation du HTML

    document.querySelector("#cart__items").innerHTML += `
        <article class="cart__item" data-id="${canap.id}" data-color="${canap.color} data-quantity="${canap.quantity}" data-price="${canap.price}">
        <div class="cart__item__img">
          <img src="${canap.imageUrl}" alt="${canap.altTxt}">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${canap.name}</h2>
            <p>${canap.color}</p>
            <p>${canap.price}  € </p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : </p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${canap.quantity}">
            </div>
            <div class="cart__item__content__settings__delete">
            <p class="deleteItem" data-id="${canap.id}" data-color="${canap.color}">Supprimer</p>
            </div>
          </div>
        </div>
      </article>      
            `
  });
  makeItemTotal();
  // MajItemTotal()
 
}

function makeItemTotal() {
  //definition quantitié totale panier
  const totalQuantity = document.querySelector("#totalQuantity"); 
  const total2 = cart.reduce((total2, canap) => total2 + canap.quantity, 0);
  totalQuantity.textContent = total2;

  //definition prix totale panier
  const totalPrice = document.querySelector("#totalPrice"); 
  const total = cart.reduce((total, canap) => total + canap.price * canap.quantity,0  );
  totalPrice.textContent = total;

 //Reduce permet de passer un tableau [array] en 1 seulme valeur
 //par exemple pour totalPrice il remplace un:

 //canap.forEach((canap)) => {
 // const totalPrixUnitaire = canap.price *canap.quantity
 //total += TotalPrixUnitaire
 //}
}




let inputItemQuantity = document.getElementsByClassName("itemQuantity")
console.log(inputItemQuantity)  

for (const itemQuantity of inputItemQuantity){      //https://bobbyhadz.com/blog/javascript-addeventlistener-is-not-a-function
  itemQuantity.addEventListener("input",  console.log)
}

// function MajItemTotal(id){
//   // const itemToUptdate = cart.find((canap) => canap.id ===id)
//   // console.log(itemToUptdate)
// }

// inputItemQuantity.addEventListener("input", console.log)