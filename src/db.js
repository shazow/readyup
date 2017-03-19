import Firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyC6mTJXbRYh6W4_yuqLRgNhuVF1tf0xHrg",
  authDomain: "readyup-dca70.firebaseapp.com",
  databaseURL: "https://readyup-dca70.firebaseio.com",
  storageBucket: "readyup-dca70.appspot.com",
  messagingSenderId: "441335442636"
};
const firebaseApp = Firebase.initializeApp(firebaseConfig);
const db = firebaseApp.database()
export default db
