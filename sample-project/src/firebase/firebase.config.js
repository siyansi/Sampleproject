
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import {getFirestore}from "firebase/firestore"
// import { getStorage } from "firebase/storage";
// import Checkinpage from "../component/checkinpage/Checkinpage";

// import {getAuth} from "firebase/auth"
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBkCuXnpXgwWxILfYru9Rn1JQ3_Zq3Rr88",
//   authDomain: "addence-e3b94.firebaseapp.com",
//   projectId: "addence-e3b94",
//   storageBucket: "addence-e3b94.appspot.com",
//   messagingSenderId: "996493598479",
//   appId: "1:996493598479:web:40b2db1db940d6f5c1e87a",
//   measurementId: "G-15RKWXJ4MS"
// };
// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const storage = getStorage(app);
// const db = getFirestore();
// const auth = getAuth()
// export { app, db,auth };
// const App = () => {
//     return (
//       <div>
//         <Checkinpage storage={storage} />
//       </div>
//     );
//   };
  
//   export default App;



// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore}from "firebase/firestore"
import {getAuth} from "firebase/auth"
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBkCuXnpXgwWxILfYru9Rn1JQ3_Zq3Rr88",
  authDomain: "addence-e3b94.firebaseapp.com",
  projectId: "addence-e3b94",
  storageBucket: "addence-e3b94.appspot.com",
  messagingSenderId: "996493598479",
  appId: "1:996493598479:web:b01f63bf1466e806c1e87a",
  measurementId: "G-WD4TYQQP27"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); 
const db = getFirestore();
 const auth = getAuth()
 const storage = getStorage(app);
 export { app, db,auth ,storage};