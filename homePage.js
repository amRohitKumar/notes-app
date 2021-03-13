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

var firestore = firebase.firestore();
const notePrev = document.querySelector('#notes');
// notePrev is the container in which we will add notes

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

    const docRef = firestore.collection('users').doc(userid);

    docRef.get().then((doc) => {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            console.di
            let messArray = doc.data().messages;
            // messArray is an array containing all the notes of the user
            for(let mess of messArray)
            {
                const box = document.createElement('div');
                const btndiv = document.createElement('div');
                const btn1 = document.createElement('button');
                const btn2 = document.createElement('button');
                box.classList.add('prevClass', 'capital', 'container');
                btndiv.classList.add('btndiv');
                btn1.classList.add('btn', 'btn-light', 'btn-sm');
                btn2.classList.add('btn', 'btn-light', 'btn-sm');
                btn1.innerText = 'Delete'
                btn2.innerText = 'Edit'
                btndiv.append(btn2, btn1);
                box.append(mess);
                box.append(btndiv);
                notePrev.append(box);
            }

        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
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