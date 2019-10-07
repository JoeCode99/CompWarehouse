// Get elements
const emailTxt = document.getElementById('emailTxt');
const firstNameTxt = document.getElementById('firstNameTxt');
const lastNameTxt = document.getElementById('lastNameTxt');
const phoneTxt = document.getElementById('phoneTxt');
const addressTxt = document.getElementById('addressTxt');
const companyTxt = document.getElementById('companyTxt');
const storeDbx = document.getElementById('storeDbx');
const firstNameTxt2 = document.getElementById('firstNameTxt2');
const lastNameTxt2 = document.getElementById('lastNameTxt2');
const phoneTxt2 = document.getElementById('phoneTxt2');
var view = 0;
const cardNumberTxt = document.getElementById('cardNumberText');
const cardNameTxt = document.getElementById('cardNameTxt');
const cardDateTxt = document.getElementById('cardDateTxt');
const cardCodeTxt = document.getElementById('cardCodeTxt');
const billingTxt = document.getElementById('billingTxt');
var cat = new Array(5);
displayItems();

function displayItems() {
    var data = '<table class="table" style="margin-left: 10px"><tr><th>Item Name</th><th>Quantity</th><th>Unit Price</th><th>Total</th></tr>';
    
    var cart = JSON.parse(localStorage.getItem('cart')) || [];
    console.log(cart);
    var total = 0;

    for (var i = 0; i < cart.length; i++) {
        total += cart[i].quantity * cart[i].price;
        data += "<tr><td>" + cart[i].name + "</td>";
        data += "<td>" + cart[i].quantity + "</td>";
        data += "<td>$" + cart[i].price + ".00</td>";
        data += "<td>$" +  cart[i].quantity * cart[i].price + ".00</td>";
        if (i < 5) cat[i] = cart[i].name;
    }
    data += '<tr><td></td><td></td><td></td><td>$' + total + '.00</td></tr></table>'

    document.getElementById('items').innerHTML = data;
}

firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        console.log(firebaseUser);
        var userid = firebase.auth().currentUser.uid;
        emailTxt.setAttribute("value", firebase.auth().currentUser.email);

        var firstNameRef = firebase.database().ref('user/' + userid + '/firstname');
        firstNameRef.once('value', function(snapshot) {
            firstNameTxt.setAttribute("value", snapshot.val());
            firstNameTxt2.setAttribute("value", snapshot.val()); 
        });

        var lastNameRef = firebase.database().ref('user/' + userid + '/lastname');
        lastNameRef.once('value', function(snapshot) {
            lastNameTxt.setAttribute("value", snapshot.val());
            lastNameTxt2.setAttribute("value", snapshot.val()); 
        });

        var addressRef = firebase.database().ref('user/' + userid + '/address');
        addressRef.once('value', function(snapshot) {
            addressTxt.setAttribute("value", snapshot.val());
            billingTxt.setAttribute("value", snapshot.val()); 
        });
    }
});

function deliveryBtn() {
    document.getElementById('deliveryBtn').className = 'button3s';
    document.getElementById('collectBtn').className = 'button3';
    document.getElementById('deliveryDiv').style.display = 'block';
    document.getElementById('collectDiv').style.display = 'none';
    view = 0;
}

function collectBtn() {
    document.getElementById('collectBtn').className = 'button3s';
    document.getElementById('deliveryBtn').className = 'button3';
    document.getElementById('collectDiv').style.display = 'block';
    document.getElementById('deliveryDiv').style.display = 'none';
    view = 1;
}

function editCart() {
    window.location.href = "Cart.html";
}

function viewPayment() {
    var email = emailTxt.value.trim();
    var firstname = firstNameTxt.value.trim();
    var lastname = lastNameTxt.value.trim();
    var address = addressTxt.value.trim();
    var phone = phoneTxt.value.trim();

    var firstname2 = firstNameTxt2.value.trim();
    var lastname2 = lastNameTxt2.value.trim();
    var phone2 = phoneTxt2.value.trim();
    var store = storeDbx.value;

    if (view == 0) {
        if (email.length == 0) window.alert("Please enter your email address");
        else if (!email.includes("@")) window.alert("Please enter a valid email address");
        else if (firstname.length == 0) window.alert("Please enter your first name");
        else if (lastname.length == 0) window.alert("Please enter your last name");
        else if (phone.length == 0) window.alert("Please enter your phone number");
        else if (!Number.isInteger(Number(phone))) window.alert("Please enter a valid phone number");
        else if (phone.length > 15) window.alert("Please enter a valid phone number");
        else if (address.length == 0) window.alert("Please enter your address");
        else {
            document.getElementById('contactDiv').style.display = 'none';
            document.getElementById('paymentDiv').style.display = 'block';
        }
    } else if (view == 1) {
        if (email.length == 0) window.alert("Please enter your email address");
        else if (!email.includes("@")) window.alert("Please enter a valid email address");
        else if (store == 0) window.alert("Please select a store");
        else if (firstname2.length == 0) window.alert("Please enter your first name");
        else if (lastname2.length == 0) window.alert("Please enter your last name");
        else if (phone2.length == 0) window.alert("Please enter your phone number");
        else if (!Number.isInteger(Number(phone2))) window.alert("Please enter a valid phone number");
        else if (phone2.length > 15) window.alert("Please enter a valid phone number");
        else {
            document.getElementById('contactDiv').style.display = 'none';
            document.getElementById('paymentDiv').style.display = 'block';
        }
    }
}

function backBtn() {
    document.getElementById('contactDiv').style.display = 'block';
    document.getElementById('paymentDiv').style.display = 'none';
}

function completeOrder() {
    var cardNumber = cardNumberTxt.value.trim();
    var cardName = cardNameTxt.value.trim();
    var cardDate = cardDateTxt.value.trim();
    var cardCode = cardCodeTxt.value.trim();
    var billing = billingtxt.value.trim();

    if (cardNumber.length == 0) window.alert("Please enter your card number");
    else if (cardName.length == 0) window.alert("Please enter the name on your card");
    else if (cardDate.length == 0) window.alert("Please enter your card expiry date (MM/YY)");
    else if (cardDate.length > 5) window.alert("Please enter your card expiry date in the format (MM/YY)");
    else if (cardDate.contains("/")) window.alert("Please enter your card expiry date in the format (MM/YY)");
    else if (cardCode.length == 0) window.alert("Please enter your card security code");
    else {
        
    }
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
        //document.getElementById("placeholder").style.display = "none";
        makeGrid(store);
    });
}


