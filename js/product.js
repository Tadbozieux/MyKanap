


const queryString = window.location.search;    //https://blog.arcoptimizer.com/obtenir-les-parametres-durl-avec-javascript-2
console.log (queryString);
const urlParams = new URLSearchParams (queryString);
console.log (urlParams);
const id = urlParams.get("id")
console.log (id)



for (let p of urlParams){
    console.log(p)
}



fetch(`http://localhost:3000/api/products/${id}`)   //https://www.youtube.com/watch?v=SJ2oWKEmCoE    /   
    .then((response) => response.json())            //https://stackoverflow.com/questions/35835362/what-does-dollar-sign-and-curly-braces-mean-in-a-string-in-javascript
    .then((json) => {
        console.log(json)
        return addInformations(json)
    })  

function addInformations(kanapé){
    const imageUrl = kanapé.imageUrl
    console.log(imageUrl)
    const name= kanapé.name
    const price = kanapé.price
    const altTxt= kanapé.altTxt
    const colors = kanapé.colors



let image = document.createElement("img")
image.src = imageUrl
image.alt = altTxt
let parentImg = document.querySelector (".item__img")
parentImg.appendChild (image)


nomKanapé = document.querySelector ("#title .h1")
title.textContent = kanapé.name


prixKanapé = document.getElementById ("price")
prixKanapé.textContent = kanapé.price

}

  
        
     