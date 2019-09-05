(function() {

    // Get Elements
    const emailTxt = document.getElementById("email");
    const passwordTxt = document.getElementById("pass");
    const loginBtn = document.getElementById("loginBtn");
    const logoutBtn = document.getElementById("logoutBtn");
    const registerBtn = document.getElementById("registerBtn");

    // const firstNameTxt = document.getElementById("firstName");
    // const lastNameTxt = document.getElementById("lastName");
    // const emailTxt2 = document.getElementById("emailAddress");
    // const passwordTxt2 = document.getElementById("password");
    // const addressTxt = document.getElementById("billingAddress");
    

    loginBtn.addEventListener('click', e => {
        const email = emailTxt.value;
        const pass = passwordTxt.value;
        const auth = firebase.auth();

        const promise = auth.signInWithEmailAndPassword(email, pass);
        promise.catch(e => console.log(e.message));
    });

    registerBtn.addEventListener('click', e => {
        const email = emailTxt.value;
        const pass = passwordTxt.value;
        const auth = firebase.auth();

        const promise = auth.createUserWithEmailAndPassword(email, pass);
        promise.catch(e => console.log(e.message));
    });

    logoutBtn.addEventListener('click', e => {
        firebase.auth().signOut();
    });

    // Add a realtime listener
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            console.log(firebaseUser);
        } else {
            console.log('not logged in');
        }
    });
}());