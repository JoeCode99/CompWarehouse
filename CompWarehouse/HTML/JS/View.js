// Get Elements
const productsMenuBtn = document.getElementById("productsMenuBtn");
const transactionsMenuBtn = document.getElementById("transactionsMenuBtn");
const sellerDbx = document.getElementById("sellerDbx");

// Store Select
sellerDbx.value = localStorage.getItem("storeSelect") || "Store 1";
console.log(localStorage.getItem("storeSelect"));
sellerDbx.onchange = function dropMenuChange() {
    localStorage.setItem("storeSelect", sellerDbx.value);
    console.log(localStorage.getItem("storeSelect"));
}

// Show/Hide Admin Controls
firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        var userid = firebase.auth().currentUser.uid;
        if (userid == "UFBAYohIXaOZeqfzyCDR639r8mr1") {
            productsMenuBtn.style.display = "block";
            transactionsMenuBtn.style.display = "block";
        } else if (userid == "4HbaT58rqANXjhhrKsBW1F7Zlhm1") {
            productsMenuBtn.style.display = "block";
            transactionsMenuBtn.style.display = "block";
        } else if (userid == "0u9RCtkvEsV041hA05xoypi9vX13") {
            productsMenuBtn.style.display = "block";
            transactionsMenuBtn.style.display = "block";
        } else if (userid == "Q0llPZ7bAQPM72hL7Bpv95toxzo2") {
            productsMenuBtn.style.display = "block";
            transactionsMenuBtn.style.display = "block";
        } else {
            productsMenuBtn.style.display = "none";
            transactionsMenuBtn.style.display = "none";
        }
    } else {
        productsMenuBtn.style.display = "none";
        transactionsMenuBtn.style.display = "none";
    }
});

function goToStore() {
    window.location.href = "Store.html";
}

