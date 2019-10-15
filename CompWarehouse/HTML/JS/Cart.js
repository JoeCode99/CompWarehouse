var cat = new Array(5);
displayCart();

function displayCart(){
    var cartdata = '<table class="table"><tr><th>Item Name</th><th>Quantity</th><th>Unit Price</th><th>Total</th></tr>';
    
    var cart = JSON.parse(localStorage.getItem('cart')) || [];
    console.log(cart);
    var total = 0;

    for (var i = 0; i < cart.length; i++) {
        total += cart[i].quantity * cart[i].price;
        cartdata += "<tr><td>" + cart[i].name + "</td>";
        cartdata += "<td>" + cart[i].quantity + "</td>";
        cartdata += "<td>$" + cart[i].price + ".00</td>";
        cartdata += "<td>$" +  cart[i].quantity * cart[i].price + ".00</td>";
        cartdata += "<td style='border-bottom: 0px'><input type='image' onclick='delElement(" + i + ")' src='../img/delete.png' width='25' height='25'></td></tr>";
        if (i < 5) cat[i] = cart[i].name;
    }

    cartdata += '<tr><td></td><td></td><td></td><td>$' + total + '.00</td></tr></table>'

    document.getElementById('cart').innerHTML = cartdata;

}

function delElement(a) {
    var cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(a, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

function clearCart() {
    var cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

function viewShop() {
    window.location.href = "Store.html";
}

function checkout() {
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            var cart = JSON.parse(localStorage.getItem('cart')) || [];
            if (cart[0] == null) {
                alert('Cart is empty.');
            } else {
                window.location.href = "Checkout.html";
            }              
        } else {
            window.location.href = "Login.html";
        }
    });
        
}

    //Recommended Products
var categoryRef = firebase.database().ref("product/" + cat[0] + "/productCategory");
categoryRef.on("value", function(snapshot) {
    var category = snapshot.val();
    cat[0] = category;
    setTimeout(buildStore(), 2000);
});

//creating the double array
var i = 0;
var store = new Array(50);
for (i = 0; i < 50; i++) {
    store[i] = new Array(6);
}

//populating the grid
function makeGrid(store) {
    var list = document.getElementById("products2");
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

function isCategory(category) {
    return cat[0] === category;
}

var productsRef = firebase.database().ref('product');
i = 0;
//getting data from the database
function buildStore() {
    productsRef.on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var childData = childSnapshot.val();
            if (cat[0] === childData.productCategory) {
                store[i][0] = childData.productName;
                store[i][1] = childData.productPrice;
                store[i][2] = childData.productStock;
                store[i][3] = childData.productCategory;
                store[i][4] = childData.productDescription;
                store[i][5] = childData.productStore;
                i++;
            }
        });
        //need to do this after the list has been populated.
        if (cat[0].length != 0) document.getElementById("placeholder").style.display = "none";
        makeGrid(store);
    });
}