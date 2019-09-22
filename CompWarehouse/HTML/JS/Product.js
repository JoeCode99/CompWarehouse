(function(){
    //Get the elements
    const productNametxt = document.getElementById("productNametxt");
    const productPricetxt = document.getElementById("productPricetxt");
    const productCategorytxt = document.getElementById("productCategorytxt");
    const productDescriptiontxt = document.getElementById("productDescriptiontxt");
    const productStocktxt = document.getElementById();
    const addProductBtn = document.getElementById("addProductBtn");
    const editProuctBtn = document.getElementById();

    //Add product to the store
    addProductBtn.addEventListener('click', e =>{
        var productName = productNametxt.value;
        var productPrice = productPricetxt.value;
        var productCategory = productCategorytxt.value;
        var productDescription = productDescriptiontxt.value;
        var productStock = productStocktxt.value;

        firebase.database().ref('product/').set({
            productName : productName,
            productPrice : productPrice,
            productCategory : productCategory,
            productDescription : productDescription,
            productStock : productStock
        })
    })






});