
import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

const useSignUp = (auth) => {
  const [error, setError] = useState(null);

  const signUp = async ({ email, password, role, userName }) => {
    setError(null);

    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      const user = response.user;
      console.log(user.uid);

      // Update the user's profile with their name
      await updateProfile(user, { displayName: `${userName} ${role}` });

    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };

  return [signUp, error];
};

export default useSignUp;


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
