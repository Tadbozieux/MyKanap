


const queryString = window.location.search;    //https://blog.arcoptimizer.com/obtenir-les-parametres-durl-avec-javascript-2
//console.log (queryString);
const urlParams = new URLSearchParams (queryString);
//console.log (urlParams);
const id = urlParams.get("id")
//console.log (id)






fetch(`http://localhost:3000/api/products/${id}`)   //https://www.youtube.com/watch?v=SJ2oWKEmCoE    /   
    .then((response) => response.json())            //https://stackoverflow.com/questions/35835362/what-does-dollar-sign-and-curly-braces-mean-in-a-string-in-javascript
    .then((json) => {
        console.log(json)
        return addInformations(json)
    })  

function addInformations(kanapé){               //creation variable des composents produit
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
})




const validationPanier = document.querySelector("#addToCart")

validationPanier.addEventListener("click", (e) => {
    const color = document.getElementById("colors").value
    const quantity = document.getElementById("quantity").value
    
    if (color == null || color == "" || quantity == "0"){
        alert("Veuillez selectionner une couleur ainsi qu'une quantité")
        return
    }
        const key = `${id}-${color}`    //Ici Key prend en compte id ET la Couleur sinon un acheter un meme canapé d'une couleur diff supprimerai la saisie precedente! 
        const item = {
        id: id,
        color: color,
        quantity: Number(quantity),
        price: price,
        description: description,
        name: name,
        imageUrl: imageUrl,
        altTxt: altTxt
    }
    
    localStorage.setItem(key, JSON.stringify(item))      //local storage avec stingation de l'objet "Item"
    document.location.href = "cart.html"
    }) 
} 



  
        
     



