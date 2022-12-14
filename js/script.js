let url = "http://localhost:3000/api/products"
fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((json) =>console.log(json))

//Creation variable de la classe "Items"
let items = document.getElementById('items')   



//Creation de la variable de la balise "a" et nestage

let liensCardCanap = document.createElement("a")   
liensCardCanap.href = "./product.html?id=107fb5b75607497b96722bda5b504926"
liensCardCanap.text= "Kanap Sinopé"
items.appendChild(liensCardCanap)