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
<<<<<<< HEAD

=======
    
    // Login Function
>>>>>>> registration
    loginBtn.addEventListener('click', e => {
        const email = emailTxt.value;
        const pass = passwordTxt.value;
        const auth = firebase.auth();

        auth.signInWithEmailAndPassword(email, pass).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // [START_EXCLUDE]
            if (errorCode.length >= 5) {
              alert('Email address or password is incorrect');
            } else {
              alert(errorMessage);
            }
            console.log(error);
            // [END_EXCLUDE]
          });

        /*const promise = auth.signInWithEmailAndPassword(email, pass);

        var errorCode = error.code;
        window.alert(error.message);
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/wrong-password') {
            window.alert('Email or password is incorrect');
          } else {
            window.alert(errorMessage);
          }
          console.log(error);
          promise.catch(e => console.log(e.message));
          document.getElementById('quickstart-sign-in').disabled = false;*/

    });

    // Sign Up Function
    registerBtn.addEventListener('click', e => {
        const email = emailTxt.value;
        const pass = passwordTxt.value;
        const auth = firebase.auth();
        if (pass.length < 6) {
            window.alert("Your password must have 6 or more characters")
        }
        else if (!(/\S+@\S+\.\S+/.test(email))) {
            window.alert("Invalid email address")
        }
        else {
            const promise = auth.createUserWithEmailAndPassword(email, pass);
            promise.catch(e => console.log(e.message));
        }
    });

    // Logout Function
    logoutBtn.addEventListener('click', e => {
        firebase.auth().signOut();
        window.location.replace("CompWarehouse.html")
    });

    // Realtime listener for Login State
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            console.log(firebaseUser);
        } else {
            console.log('Not logged in');
        }
    });
}());