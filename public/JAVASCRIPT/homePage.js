import { app } from "./firebase.js";
import {
  getAuth,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import {
  getFirestore,
  getDocs,
  where,
  doc,
  deleteDoc,
  getDoc,
  query,
  collection,
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

const topHeading = document.querySelector("#topheading");
const notePrev = document.querySelector("#notes"); // notePrev is the container in which we will add notes
const addNote = document.querySelector("#addnote");
const signOutBtn = document.querySelector("#signout");
const userName = document.querySelector("#username");
const flagdiv = document.querySelector("#flagdiv");
const flag = document.querySelector("#flag");
const loader = document.querySelector(".loader");

const auth = getAuth(app);
const db = getFirestore(app);

function editDoc(title, note, id) {
  //              FUNCTION TO EDIT THE NOTE
  localStorage.setItem("currTitle", title);
  localStorage.setItem("currNote", note);
  localStorage.setItem("docId", id);
  window.location.replace("../HTML/editNote.html");
}

const createNote = (doc) => {
  //         CREATING DIV FOR EACH NOTE AND APPENDING IT IN PREV DIV

  let title = doc.get("title");
  let note = doc.get("note");
  let docId = doc.id;
  let timestamp = doc.get("timestamp");
  //   console.log(timestamp);
  // console.dir(timestamp);
  // creating elements
  const box = document.createElement("div");
  const btndiv = document.createElement("div");
  const titlediv = document.createElement("div");
  const notediv = document.createElement("p");
  const b = document.createElement("b");
  const btn1 = document.createElement("a");
  btn1.classList.add("btns");
  const btn2 = document.createElement("a");
  btn1.classList.add("btns");
  const btn3 = document.createElement("span");
  btn3.classList.add("btns");

  // adding class to elements
  box.classList.add("prevClass", "container");
  titlediv.classList.add("container", "titlediv", "capital");
  btndiv.classList.add("btndiv", "none");
  btn1.classList.add("btn", "btn-light", "btn-sm", "btn-delete");
  btn2.classList.add("btn", "btn-light", "btn-sm", "btn-edit");
  btn3.classList.add("btn", "btn-light", "btn-sm", "nopointer");

  box.setAttribute("data-doc-id", docId);

  // TOOLTIP ON DELETE BUTTON

  btn1.innerHTML = '<i class="bi bi-trash"></i>';
  //   btn1.href = "#";
  //   btn1.setAttribute("onclick", `deleteDocWithId("${docId}")`);

  //      TOOLTIP ON EDIT BUTTON
  btn2.innerHTML = '<i class="bi bi-pencil-square"></i>';
  //   btn2.href = "#";
  //   btn2.setAttribute("onclick", `editDoc("${title}", "${note}", "${docId}")`);

  //         CONVERTING TIMESTAMP TO DATE
  let final = timestampToDate(timestamp);
  btn3.innerHTML = `<i class="bi bi-calendar-check"></i> \u00A0\u00A0 ${final}`;

  // appending element to body
  notediv.innerText = note;
  btndiv.append(btn3, btn2, btn1);
  box.append(titlediv);
  box.append(notediv);
  b.append(title);
  titlediv.append(b);
  box.append(btndiv);
  notePrev.append(box);

  //                      ******* ADDING ONMOUSEENTER PROPERTY TO BOXDIV *******
  box.onmouseenter = () => {
    btndiv.classList.remove("none");
    titlediv.classList.add("titledivhover");
  };
  box.onmouseleave = () => {
    btndiv.classList.add("none");
    titlediv.classList.remove("titledivhover");
  };
};

const deleteDocWithId = (id) => {
  //                                  FUNCTION TO DELETE A NOTE
  var result = confirm("Are you sure you want to delete this note ?");
  if (result) {
    deleteDoc(doc(db, "notes", id))
      .then(() => {
        window.alert("Note deleted sucessfully !!!");
        window.location.reload(true);
      })
      .catch((error) => {
        console.log(error);
        window.alert("Something went wrong !!!");
      });
  }
};

window.addEventListener("load", () => {
  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      window.location.replace("../loginPage.html");
      return;
    }
    const userUID = user.uid;
    const userDoc = await getDoc(doc(db, "users", userUID));
    if (!userDoc.exists()) {
      window.location.replace("../loginPage.html");
      return;
    }
    const userDocData = userDoc.data();
    userName.innerText = `Welcome ${userDocData.firstName} !`;
    userName.classList.add("capital");

    fetchNotes(userUID);
  });
});

notePrev.addEventListener("click", (e) => {
  const parentEl = e.target.parentElement.parentElement.parentElement;
  const id = parentEl.getAttribute("data-doc-id");
  if (e.target.parentElement.classList.contains("btn-edit")) {
    const title = parentEl.querySelector(".titlediv").textContent;
    const note = parentEl.querySelector("p").textContent;
    editDoc(title, note, id);
  } else if (e.target.parentElement.classList.contains("btn-delete")) {
    deleteDocWithId(id);
  }
});

async function fetchNotes(userUID) {
  const userNotesQuery = query(
    collection(db, "notes"),
    where("userId", "==", userUID)
  );
  const querySnapshot = await getDocs(userNotesQuery);
  if (querySnapshot.size <= 0) {
    flag.innerText = "No note to show. Create a new note using Add Note option";
    return;
  }

  flagdiv.classList.add("none");
  topHeading.classList.add("underline");
  querySnapshot.forEach((doc) => {
    createNote(doc);
  });
}

addNote.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "addNote.html";
});

signOutBtn.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      window.location.replace("../loginPage.html");
      alert("Logout Successfully !");
      localStorage.clear();
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;

      window.alert(errorCode, errorMessage);
    });
});

const timestampToDate = (timestamp) => {
  //                              CONVERTING TIMESTAMP TO DATE
  let t = timestamp.toDate();
  // console.dir(t);
  let date = t.getDate();
  let month = t.getMonth() + 1;
  let year = t.getFullYear();
  let hour = t.getHours();
  let min = t.getMinutes();
  let final = `Date: ${date}-${month}-${year} \u00A0Time: ${hour}:${min}`;
  return final;
};
