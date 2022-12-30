const itemsPanier = localStorage.length
const cart = []
let quantityProductPanier = 0;

let selectSupprimer = 0


for (let i = 0 ; i < itemsPanier; i++){
    let item= localStorage.getItem(localStorage.key(i))
    // console.log("objet a la position " , i, "est", item) //donnes les items de JSON
    const objetitem = JSON.parse(item)   //transforme JSON en Objet  (inverse JSON.stringify)
    // console.log(objetitem)
    cart.push(objetitem)   
    // console.log(cart)
       
  }
    cart.map (canap => {            // incorporation du HTML
        document.querySelector('#cart__items').innerHTML += `
        <article class="cart__item" data-id="${canap.id}" data-color="${canap.color}">
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
              <p class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      </article>      
            `
           
            
            
          })
          
          
          const totalQuantity = document.querySelector("#totalQuantity")        //definition quantitié totale panier
          const total2 = cart.reduce((total2, canap) => total2 + canap.quantity, 0)
          totalQuantity.textContent = total2
            

          const totalPrice = document.querySelector("#totalPrice")              //definition prix totale panier
          const total = cart.reduce((total, canap) => total + canap.price * canap.quantity, 0)
          totalPrice.textContent = total
          
          
          let deleteItem = document.querySelectorAll(".deleteItem");
          console.log(deleteItem)
          console.log(deleteItem.length)
          console.log(total2)
          console.log(canap.id)
          

         


        
        //   function deleteProduct() {
        //     selectSupprimer = document.querySelectorAll(".deleteItem");
        //     console.log (selectSupprimer)
        //     selectSupprimer.forEach((selectSupprimer) => {
        //             selectSupprimer.addEventListener("click" , (event) => {
        //                 event.preventDefault();
                                    
        //                 // On pointe le parent hiérarchique <article> du lien "supprimer"
        //                 let myArticle = selectSupprimer.closest('article');
        //                 console.log(myArticle);
        //                 // on filtre les éléments du localStorage pour ne garder que ceux qui sont différents de l'élément qu'on supprime
        //                 productRegisterInLocalStorage = productRegisterInLocalStorage.filter
        //                 ( element => element.idProduct !== myArticle.dataset.id || element.colorProduct !== myArticle.dataset.color );
                        
        //                 // On met à jour le localStorage
        //                 localStorage.setItem("produit", JSON.stringify(productRegisterInLocalStorage));
                        
        //                 //Alerte produit supprimé
        //                 alert("Ce produit va être supprimé du panier.");
                         
                        
        //                 // On supprime physiquement la balise <article> du produit que l'on supprime depuis son parent, si elle existe
        //                 if (myArticle.parentNode) {
        //                     myArticle.parentNode.removeChild(myArticle);
        //                 }
        //                 //-----Si, du coup, le panier est vide (le localStorage est vide ou le tableau qu'il contient est vide),...
        //                 //...on affiche "Le panier est vide"-------------------------------------------------------------------
        //                 if(productRegisterInLocalStorage === null || productRegisterInLocalStorage.length === 0){
        //                     messagePanierVide();
        //                 }
        //                 else{
        //                 // Et, on recalcule la quantité et le prix total du panier
        //                 recalculTotalQuantity();
        //                 recalculTotalPrice();
        //                 }
        //             }); 
        //     })
        // }



          // const bouton_supp = document.querySelectorAll(".deleteItem");   // On récupère l'élément sur lequel on veut détecter le clic
          // bouton_supp.addEventListener('click', function() {          // On écoute l'événement click
          //   bouton_supp.innerHTML = "C'est cliqué !";               // On change le contenu de notre élément pour afficher "C'est cliqué !"
          // });

        











          
        //   function deletePurchase() {
        //     // Déclaration + Pointage de tous les éléments ".cart__item .deleteItem"
        //     const deletePurchase = document.querySelectorAll(".cart__item .deleteItem")
            
        //     // Pour chaque éléments [...]
        //     deletePurchase.forEach((purchase) => {
        //         // Écoute du click sur bouton "Supprimer" de chaque produit
        //         purchase.addEventListener("click", () => {
        //             // Appel du Panier en Local Storage
        //             // let myCart = JSON.parse(localStorage.getItem("Cart"))
        //             // Boucle : Pour chaque élément du Panier [...]
        //             for (let a = 0, b = cart.length; a < b; a++)
        //                 if (
        //                     // Si correspondance Panier/dataset (id/color)
        //                     cart[a].id === canap.id &&
        //                     cart[a].color === canap.color
        //                 ) {
        //                     // Variable utile pour suppression
        //                     const picked = [a];
        //                     // Suppression de 1 élément à l'indice picked
        //                     cart.splice(picked, 1)
        //                     // Renvoi du (nouveau) panier converti dans le Local Storage 
        //                     localStorage.cart = JSON.stringify(cart)
        
        //                     // Suppression de l'Affichage HTML
        //                     const displayToDelete = document.querySelector(
        //                         `article[data-id="${canap.id}"][data-color="${canap.color}"]`)
        //                     displayToDelete.remove()
        
        //                     // Confirmation(s) de la console
        //                     console.log("Article supprimé")
        //                     console.log("Panier mis à jour :", cart)
        
        //                     // Si Panier vide
        //                     if (cart && cart.length == 0) {
        //                         // Vider Local Storage ([] vide)                       
        //                         window.localStorage.clear()
        //                         // Affichage informatif
        //                         document.querySelector("#totalQuantity").innerHTML = "0"
        //                         document.querySelector("#totalPrice").innerHTML = "0"
        //                         document.querySelector("h1").innerHTML =
        //                             "Vous n'avez pas d'article dans votre panier"
        //                     }
        //                     totalCart(); // Appel de la fonction Total Quantité/Prix
        //                 }
        //         })
        //     })
        // }