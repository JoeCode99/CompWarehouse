const heading = document.getElementById('heading');
const transactions = document.getElementById('transactions');
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
    dataRef.on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
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
            data += "<td style='border-bottom: 0px'><button onclick='viewElement(" + i + ")'>View</button></td>";
        }
        data += "</tr></table>";
        transactions.innerHTML = data;
    });   
}

function viewElement(i) {
    
}