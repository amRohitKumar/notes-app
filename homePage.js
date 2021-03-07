const addNote = document.querySelector('#addnote');
const signOut = document.querySelector('#signout');

addNote.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = "addNote.html";
    
})