(function () {

    // Get elements
    const detailsDiv = document.getElementById("detailsDiv");
    const nameTxt3 = document.getElementById("nameTxt3");
    const emailTxt3 = document.getElementById("emailTxt3");
    const addressTxt3 = document.getElementById("addressTxt3");
    const editBtn = document.getElementById("editBtn");

    const editDiv = document.getElementById("editDiv");
    const firstNameTxtf = document.getElementById("firstNameTxtf");
    const lastNameTxtf = document.getElementById("lastNameTxtf");
    const addressTxtf = document.getElementById("addressTxtf");
    const doneBtn = document.getElementById("doneBtn");
    const cancelBtn = document.getElementById("cancelBtn");
    detailsDiv.style.display = "none";
    editDiv.style.display = "none";

    // Listener for user login state
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            console.log(firebaseUser);

            // Get user id and email
            var userid = firebase.auth().currentUser.uid;
            emailTxt3.innerHTML = "<strong>Email: </strong>" + firebase.auth().currentUser.email;

            // Listener for first and last names
            var firstNameRef = firebase.database().ref('user/' + userid + '/firstname');
            firstNameRef.on('value', function(snapshot) {
            var firstname = snapshot.val();

                var lastNameRef = firebase.database().ref('user/' + userid + '/lastname');
                lastNameRef.on('value', function(snapshot) {
                var lastname = snapshot.val();
                nameTxt3.innerHTML = "<strong>Name: </strong>" + firstname + " " + lastname;
                });
            });

            // Listener for address
            var addressRef = firebase.database().ref('user/' + userid + '/address');
            addressRef.on('value', function(snapshot) {
                var address = snapshot.val();
                addressTxt3.innerHTML = "<strong>Address: </strong>" + address;
            });
        } else {
            window.location.replace("Login.html");
        }
        setTimeout(function() {
            detailsDiv.style.display = "block";
            document.getElementById("placeholder").style.display = "none";
            }, 2000);
    });

    // Read and store details into text fields
    editBtn.addEventListener('click', e => {
        var userid = firebase.auth().currentUser.uid;
        var firstNameRef = firebase.database().ref('user/' + userid + '/firstname');
        firstNameRef.once('value', function(snapshot) {
            firstNameTxtf.setAttribute("value", snapshot.val()); 
        });

        var lastNameRef = firebase.database().ref('user/' + userid + '/lastname');
        lastNameRef.once('value', function(snapshot) {
            lastNameTxtf.setAttribute("value", snapshot.val()); 
        });

        var addressRef = firebase.database().ref('user/' + userid + '/address');
        addressRef.once('value', function(snapshot) {
            addressTxtf.setAttribute("value", snapshot.val()); 
        });
        
        // Hide/show sections
        detailsDiv.style.display = "none";
        editDiv.style.display = "block";
    });

    cancelBtn.addEventListener('click', e => {
        editDiv.style.display = "none";
        detailsDiv.style.display = "block";
    });

    // Store new details in the database
    doneBtn.addEventListener('click', e => {
        var userid = firebase.auth().currentUser.uid;
        var firstname = firstNameTxtf.value.trim();
        var lastname = lastNameTxtf.value.trim();
        var address = addressTxtf.value.trim();
        if (firstname.length == 0) window.alert("Please enter your first name");
        else if (lastname.length == 0) window.alert("Please enter your last name");
        else if (address.length == 0) window.alert("Please enter your address");
        else {
            firebase.database().ref('user/' + userid).set({
                firstname : firstname,
                lastname : lastname,
                address : address
            });
            editDiv.style.display = "none";
            detailsDiv.style.display = "block";
        }
    });
    
}());