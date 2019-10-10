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
const cardNumberTxt = document.getElementById('cardNumberTxt');
const cardNameTxt = document.getElementById('cardNameTxt');
const cardDateTxt = document.getElementById('cardDateTxt');
const cardCodeTxt = document.getElementById('cardCodeTxt');
const billingTxt = document.getElementById('billingTxt');
const sellerDbx = document.getElementById('sellerDbx');
const contactDiv = document.getElementById('contactDiv');
const paymentDiv = document.getElementById('paymentDiv');
const confirmationDiv = document.getElementById('confirmationDiv');

var email = '';
var firstname = '';
var lastname = '';
var address = '';
var phone = '';

var firstname2 = '';
var lastname2 = '';
var phone2 = '';
var store = '';
var cart = [];
var total = 0;

displayItems();

function displayItems() {
    var data = '<table class="table" style="margin-left: 10px"><tr><th>Item Name</th><th>Quantity</th><th>Unit Price</th><th>Total</th></tr>';
    
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    console.log(cart);
    total = 0;

    for (var i = 0; i < cart.length; i++) {
        total += cart[i].quantity * cart[i].price;
        data += "<tr><td>" + cart[i].name + "</td>";
        data += "<td>" + cart[i].quantity + "</td>";
        data += "<td>$" + cart[i].price + ".00</td>";
        data += "<td>$" +  cart[i].quantity * cart[i].price + ".00</td>";
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
    email = emailTxt.value.trim();
    firstname = firstNameTxt.value.trim();
    lastname = lastNameTxt.value.trim();
    address = addressTxt.value.trim();
    phone = phoneTxt.value.trim();

    firstname2 = firstNameTxt2.value.trim();
    lastname2 = lastNameTxt2.value.trim();
    phone2 = phoneTxt2.value.trim();
    store = storeDbx.value;

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
    var cardNumber = cardNumberTxt.value.trim() || '';
    var cardName = cardNameTxt.value.trim();
    var cardDate = cardDateTxt.value.trim();
    var cardCode = cardCodeTxt.value.trim();
    var billing = billingTxt.value.trim();
    var userid = firebase.auth().currentUser.uid;

    if (sellerDbx.value == 1) var sellerid = '4HbaT58rqANXjhhrKsBW1F7Zlhm1';
    else if (sellerDbx.value == 2) var sellerid = '0u9RCtkvEsV041hA05xoypi9vX13';
    else if (sellerDbx.value == 3) var sellerid = 'Q0llPZ7bAQPM72hL7Bpv95toxzo2';
    
    if (storeDbx.value == 1) var location = 'Broadway';
    else if (storeDbx.value == 2) var location = 'Chatswood';
    else if (storeDbx.value == 3) var location = 'Parramatta';

    if (cardNumber.length == 0) window.alert("Please enter your card number");
    else if (cardName.length == 0) window.alert("Please enter the name on your card");
    else if (cardDate.length == 0) window.alert("Please enter your card expiry date (MM/YY)");
    else if (!cardDate.length > 5) window.alert("Please enter your card expiry date in the format (MM/YY)");
    else if (cardCode.length == 0) window.alert("Please enter your card security code");
    else if (view == 0){
        var key = firebase.database().ref('transaction/').push().key;
        firebase.database().ref('transaction/' + key).set({
            transactionid : key,
            userid : userid,
            sellerid : sellerid,
            email : email,
            firstname : firstname,
            lastname : lastname,
            phone : phone,
            address : address,
            billing : billing || address,
            company : companyTxt.value || 'none',
            collection : 'Delivery',
            totalprice : total,
            items : cart,
            payment : {
                cardnumber : cardNumber,
                cardname : cardName,
                cardexpiry : cardDate,
                cardcvv : cardCode
            }
        });
        localStorage.setItem('cart', JSON.stringify([]));
        confirmationDiv.style.display = 'block';
        paymentDiv.style.display = 'none';


    } else if (view == 1) {
        var key = firebase.database().ref('transaction/').push().key;
        firebase.database().ref('transaction/' + key).set({
            transactionid : key,
            userid : userid,
            sellerid : sellerid,
            email : email,
            firstname : firstname2,
            lastname : lastname2,
            phone : phone2,
            billing : billing,
            location : location,
            collection : 'Pick-Up',
            totalprice : total,
            items : cart,
            payment : {
                cardnumber : cardNumber,
                cardname : cardName,
                cardexpiry : cardDate,
                cardcvv : cardCode
            }
        });
        localStorage.setItem('cart', JSON.stringify([]));
        confirmationDiv.style.display = 'block';
        paymentDiv.style.display = 'none';
    }
}

function homeBtn() {
    confirmationDiv.style.display = 'none';
    contactDiv.style.display = 'block';
    window.location.href = "CompWarehouse.html";
}




