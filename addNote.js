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


button.addEventListener('click', (e) => {
  e.preventDefault();
  const notes = textarea.value;

  var usersRef = firestore.collection(userid);

  usersRef.get()
    .then((coll) => {
      if (coll.exists) {
        // user already exist
        
        // console.log("Document data:", doc.data());

        // firestore.collection('users').doc(userid).update({
        //   messages: firebase.firestore.FieldValue.arrayUnion(notes)
        // })
        //   .then(() => {
        //     window.alert("Note Successfully Added !")
        //     window.location.replace("homePage.html");
        //   });
        usersRef.add({
          note: notes
        })
          .then(() => {
            window.alert("Note Successfully Added !")
            window.location.replace("homePage.html");
          });
        // usersRef.add({
        //   note: notes
        // })
        
      }
      else {
        // doc.data() will be undefined in this case
        // console.log("No such document!");

        // firestore.collection("users").doc(userid).set({
        //   messages: [notes]
        // })
        //   .then(() => {
        //     window.alert("Note Successfully Added !");
        //     console.log("Document successfully written!");
        //   })
        //   .then(() => {
        //     window.location.replace("homePage.html");
        //   })
        //   .catch((error) => {
        //     console.error("Error writing document: ", error);
        //   });
        usersRef.add({
          note: notes
        })
          .then(() => {
            window.alert("Note Successfully Added !");
            console.log("Document successfully written!");
          })
          .then(() => {
            window.location.replace("homePage.html");
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });

        // usersRef.add({
        //   note: notes
        // })
      }

    })
    .catch((error) => {
      window.alert("Something went wrong !! Try again later");
      console.log("Error getting document:", error);
    });
})

