fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((json) => {
        console.log (json)
        const imageUrl = json[0].imageUrl
        console.log (imageUrl)


        const anchor = document.createElement("a")   
        anchor.href = imageUrl
        anchor.text= "Kanap Sinopé"
        const items = document.getElementById('items')
        items.appendChild(anchor) 
    
    })

