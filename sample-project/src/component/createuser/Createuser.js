// Createuser.js
import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../firebase/firebase.config";
import useSignup from "../hooks/useSignUp";

const Createuser = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [userName, setUserName] = useState("");
    const [signup, error] = useSignup(auth); // Destructuring signup function and error from custom hook

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Call signup function from custom hook
            await signup({ email, password, role, userName });

            // Add user data to Firestore
            const userData = { email, role, userName };
            await addDoc(collection(db, "users"), userData);

            // Clear form fields
            setEmail("");
            setPassword("");
            setRole("");
            setUserName("");
        } catch (error) {
            console.error("Error signing up:", error);
        }
    };

    return (
        <div className="h-full  flex justify-center items-center">
            <form onSubmit={handleSubmit} className="bg-gray-100 p-8 rounded shadow-md ">
                <h1 className="text-2xl font-semibold mb-6"> Register</h1>
                <div className="mt-10">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border border-zinc-300 rounded-md px-3 py-2 mb-4 w-80 focus:outline-none "
                        required
                    />
                </div>
                <div className="mt-8">
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-2 mb-4 w-80  focus:outline-none"
                        required
                    />
                </div>
                <div className="mt-8">
                    <input
                        type="text"
                        placeholder="Role (optional)"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-2 mb-4 w-80  focus:outline-none"
                    />
                </div>
                <div className="mt-8">
                    <input
                        type="text"
                        placeholder="User Name"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-2 mb-4 w-80  focus:outline-none"
                        required
                    />
                </div>
                {error && <p className="text-red-500">{error}</p>}
                <button
                    type="submit"
                    className="bg-rose-400 text-white px-4 py-2 rounded-md hover:bg-blue-300 focus:outline-none"
                >
                    Create User
                </button>
            </form>
        </div>
    );
};

export default Createuser;
