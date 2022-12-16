


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
    const description = kanapé.description


let image = document.createElement("img")
image.src = imageUrl
image.alt = altTxt
let parentImg = document.querySelector (".item__img")
parentImg.appendChild (image)


nomKanapé = document.querySelector ("#title .h1")
title.textContent = name


prixKanapé = document.getElementById ("price")
prixKanapé.textContent = price

descriptionKanapé = document.getElementById ("description")
descriptionKanapé.textContent = description

const select = document.getElementById ("colors")

colors.forEach((color) => {                                 //Pour chaque coueleur selon ID
    const option = document.createElement("option")         //créer une option
    option.value = color                                    // dont les choix sonrt les couleurs renseignées
    option.textContent = color
    console.log(color)
    select.appendChild(option)
});

// let optionValue1 = document.createElement("option")              // Methode static non utilisable
// valueKanapé.appendChild (optionValue1)
// let optionValue2 = document.createElement("option")
// valueKanapé.appendChild (optionValue2)
// let optionValue3 = document.createElement("option")
// valueKanapé.appendChild (optionValue3)
// optionValue1.textContent = "Blue"
// optionValue2.textContent = "White"
// optionValue3.textContent = "Black"
}

  
        
     