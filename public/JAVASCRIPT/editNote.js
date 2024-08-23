import { app } from "./firebase.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import {
  getFirestore,
  updateDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

const textarea = document.querySelector("#inputtext");
const inputtitle = document.querySelector("#inputtitle");
const button = document.querySelector(".button");
const id = localStorage.getItem("docId");
const currText = localStorage.getItem("currNote");
const currTitle = localStorage.getItem("currTitle");
textarea.value = currText;
inputtitle.value = currTitle;

const auth = getAuth(app);

button.addEventListener("click", (e) => {
  e.preventDefault();
  updateNote(id);
});

const updateNote = (id) => {
  // taking input from new input
  const newNote = textarea.value;
  const newTitle = inputtitle.value;
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      window.location.replace("../loginPage.html");
      return;
    }
    const db = getFirestore(app);
    updateDoc(doc(db, "notes", id), {
      title: newTitle,
      note: newNote,
      timestamp: new Date(),
    })
      .then(() => {
        window.alert("Note Updated Sucessfully !");
        window.location.replace("../HTML/homePage.html");
        return;
      })
      .catch((error) => {
        console.log(error);
        window.alert("Something went wrong !");
      });
  });
};
