const queryString = window.location.search;    //https://blog.arcoptimizer.com/obtenir-les-parametres-durl-avec-javascript-2
console.log (queryString);
const urlParams = new URLSearchParams (queryString);
console.log (urlParams);
const id = urlParams.get("id")
console.log (id)



// fetch("http://localhost:3000/api/products/${id}")
//     .then((res) => res.json())
//     .then((json) => {
//         console.log(json)
       
//     })   
    

    // function addProducts(donnees){
        
      
       
    //     donnees.map(canap => {
    //         document.querySelector('#cart__items').innerHTML += `
    //         <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
    //         <div class="cart__item__img">
    //           <img src="../images/product01.jpg" alt="Photographie d\'un canapé">
    //         </div>
    //         <div class="cart__item__content">
    //           <div class="cart__item__content__description">
    //             <h2>Nom du produit</h2>
    //             <p>Vert</p>
    //             <p>42,00 €</p>
    //           </div>
    //           <div class="cart__item__content__settings">
    //             <div class="cart__item__content__settings__quantity">
    //               <p>Qté : </p>
    //               <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
    //             </div>
    //             <div class="cart__item__content__settings__delete">
    //               <p class="deleteItem">Supprimer</p>
    //             </div>
    //           </div>
    //         </div>
    //       </article>;`
    //     })
    // }