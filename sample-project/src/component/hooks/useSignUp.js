import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile, getAuth, getIdToken } from 'firebase/auth';

const useSignUp = () => {
  const [error, setError] = useState(null);

  const signUp = async ({ email, password, role, userName }) => {
    setError(null);

    try {
      const auth = getAuth(); // Retrieve the Auth instance
      const response = await createUserWithEmailAndPassword(auth, email, password);
      const user = response.user;
      
      // Update the user's profile with their name
      await updateProfile(user, { displayName: `${userName} ${role}` });

      // Get the user's ID token
      const idToken = await getIdToken(auth.currentUser);

      // Save the token to local storage or use it as needed
      localStorage.setItem('authToken', idToken);

      console.log("User created successfully.");
      console.log("User's token:", idToken); // Log the token to the console

    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };

  return [signUp, error];
};

export default useSignUp;


// const functions = require('firebase-functions');
// const admin = require('firebase-admin');

// admin.initializeApp();

// exports.processSignUp = functions.auth.user().onCreate(async (user) => {
//     // Get the custom claims from the user object
//     const { displayName, role } = user;
    
//     // Set custom claims based on the role
//     let customClaims = {};
//     if (role === 'admin') {
//         customClaims = { admin: true };
//     } else {
//         customClaims = { member: true };
//     }

//     // Set custom claims for the user
//     await admin.auth().setCustomUserClaims(user.uid, customClaims);
    
//     // Log success or any errors
//     console.log(`Custom claims set for user ${user.uid}:`, customClaims);
// });


// firebase.auth().signInWithEmailAndPassword(email, password)
//     .then((userCredential) => {
//         // Get the user's ID token
//         userCredential.user.getIdToken().then((token) => {
//             // Save the token to local storage or use it as needed
//             localStorage.setItem('authToken', token);

//             // Use the token to get the user's claims
//             firebase.auth().currentUser.getIdTokenResult()
//                 .then((idTokenResult) => {
//                     // Get custom claims (e.g., role)
//                     const role = idTokenResult.claims.role;
//                     console.log('User role:', role);
//                 })
//                 .catch((error) => {
//                     console.error('Error getting custom claims:', error);
//                 });
//         });
//         // Redirect user to home page or perform other actions
//     })
//     .catch((error) => {
//         console.error("Error signing in:", error);
//     });


// const admin = require('firebase-admin');
// const serviceAccount = require('./path/to/serviceAccountKey.json');

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

// // Set custom claims for the user
// admin.auth().setCustomUserClaims(uid, { role: 'admin' })
//   .then(() => {
//     console.log('Custom claims set for the user');
//   })
//   .catch((error) => {
//     console.error('Error setting custom claims:', error);
//   });


// // Example of checking user role and showing UI elements accordingly
// firebase.auth().onAuthStateChanged((user) => {
//   if (user) {
//       // User is signed in.
//       user.getIdTokenResult().then((idTokenResult) => {
//           const role = idTokenResult.claims.role;
//           if (role === 'admin') {
//               // Show admin UI elements
//           } else {
//               // Show regular user UI elements
//           }
//       });
//   } else {
//       // User is signed out.
//       // Redirect to login page or perform other actions
//   }
// });


  // const checkUserRole = async (auth, navigate) => {
  //   try {
  //     const user = auth.currentUser;
  //     if (!user) {
  //       // User is not logged in, redirect to login page
  //       navigate("/login");
  //       return "not_logged_in";
  //     }

  //     const userDoc = await getDoc(doc(db, "users", user.uid));
  //     if (userDoc.exists()) {
  //       const userData = userDoc.data();
  //       const userRole = userData.role;
  //       if (userRole === "admin") {
  //         // Allow access to the create user page
  //         return "admin";
  //       } else {
  //         // User is not an admin, redirect to home page
  //         navigate("/home");
  //         return "not_admin";
  //       }
  //     } else {
  //       // User data not found in Firestore
  //       return "data_not_found";
  //     }
  //   } catch (error) {
  //     console.error("Error checking user role:", error);
  //     return "error";
  //   }
  // };

  // export { useSignUp, checkUserRole };
