import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth"; // Import the signInWithEmailAndPassword function
import { auth } from "../../firebase/firebase.config"; // Assuming you have initialized Firebase in firebase.config.js
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook for navigation

const Loginpage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize the navigate function

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Sign in user with email and password
      await signInWithEmailAndPassword(auth, email, password);

      // If login successful, navigate to the home page
      navigate("/home");
    } catch (error) {
      // If login fails, set the error state
      setError(error.message);
    }
  };

  return (
    <div className="flex h-screen ">
      {/* Left side with the image */}
      <div className="hidden lg:block lg:w-1/2 bg-gray-200">
        {/* You can replace this with your school image */}
        <img
          src="https://img.freepik.com/free-psd/3d-rendering-travel-tourist_23-2149667941.jpg?size=626&ext=jpg&ga=GA1.1.1726861027.1704513461&semt=ais"
          alt="School"
          className=" w-full h-full"
        />
      </div>

      {/* Right side with the login form */}
      <div className="w-full lg:w-1/2 bg-white flex justify-center items-center">
        <div className="p-6 max-w-md w-full">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
                placeholder="Enter your password"
                required
              />
            </div>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <button
              type="submit"
              className="bg-blue-500 text-white rounded-md px-4 py-2 w-full hover:bg-blue-600 transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Loginpage;
