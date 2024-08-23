import { app } from "./firebase.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import {
  getFirestore,
  addDoc,
  collection,
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

const textarea = document.querySelector("#inputtext");
const button = document.querySelector(".button");
const inputtitle = document.querySelector("#inputtitle");

const auth = getAuth(app);

button.addEventListener("click", (e) => {
  e.preventDefault();
  const notes = textarea.value.trim();
  const title = inputtitle.value.trim();
  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      window.location.replace("../loginPage.html");
      return;
    }
    const userUID = user.uid;
    const db = getFirestore(app);
    if (inputtitle.value.trim().length !== 0) {
      addDoc(collection(db, "notes"), {
        userId: userUID,
        title: title,
        note: notes,
        timestamp: new Date(),
      })
        .then(() => {
          window.alert("Note Successfully Added !");
          console.log("Document successfully written!");
        })
        .then(() => {
          window.location.replace("../HTML/homePage.html");
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    } else {
      window.alert("Please add some text !");
    }

    // LENGTH OF TEXT SHOUD NOT BE ZERO
  });
});
