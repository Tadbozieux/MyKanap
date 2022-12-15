fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((json) => {
        console.log(json)
        return addProducts(json)
    })    //une fois les données du fetch reçues, envoyer vers la fonction AddProduct
    

    function addProducts(donnees){   

        for (let i = 0;i < donnees.length; i++){
            console.log("Kanap number" , i , donnees[i])


            const items = document.getElementById('items')  //Creation variable de l'ID "items"
            const id = donnees[i]._id         //recherche de l'element 0 de l'array
            const anchor = document.createElement("a")      //Creation du lien "card"
            items.appendChild(anchor)                       //affiliation anchor
            anchor.href = "./product.html?id=" + id                    //Liens vers l'objet ciblé
            
                
            
        
    
            const article = document.createElement("article")
            anchor.appendChild(article) 
            console.log(article)
    
    
    
            const image = document.createElement("img")
            article.appendChild(image)
            console.log(image)
            const imageUrl = donnees[i].imageUrl
            const imageAlt = donnees[i].altTxt
            image.src = imageUrl
            image.alt = imageAlt
    
    
    
            
    
    
            const h3 = document.createElement("h3")
            article.appendChild(h3)
            console.log(h3)
            const name = donnees[i].name
            h3.classList.add("productName")
            h3.textContent = name
            
    
    
    
            const p = document.createElement("p")
            article.appendChild(p)
            console.log(p)
            const description = donnees[i].description
            p.textContent = description
        }
        
       

        
    }
    

   
    