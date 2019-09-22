(function () {

    const nameTxt = document.getElementById("nameTxt");
    const emailTxt = document.getElementById("emailTxt");
    const addressTxt = document.getElementById("addressTxt");

    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            console.log(firebaseUser);
            var firstname;
            var lastname;
            var email;
            var address;

            var userid = firebase.auth().currentUser.uid;
            email = firebase.auth().currentUser.email;
            emailTxt.innerText = "Email: " + email;

            var firstNameRef = firebase.database().ref('user/' + userid + '/firstname');
            firstNameRef.on('value', function(snapshot) {
                firstname = snapshot.val();

                var lastNameRef = firebase.database().ref('user/' + userid + '/lastname');
                lastNameRef.on('value', function(snapshot) {
                    lastname = snapshot.val();
                    nameTxt.innerText = "Name: " + firstname + " " + lastname;
                });

            });

            var addressRef = firebase.database().ref('user/' + userid + '/address');
            addressRef.on('value', function(snapshot) {
                address = snapshot.val();
                addressTxt.innerText = "Address: " + address;
            });

        } else {
            window.location.replace("Login.html");
        }
    });

}());