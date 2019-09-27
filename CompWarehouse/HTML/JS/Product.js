$(function(){
    //Get the elements
    const productNametxt = document.getElementById("productNametxt");
    const productPricetxt = document.getElementById("productPricetxt");
    const productCategorytxt = document.getElementById("productCategorytxt");
    const productDescriptiontxt = document.getElementById("productDescriptiontxt");
    const productStocktxt = document.getElementById("productStocktxt");
    const addProductBtn = document.getElementById("addProductBtn");
    //const editProductBtn = document.getElementById();

    //Add product to the store
    addProductBtn.addEventListener('click', e => {
        var productName = productNametxt.value.trim();
        var productPrice = productPricetxt.value.trim();
        var productCategory = productCategorytxt.value.trim();
        var productDescription = productDescriptiontxt.value.trim();
        var productStock = productStocktxt.value.trim();
        var userid = firebase.auth().currentUser.uid;
        if (productName.length == 0 || productPrice.length == 0 || productCategory.length == 0 || productDescription.length == 0 || productStock.length == 0) {
            window.alert("Please enter information within all provided fields");
        } else {
            firebase.database().ref('product/' + productName).set({
                productName : productName,
                productPrice : productPrice,
                productCategory : productCategory,
                productDescription : productDescription,
                productStock : productStock,
                productStore : userid
            });
        }
    });






});