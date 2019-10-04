$(function(){
    const nameTxt = document.getElementById("nameTxt");
    const image = document.getElementById("image");
    const priceTxt = document.getElementById("priceTxt");
    const categoryTxt = document.getElementById("categoryTxt");
    const descriptionTxt = document.getElementById("descriptionTxt");
    const stockTxt = document.getElementById("stockTxt");
    const quantityTxt = document.getElementById("quantityTxt");
    const quantityDbx = document.getElementById("quantityDbx")
    const cartBtn = document.getElementById("cartBtn");
    
    nameTxt.style.display = "none";
    priceTxt.style.display = "none";
    categoryTxt.style.display = "none";
    descriptionTxt.style.display = "none";
    stockTxt.style.display = "none";
    quantityDbx.style.display = "none";
    quantityTxt.style.display = "none";
    cartBtn.style.display = "none";

    // Get and set product name from storage
    var productName = localStorage.getItem("productName");
    nameTxt.innerText = productName;
    var productPrice = 0;

    var priceRef = firebase.database().ref('product/' + productName + '/productPrice');
    priceRef.on('value', function(snapshot) {
        var price = snapshot.val();
        productPrice = price;
        priceTxt.innerText = "Price: $" + price;
    });

    var categoryRef = firebase.database().ref('product/' + productName + '/productCategory');
    categoryRef.on('value', function(snapshot) {
        var category = snapshot.val();
        categoryTxt.innerText = "Category: " + category;
    });

    var descriptionRef = firebase.database().ref('product/' + productName + '/productDescription');
    descriptionRef.on('value', function(snapshot) {
        var description = snapshot.val();
        descriptionTxt.innerText = "Description: " + description;
    });

    var stockRef = firebase.database().ref('product/' + productName + '/productStock');
    stockRef.on('value', function(snapshot) {
        var stock = snapshot.val();
        image.src = "../img/" + productName + ".png";
        stockTxt.innerText = "Stock Available: " + stock;
        document.getElementById("placeholder").style.display = "none";
        nameTxt.style.display = "block";
        priceTxt.style.display = "block";
        categoryTxt.style.display = "block";
        descriptionTxt.style.display = "block";
        stockTxt.style.display = "block";
        quantityDbx.style.display = "block";
        cartBtn.style.display = "block";
        quantityTxt.style.display = "block";
    });

    cartBtn.addEventListener('click', e => {
        var productQuantity = quantityDbx.options[quantityDbx.selectedIndex].value;
        var item = {
            name : productName,
            quantity : productQuantity,
            price : productPrice
        };
        var cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(item);
        localStorage.setItem('cart', JSON.stringify(cart));
        window.location.href = "Cart.html";
    });

});
