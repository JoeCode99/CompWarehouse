const heading = document.getElementById('heading');
const transactions = document.getElementById('transactions');
const view1 = document.getElementById('view1');
const view2 = document.getElementById('view2');
const useridTxt = document.getElementById('useridTxt');
const useridTxt2 = document.getElementById('useridTxt2');
const transactionidTxt = document.getElementById('transactionidTxt');
const transactionidTxt2 = document.getElementById('transactionidTxt2');
const nameTxt = document.getElementById('nameTxt');
const nameTxt2 = document.getElementById('nameTxt2');
const emailTxt = document.getElementById('emailTxt');
const emailTxt2 = document.getElementById('emailTxt2');
const phoneTxt = document.getElementById('phoneTxt');
const phoneTxt2 = document.getElementById('phoneTxt2');
const storeTxt = document.getElementById('storeTxt');
const storeTxt2 = document.getElementById('storeTxt2');
const addressTxt = document.getElementById('addressTxt');
const billingTxt = document.getElementById('billingTxt');
const billingTxt2 = document.getElementById('billingTxt2');
const cardTxt = document.getElementById('cardTxt');
const cardTxt2 = document.getElementById('cardTxt2');
const pickupTxt = document.getElementById('pickupTxt');


var items = [];

firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        console.log(firebaseUser);
        var userid = firebase.auth().currentUser.uid;
        if (userid == '4HbaT58rqANXjhhrKsBW1F7Zlhm1') {
            heading.innerText = "Broadway Store Transactions";
        } else if (userid == '0u9RCtkvEsV041hA05xoypi9vX13') {
            heading.innerText = "Chatswood Store Transactions";
        } else if (userid == 'Q0llPZ7bAQPM72hL7Bpv95toxzo2') {
            heading.innerText = "Parramatta Store Transactions";
        } else if (userid == 'UFBAYohIXaOZeqfzyCDR639r8mr1') {
            heading.innerText == "All Store Transactions"
        }
    }
});

displayTransactions();

function displayTransactions() {
    var dataRef = firebase.database().ref('transaction');
    dataRef.on('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            items.push(childSnapshot.val());
        });
        console.log(items);

        var data = '<table class="table"><tr><th>Transaction ID</th><th>User ID</th><th>Name</th><th>Email</th><th>Total Price</th><th>Items</th><th>Type</th><th>Store</th></tr>';

        for (var i = 0; i < items.length; i++) {
            if (items[i].sellerid == '4HbaT58rqANXjhhrKsBW1F7Zlhm1') var store = 'Broadway';
            else if (items[i].sellerid == '0u9RCtkvEsV041hA05xoypi9vX13') var store = 'Chatswood';
            else if (items[i].sellerid == 'Q0llPZ7bAQPM72hL7Bpv95toxzo2') var store = 'Parramatta';


            data += "<tr><td>" + items[i].transactionid + "</td>";
            data += "<td>" + items[i].userid + "</td>";
            data += "<td>" + items[i].firstname + " " + items[i].lastname; + "</td>";
            data += "<td>" + items[i].email + "</td>";
            data += "<td>$" + items[i].totalprice + ".00</td>";
            data += "<td>" + items[i].items.length; + "</td>";
            data += "<td>" + items[i].collection + "</td>";
            data += "<td>" + store + "</td>";
            data += "<td style='border-bottom: 0px'><button class='button4' color: white' onclick='viewElement(" + i + ")'>View</button></td>";
        }
        data += "</tr></table>";
        transactions.innerHTML = data;
    });
}

function viewElement(a) {
    if (items[a].sellerid == '4HbaT58rqANXjhhrKsBW1F7Zlhm1') var store = 'Broadway';
    else if (items[a].sellerid == '0u9RCtkvEsV041hA05xoypi9vX13') var store = 'Chatswood';
    else if (items[a].sellerid == 'Q0llPZ7bAQPM72hL7Bpv95toxzo2') var store = 'Parramatta';

    if (items[a].collection == 'Delivery') {
        transactionidTxt.innerHTML = "<strong>Transaction ID: </strong>" + items[a].transactionid;
        useridTxt.innerHTML = "<strong>User ID: </strong>" + items[a].userid;
        nameTxt.innerHTML = "<strong>Name: </strong>" + items[a].firstname + " " + items[a].lastname;
        emailTxt.innerHTML = "<strong>Email: </strong>" + items[a].email;
        phoneTxt.innerHTML = "<strong>Phone Number: </strong>" + items[a].phone;
        storeTxt.innerHTML = "<strong>Store: </strong>" + store;
        addressTxt.innerHTML = "<strong>Delivery Address: </strong>" + items[a].address;
        billingTxt.innerHTML = "<strong>Billing Address: </strong>" + items[a].billing;
        cardTxt.innerHTML = "<strong>Credit Card Number: </strong>**** **** **** " + items[a].payment.cardnumber.slice(12, 16);
        view1.style.display = 'grid';
        transactions.style.display = 'none';
    } else if (items[a].collection == 'Pick-Up') {
        transactionidTxt2.innerHTML = "<strong>Transaction ID: </strong>" + items[a].transactionid;
        useridTxt2.innerHTML = "<strong>User ID: </strong>" + items[a].userid;
        nameTxt2.innerHTML = "<strong>Name: </strong>" + items[a].firstname + " " + items[a].lastname;
        emailTxt2.innerHTML = "<strong>Email: </strong>" + items[a].email;
        phoneTxt2.innerHTML = "<strong>Phone Number: </strong>" + items[a].phone;
        storeTxt2.innerHTML = "<strong>Store (Purchase): </strong>" + store;
        pickupTxt.innerHTML = "<strong>Store (Pick-Up): </strong>" + items[a].location; 
        billingTxt2.innerHTML = "<strong>Billing Address: </strong>" + items[a].billing;
        cardTxt2.innerHTML = "<strong>Credit Card Number: </strong>**** **** **** " + items[a].payment.cardnumber.slice(12, 16);
        view2.style.display = 'grid';
        transactions.style.display = 'none';
    }

    var cartdata = '<table class="table" style="margin-left: 10px"><tr><th>Item Name</th><th>Quantity</th><th>Unit Price</th><th>Total</th></tr>';
    var cart = items[a].items;
    for (var i = 0; i < cart.length; i++) {
        cartdata += "<tr><td>" + cart[i].name + "</td>";
        cartdata += "<td>" + cart[i].quantity + "</td>";
        cartdata += "<td>$" + cart[i].price + ".00</td>";
        cartdata += "<td>$" + cart[i].quantity * cart[i].price + ".00</td>";
    }
    cartdata += '<tr><td></td><td></td><td></td><td>$' + items[a].totalprice + '.00</td></tr></table>';

    document.getElementById('cart').innerHTML = cartdata;
    document.getElementById('cart2').innerHTML = cartdata;
}

function backBtn() {
    view1.style.display = 'none';
    view2.style.display = 'none';
    transactions.style.display = 'block';
}
