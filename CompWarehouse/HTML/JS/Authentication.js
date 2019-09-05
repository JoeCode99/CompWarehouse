// Get Elements
const emailTxt = document.getElementById("email");
const passwordTxt = document.getElementById("pass");
const loginBtn = document.getElementById("loginBtn");

const firstNameTxt = document.getElementById("firstName");
const lastNameTxt = document.getElementById("lastName");
const emailTxt2 = document.getElementById("emailAddress");
const passwordTxt2 = document.getElementById("password");
const addressTxt = document.getElementById("billingAddress");
const registerBtn = document.getElementById("registerBtn");

//Login Form
loginBtn.addEventListener('click', e => {
    const email = emailTxt.value;
    const pass = passwordTxt.value;
    const auth = firbase.auth();

    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));
})