let myCart;
let totalProducts;
let totalPrice;

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









