$(function(){
    //Get the elements
    const productNametxt = document.getElementById("productNametxt");
    const productPricetxt = document.getElementById("productPricetxt");
    const productCategorytxt = document.getElementById("productCategorytxt");
    const productDescriptiontxt = document.getElementById("productDescriptiontxt");
    const productStocktxt = document.getElementById("productStocktxt");
    const addProductBtn = document.getElementById("addProductBtn");
    const editProductBtn = document.getElementById("updateProductBtn");
    const deleteProductBtn = document.getElementById("removeProductbtn");
    var uploader = document.getElementById("uploader");
    var fileButton = document.getElementById("fileButton");
    var success = 0;
    fileButton.addEventListener("change", function(e) {
        //Get File
        var file = e.target.files[0];
        //Create Storage Ref
        var storageRef = firebase.storage().ref("images/" + file.name);
        //Upload File
        var task = storageRef.put(file);
        //Update Progress Bar
        task.on("state_changed",
            function progress(snapshot) {
                var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                uploader.value = percentage;
            },

            function error(err) {
                window.alert("An error occurred");
            },

            function complete() {
                window.alert("Image successfully uploaded");
                success = 1;
            }
        );
    });
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
        } else if (isNaN(Number(productPrice))) {
            window.alert("Please enter a valid price");
        } else if (isNaN(Number(productStock))) {
            window.alert("Please enter a valid quantity");
        } else if (success == 0) {
            window.alert("Please provide an image for the product");
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
        if (product.length == 0) window.alert("Please enter a valid product name");
        else {
            firebase.database().ref('product/' + product).set(null);
            setTimeout(function () { 
                window.location.href = "ManageProducts.html";
                window.alert("Product successfully removed from the store");
            }, 2000);
        }
    });
    

    //Edit product in the store
    editProductBtn.addEventListener('click', e =>{
        var uProductName = document.getElementById("uProductNametxt").value;
        var uProductPrice = document.getElementById("uProductPricetxt").value;
        var uProductStock = document.getElementById("uProductStocktxt").value;
        var uProductCategory = document.getElementById("uProductCategorytxt").value;
        var uProductDescription = document.getElementById("uProductDescriptiontxt").value;
        if (uProductName.length == 0 || uProductPrice.length == 0 || uProductStock.length == 0 || uProductCategory.length == 0 || uProductDescription.length == 0) { 
            window.alert("Please enter updated product details within all provided fields");
        } else if (isNaN(Number(uProductPrice))) {
            window.alert("Please enter a valid price");
        } else if (isNaN(Number(uProductStock))) {
            window.alert("Please enter a valid quantity");
        } else {
            firebase.database().ref('product/' + uProductName).update({
                productName : uProductName,
                productPrice : uProductPrice,
                productStock : uProductStock,
                productCategory : uProductCategory,
                productDescription : uProductDescription
            });
            setTimeout(function () { 
                window.location.href = "ManageProducts.html";
                window.alert("Product successfully updated");
            }, 2000);
        }
    });





});