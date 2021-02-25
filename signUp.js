
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAhrcWXej7FwXF2mH8IBhEIlm27Gvu96a4",
    authDomain: "notes-app-5516a.firebaseapp.com",
    projectId: "notes-app-5516a",
    storageBucket: "notes-app-5516a.appspot.com",
    messagingSenderId: "789622529935",
    appId: "1:789622529935:web:123d13640ee48100b775fa"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Reference contactInfo collections

let contactInfo = firebase.database().ref("infos");


document.querySelector("#contactForm").addEventListener("submit", submitForm);

function submitForm(e) {
    e.preventDefault();

    let fname = document.querySelector("#firstName").value;
    let lname = document.querySelector("#lastName").value;
    let email = document.querySelector("#email").value;
    let password = document.querySelector("#password").value;

    saveContactInfo(fname, lname, email, password);

    document.querySelector("#contactForm").reset();
}

// save infos to firebase

function saveContactInfo(fname, lname, email, password) {
    let newContactInfo = contactInfo.push();

    newContactInfo.set({
        firstName: fname,
        lastName: lname,
        email: email,
        password: password
    });
}