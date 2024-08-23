# Note Taking Application

This is a simple note taking application built using HTML, CSS, and JavaScript. The application uses Firebase for authentication and Firestore for storing notes.

## Features
- User can create an account
- User can login
- User can create a note
- User can view all notes
- User can update a note
- User can delete a note
- User can logout

## Technologies Used
- HTML
- CSS
- JavaScript
- Firebase

## Steps to Setup
1. Create a Firebase project
2. Update the Firebase configuration in `firebase.js`
3. Enable Email/Password authentication in Firebase
4. Enable Firestore database in Firebase
5. Add the following rules in Firestore database
```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow create: if request.auth != null;
      allow read, write, delete: if request.auth != null && request.auth.uid == userId;
    }
    match /notes/{noteId} {
      allow create: if request.auth != null;
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
  }
}
```