
const productsMenuBtn = document.getElementById("productsMenuBtn");
const transactionsMenuBtn = document.getElementById("transactionsMenuBtn");

firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        var userid = firebase.auth().currentUser.uid;
        if (userid == "UFBAYohIXaOZeqfzyCDR639r8mr1") {
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