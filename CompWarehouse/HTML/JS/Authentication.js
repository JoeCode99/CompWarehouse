$(function() {

    // Get Elements
    const emailTxt = document.getElementById("email");
    const passwordTxt = document.getElementById("pass");
    const loginBtn = document.getElementById("loginBtn");
    const logoutBtn = document.getElementById("logoutBtn");
    const signupBtn = document.getElementById("signupBtn");
    const loginDiv = document.getElementById("loginDiv");

    const firstNameTxt = document.getElementById("firstNameTxt");
    const lastNameTxt = document.getElementById("lastNameTxt");
    const addressTxt = document.getElementById("addressTxt");
    const registerBtn = document.getElementById("registerBtn");
    const signupDiv = document.getElementById("signupDiv");
    const regoDiv = document.getElementById("regoDiv");

    // Hide Sign Up Fields
    signupDiv.style.display = "none";
    regoDiv.style.display = "none";
    loginDiv.style.display = "none";

    // Login Function
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
        
        setTimeout(function() { window.location.href = "CompWarehouse.html" }, 1500);
    });

    // Sign Up Function
    signupBtn.addEventListener('click', e => {
        var email = emailTxt.value;
        var pass = passwordTxt.value;
        const auth = firebase.auth();
        if (pass.length < 6) {
            window.alert("Password must have 6 or more characters")
        }
        else if (!(/\S+@\S+\.\S+/.test(email))) {
            window.alert("Invalid email address")
        }
        else {
            const promise = auth.createUserWithEmailAndPassword(email, pass);
            var x = 0;
            promise.catch(e => {
                console.log(e.message)
                if (e.message = "This email address is already in use by another account") {
                    window.alert("This email address is already in use by another account");
                    ++x;
                }
            });

            if (x == 0) {
                loginDiv.style.display = "none";
                signupDiv.style.display = "block";
            }
            
        }
    });

    // Logout Function
    logoutBtn.addEventListener('click', e => {
        firebase.auth().signOut();
    });

    // Realtime listener for Login State
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            console.log(firebaseUser);
            regoDiv.style.display = "block";
            loginDiv.style.display = "none";
            
        } else {
            console.log('Not logged in');
            regoDiv.style.display = "none";
            loginDiv.style.display = "block";
        }
    });

    // Register Function
    registerBtn.addEventListener('click', e => {
        var firstname = firstNameTxt.value.trim();
        var lastname = lastNameTxt.value.trim();
        var address = addressTxt.value.trim();
        var userid = firebase.auth().currentUser.uid;
        console.log(userid);
        if (firstname.length == 0) window.alert("Please enter your first name");
        else if (lastname.length == 0) window.alert("Please enter your last name");
        else if (address.length == 0) window.alert("Please enter your address");
        else {
            firebase.database().ref('user/' + userid).set({
                firstname : firstname,
                lastname : lastname,
                address : address
            });
            tracker = 1;
            setTimeout(function() { window.location.href = "CompWarehouse.html" }, 1500);
            
        }
    });

}());