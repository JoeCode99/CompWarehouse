$(function(){
    //Get the elements
    const productNametxt = document.getElementById("productNametxt");
    const productPricetxt = document.getElementById("productPricetxt");
    const productCategorytxt = document.getElementById("productCategorytxt");
    const productDescriptiontxt = document.getElementById("productDescriptiontxt");
    const productStocktxt = document.getElementById("productStocktxt");
    const addProductBtn = document.getElementById("addProductBtn");
    //const editProductBtn = document.getElementById();
    const deleteProductBtn = document.getElementById("removeProductbtn");

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
            setTimeout(function () { 
                window.location.href = "ManageProducts.html";
                window.alert("Product successfully added to the store");
            }, 2000);
        }
    });

    //Remove product from the store
    deleteProductBtn.addEventListener('click', e =>{
        var product = document.getElementById("producttxt").value.trim();
        firebase.database().ref('product/' + product).set(null);
    });





});