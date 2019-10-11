$(function(){
    //Get the elements - 6 elements per item
    //const productNametxt = document.getElementById("productNametxt");
    //const productPricetxt = document.getElementById("productPricetxt");
    //const productCategorytxt = document.getElementById("productCategorytxt");
    //const productDescriptiontxt = document.getElementById("productDescriptiontxt");
    //const productStocktxt = document.getElementById("productStocktxt");
    //const addProductBtn = document.getElementById("addProductBtn");
    //const editProductBtn = document.getElementById();
    
    //creating the double array
    var i = 0;
    var store = new Array(100);
    for (i = 0; i < 100; i++) {
        store[i] = new Array(6);
    }
    

    var storageRef = firebase.storage().ref();
    //populating the grid
    function makeGrid(store) {
        var list = document.getElementById("products");
        for (var j = 0; j < store.length; j++) {
            if (store[j][0].length != 0) {
                var item = document.createElement("div");
                identifier = "grid" + j.toString(10);
                item.setAttribute("class", "store");
                item.setAttribute("id", String(j));

                var nameTxt = document.createElement("p");
                nameTxt.setAttribute("class", "nameTxt");
                var priceTxt = document.createElement("p");
                priceTxt.setAttribute("class", "priceTxt");
                var stockTxt = document.createElement("p");
                stockTxt.setAttribute("class", "stockTxt");
                var catTxt = document.createElement("p");
                catTxt.setAttribute("class", "catTxt");
                //image creation
                var image = document.createElement("img");
                image.setAttribute("class", "productImage");
                //(function() {
                //    storageRef.child('images/' + store[j][0] + '.png').getDownloadURL().then(url => {
                //        image.src = url;
                //    }).catch(function(error) {
                //       console.log(error);
                //    });
                //})(); 
                var path = "../img/" + store[j][0] + ".png";
                image.src = path;
                item.appendChild(image);

                var name = document.createTextNode(store[j][0]);
                nameTxt.appendChild(name);
                var test = parseInt(store[j][1], 10);
                if (Number.isInteger(test)) {
                    test = test.toFixed(0).replace(/\d(?=(\d{3})+\.)/g, '$&,');
                } else {
                    test = test.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
                }
                var price = document.createTextNode("$" + test);
                priceTxt.appendChild(price);
                if (store[j][2] <= 0) store[j][2] = "Out of Stock"; 
                var stock = document.createTextNode(store[j][2]);
                stockTxt.appendChild(stock);
                var cat = document.createTextNode(store[j][3]);
                catTxt.appendChild(cat);

                item.appendChild(nameTxt);
                item.appendChild(priceTxt);
                item.appendChild(stockTxt);
                item.appendChild(catTxt);

                
                list.appendChild(item);
                document.getElementById(String(j)).onclick = function() {
                    if (event.srcElement.id.length != 0) {
                        var name = store[event.srcElement.id][0];
                        localStorage.setItem("productName", name);
                        window.location.href = "ProductView.html";
                    } else {
                        var name = store[event.srcElement.parentNode.id][0];
                        localStorage.setItem("productName", name);
                        window.location.href = "ProductView.html"; //this allows you to go back, replace doesn't
                    }
                };
            }
        }
        
        return list;
    }
    
    var productsRef = firebase.database().ref('product');
    i = 0;
    //getting data from the database
    productsRef.on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var childData = childSnapshot.val();
            store[i][0] = childData.productName;
            store[i][1] = childData.productPrice;
            store[i][2] = childData.productStock;
            store[i][3] = childData.productCategory;
            store[i][4] = childData.productDescription;
            store[i][5] = childData.productStore;
            i++;
        });
        //sorting the list
        function sortFunction(a, b) {
            if (a[0] == b[0]) return 0;
            else return (a[0] < b[0]) ? -1 : 1;
        }
        store.sort(sortFunction);
        //need to do this after the list has been populated.
        document.getElementById("placeholder").style.display = "none";
        makeGrid(store);
        
    });

    

});