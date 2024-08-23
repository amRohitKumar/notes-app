import { app } from "./firebase.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

const button = document.querySelector("#contactForm");

button.addEventListener("submit", (e) => {
  e.preventDefault();

  let email = document.querySelector("#email").value;
  let pwd = document.querySelector("#pwd").value;

  const auth = getAuth(app);
  signInWithEmailAndPassword(auth, email, pwd)
    .then((currentUser) => {
      window.alert("Welcome !!!");
      let id = currentUser.uid;
      localStorage.setItem("ID", id);
      window.location.href = "./HTML/homePage.html";
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;

      alert(errorCode, errorMessage);
    })
    .finally(() => {
      document.querySelector("#contactForm").reset();
    });
});
