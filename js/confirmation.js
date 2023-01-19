
//Extraction de Id Commande  
const urlOrderId = new URLSearchParams(window.location.search).get("orderId");

//On precise ou indiquer le numero de commande
const idCommande = document.getElementById("orderId");
    // On insère le numéro de commande 
    idCommande.innerText = urlOrderId;
    console.log(idCommande);