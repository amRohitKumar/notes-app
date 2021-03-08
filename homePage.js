// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAdOe_JssV-5HlVYM0GhFwKlT_G_d-8q2M",
    authDomain: "notes-app-a51b7.firebaseapp.com",
    projectId: "notes-app-a51b7",
    storageBucket: "notes-app-a51b7.appspot.com",
    messagingSenderId: "415019923323",
    appId: "1:415019923323:web:601a346c65aca6fee42fde"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);



const addNote = document.querySelector('#addnote');
const signOut = document.querySelector('#signout');
const userName = document.querySelector('#username')

window.addEventListener('load', () => {
    const userid = localStorage.getItem('ID');

    var database = firebase.database().ref('User/' + userid);

    database.on('value', (snapshot) => {
        const username = snapshot.val().firstName + ' ' + snapshot.val().lastName;
        // console.log(username);
        userName.innerText = 'Welcome ' + username + '  !';
        userName.classList.add('capital');
    });
})

addNote.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = "addNote.html";
})

signOut.addEventListener('click', () => {
    firebase.auth().signOut()
        .then(() => {
            window.location.replace("loginPage.html"); 
            window.alert('Logout Successfully !')

        }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;

            window.alert(errorCode, errorMessage);
        });
})