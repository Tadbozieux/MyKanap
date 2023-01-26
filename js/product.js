const queryString = window.location.search; //https://blog.arcoptimizer.com/obtenir-les-parametres-durl-avec-javascript-2
//console.log (queryString);
const urlParams = new URLSearchParams(queryString);
//console.log (urlParams);
const id = urlParams.get("id");
//console.log (id)

fetch(`http://localhost:3000/api/products/${id}`) //https://www.youtube.com/watch?v=SJ2oWKEmCoE    /
  .then((response) => response.json()) //https://stackoverflow.com/questions/35835362/what-does-dollar-sign-and-curly-braces-mean-in-a-string-in-javascript
  .then((json) => {
    // console.log(json)
    return addInformations(json);
  });

function addInformations(kanape) {
  document.querySelector(
    ".item__img"
  ).innerHTML = `<img src="${kanape.imageUrl}" alt="${kanape.altTxt}"></img>`;
  document.getElementById("title").textContent = kanape.name;
  document.getElementById("price").textContent = kanape.price;
  document.getElementById("description").textContent = kanape.description;
  kanape.colors.forEach(
    (color) =>
      (document.getElementById(
        "colors"
      ).innerHTML += `<option value="${color}">${color}</option>`)
  );

  document.querySelector("#addToCart").addEventListener("click", (e) => {
    // e.preventDefault();

    const color = document.getElementById("colors").value;
    const quantity = Number(document.getElementById("quantity").value);

    if (!color || color === "" || !quantity || quantity < 0 || quantity > 101) {
      //Si les conditions ne sont pas correctes emssage erreur:
      alert("Veuillez selectionner une couleur parmis le choix proposé ainsi qu'une quantité comprise entre 1 et 100")
      //document.querySelector('article').innerHTML('beforeend', `<span class="error">Veuillez selectionner une couleur parmis le choix proposé ainsi qu'une quantité comprise entre 1 et 100</span>`);
    } else {
      const key = "panier";
      let myCart = JSON.parse(localStorage.getItem(key));
      console.log(myCart);
      const item = {
        id: id,
        info: {
          personalisation: [{ color: color, quantity: quantity }],
          price: kanape.price,
          description: kanape.description,
          name: kanape.name,
          imageUrl: kanape.imageUrl,
          altTxt: kanape.altTxt,
        },
      };

      if (!myCart) {
        myCart = [];
        myCart.push(item);
        localStorage.setItem(key, JSON.stringify(myCart));
      } else {
        const tabId = myCart.map(kanap => kanap.id);
        // donnée poussée dans le tableau
        if (tabId.includes(id)) {

					const newTable = myCart.filter(canape =>{
						if ( canape.id === id) {
							const tabColor = canape.info.personalisation.map((x) => x.color);
						if(tabColor.includes(color)){
							canape.info.personalisation.map(x => {
								if (x.color === color) {
											  x.quantity = Number(x.quantity) + quantity;
										}
							})
						}else{
							canape.info.personalisation.push({color : color, quantity: quantity })
							
						}
							return canape	
						}
				 	})

					localStorage.setItem(key, JSON.stringify(myCart));
					console.log(myCart)

        } else {
          myCart.push(item);
          localStorage.setItem(key, JSON.stringify(myCart));
          console.log(myCart)
        }
      }

      
       document.location.href = "cart.html"
    }
  });
}


