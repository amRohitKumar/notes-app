// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAdOe_JssV-5HlVYM0GhFwKlT_G_d-8q2M",
    authDomain: "notes-app-a51b7.firebaseapp.com",
    projectId: "notes-app-a51b7",
    storageBucket: "notes-app-a51b7.appspot.com",
    messagingSenderId: "415019923323",
    appId: "1:415019923323:web:601a346c65aca6fee42fde"
};
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);


// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: 'AIzaSyAdOe_JssV-5HlVYM0GhFwKlT_G_d-8q2M',
    authDomain: 'notes-app-a51b7.firebaseapp.com',
    projectId: 'notes-app-a51b7'
});
var firestore = firebase.firestore();



const userid = localStorage.getItem('ID');

const docRef = firestore.collection(userid);
const textarea = document.querySelector('#inputtext')
const button = document.querySelector('.button');
const id = localStorage.getItem('docId');
const currText = localStorage.getItem('currNote')
textarea.value = currText;
button.setAttribute('onclick', `updateNote("${id}")`);

const updateNote = (id) => {
    // taking input from new input
    const newNote = textarea.value;

    docRef.doc(id).set({
        note: newNote,
        timestamp: new Date()
    }, {
        // MERGE => TRUE

        merge: false,
    })
        .then(() => {

            window.alert("Note Updated Sucessfully !");
            return;
        })
        .catch((error) => {
            console.log(error);
            window.alert("Something went wrong !");
        });

    setTimeout(() => {
        window.location.replace('homePage.html');
    }, 1000);
};
