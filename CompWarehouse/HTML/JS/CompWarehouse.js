//Initialise Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC4UZh7En4OQdXSB_4ttY7foqlY6m-n6pM",
  authDomain: "ses1database.firebaseapp.com",
  databaseURL: "https://ses1database.firebaseio.com",
  projectId: "ses1database",
  storageBucket: "ses1database.appspot.com",
  messagingSenderId: "685925628486",
  appId: "1:685925628486:web:a275e836fa2cc0c4"
};
firebase.initializeApp(firebaseConfig);

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

// Photo Slideshow
var myIndex = 0;
carousel();

function carousel() {
  var i;
  var x = document.getElementsByClassName("mySlides");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  myIndex++;
  if (myIndex > x.length) {myIndex = 1}
  x[myIndex-1].style.display = "block";
  setTimeout(carousel, 2000); // Change image every 2 seconds
}

//Firebase authentication below
function registration() {
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var email = document.getElementById("emailAddress").value;
    var password = document.getElementById("password").value;
    var address = document.getElementById("billingAddress").value;
    
}

//Login form
function login() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("pass").value;
}
