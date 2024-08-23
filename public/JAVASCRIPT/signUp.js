import { app } from "./firebase.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import {
  getFirestore,
  setDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

const button = document.querySelector("#contactForm");
let flag = document.querySelector(".flag");

button.addEventListener("submit", (e) => {
  e.preventDefault();

  var fname = document.querySelector("#firstName").value;
  var lname = document.querySelector("#lastName").value;
  let email = document.querySelector("#email").value;
  let password = document.querySelector("#pwd").value;

  const auth = getAuth(app);

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.dir(user);
      const db = getFirestore(app);
      return setDoc(doc(db, "users", user.uid), {
        email: email,
        firstName: fname,
        lastName: lname,
      });
    })
    .then(() => {
      flag.classList.remove("none");
      alert("Congo !!! User registration sucessfull");
    })
    .catch((error) => {
      const errorcode = error.code;
      const errormsg = error.message;

      window.alert("Something went wrong !", errorcode, errormsg);
    })
    .finally(() => {
      document.querySelector("#contactForm").reset();
    });
});
