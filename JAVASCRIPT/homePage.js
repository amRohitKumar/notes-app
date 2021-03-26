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

const firestore = firebase.firestore();
const notePrev = document.querySelector('#notes');  // notePrev is the container in which we will add notes
const addNote = document.querySelector('#addnote');
const signOut = document.querySelector('#signout');
const userName = document.querySelector('#username')
const userid = localStorage.getItem('ID');
const docRef = firestore.collection(userid);
const flagdiv = document.querySelector('#flagdiv');
const flag = document.querySelector('#flag');
const loader = document.querySelector('.loader');

const editDoc = (note, id) => {
    //              FUNCTION TO EDIT THE NOTE
    localStorage.setItem('currNote', note);
    localStorage.setItem('docId', id);
    window.location.replace("../HTML/editNote.html");

};

const createNote = (doc) => {
    //         CREATING DIV FOR EACH NOTE AND APPENDING IT IN PREV DIV


    let note = doc.get('note');
    let docId = doc.id;
    let timestamp;
    timestamp = doc.get('timestamp');
    // console.dir(timestamp);
    // creating elements
    const box = document.createElement('div');
    const btndiv = document.createElement('div');
    const btn1 = document.createElement('a');
    btn1.classList.add('btns');
    const btn2 = document.createElement('a');
    btn1.classList.add('btns');
    const btn3 = document.createElement('span');
    btn3.classList.add('btns');


    // adding class to elements
    box.classList.add('prevClass', 'container');
    btndiv.classList.add('btndiv', 'none');
    btn1.classList.add('btn', 'btn-light', 'btn-sm');
    btn2.classList.add('btn', 'btn-light', 'btn-sm');
    btn3.classList.add('btn', 'btn-light', 'btn-sm', 'nopointer');
    btn1.innerHTML = '<i class="bi bi-trash"></i> \u00A0\u00A0 &nbspDelete'
    // btn1.innerHTML = '<i class="bi bi-trash"></i>'
    // btn1.innerText = 'Delete'
    btn1.href = '#';
    btn1.setAttribute('onclick', `deleteDoc("${docId}")`);

    btn2.innerHTML = '<i class="bi bi-pencil-square"> \u00A0\u00A0 &nbsp</i>Edit'
    // btn2.innerHTML = '<i class="bi bi-pencil-square"></i>'
    btn2.href = '#';
    btn2.setAttribute('onclick', `editDoc("${note}", "${docId}")`)

    //                              CONVERTING TIMESTAMP TO DATE
    let final = timestampToDate(timestamp);
    console.log(final);
    btn3.innerHTML = `<i class="bi bi-calendar-check"></i> \u00A0\u00A0 ${final}`;

    // appending element to body
    btndiv.append(btn3, btn2, btn1);
    box.append(note);
    box.append(btndiv);
    notePrev.append(box);

    //                      ******* ADDING ONMOUSEENTER PROPERTY TO BOXDIV *******
    box.onmouseenter = () => {
        btndiv.classList.remove('none');
    }
    box.onmouseleave = () => {
        btndiv.classList.add('none');
    }
};

const deleteDoc = (id) => {
    //                                  FUNCTION TO DELETE A NOTE
    var result = confirm("Are you sure you want to delete this note ?");
    if (result) {
        docRef.doc(id).delete()
            .then(() => {
                window.alert('Note deleted sucessfully !!!');
                window.location.reload(true);
                return;
            }).catch((error) => {
                console.log(error);
                window.alert("Something went wrong !!!");
            });
    
        setTimeout(() => {
            console.log('wait !!!');
        }, 1000);
    
        return false;
    }
};


window.addEventListener('load', () => {

    var database = firebase.database().ref('User/' + userid);

    database.on('value', (snapshot) => {
        const username = snapshot.val().firstName + ' ' + snapshot.val().lastName;
        // console.log(username);
        userName.innerText = `Welcome ${username} !`;
        userName.classList.add('capital');
    });


    docRef.get()
        .then((collSnapshot) => {

            // console.dir(collSnapshot);
            const numberOfNotes = collSnapshot.size;
            if (numberOfNotes > 0) {
                flagdiv.classList.add('none');
            }
            else {
                // flagdiv.classList.remove('none');
                // loader.classList.add('none');
                flag.innerText = 'No note to show. Create a new note using Add Note option';
            }


            //                              <-- USING FIRESTORE ARRAY--/> 
            // console.log("Document data:", doc.data());
            // let messArray = doc.data().messages;
            // messArray is an array containing all the notes of the user
            // let i = 0;
            // for (let mess of messArray) {
            //     // creating elements
            //     const box = document.createElement('div');
            //     // box.id = i;
            //     const btndiv = document.createElement('div');
            //     btndiv.id = i;
            //     const btn1 = document.createElement('button');
            //     btn1.classList.add('btns');
            //     const btn2 = document.createElement('button');
            //     btn1.classList.add('btns');
            //     // adding class to elements
            //     box.classList.add('prevClass', 'capital', 'container');
            //     btndiv.classList.add('btndiv');
            //     btn1.classList.add('btn', 'btn-light', 'btn-sm');
            //     btn2.classList.add('btn', 'btn-light', 'btn-sm');
            //     btn1.innerText = 'Delete'
            //     btn1.addEventListener('click', del(mess));
            //     btn2.innerText = 'Edit'
            //     // appending element to body
            //     btndiv.append(btn2, btn1);
            //     box.append(mess);
            //     box.append(btndiv);
            //     notePrev.append(box);
            //     i++;
            // }


            // console.dir(collSnapshot);

            collSnapshot.forEach((doc) => {
                createNote(doc);
            })
        })
        .catch((error) => {
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
            window.location.replace("../loginPage.html");
            window.alert('Logout Successfully !');
            localStorage.clear();

        }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;

            window.alert(errorCode, errorMessage);
        });
})

const timestampToDate = timestamp => {
    //                              CONVERTING TIMESTAMP TO DATE
    let t = timestamp.toDate();
    // console.dir(t);
    let date = t.getDate();
    let month = t.getMonth();
    let year = t.getFullYear();
    let hour = t.getHours();
    let min = t.getMinutes();
    let final = `Date: ${date}-${month}-${year} \u00A0Time: ${hour}:${min}`;
    return final;
}


//                              <-- FIRESTOREARRAY METHOD--/>
// function del(currdiv) {
//     firestore.collection('users').doc(userid).update({
//         messages: firebase.firestore.FieldValue.arrayRemove(currdiv)
//     })
//         .then(() => {
//             window.alert("Note Successfully Deleted !");
//         });
// }
