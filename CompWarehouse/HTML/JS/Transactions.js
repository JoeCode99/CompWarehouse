const heading = document.getElementById('heading');
const transactions = document.getElementById('transactions');

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
    
}