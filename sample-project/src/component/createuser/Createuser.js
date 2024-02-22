import React, { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../firebase/firebase.config";
import { jwtDecode } from 'jwt-decode';
import useSignup from "../hooks/useSignUp";

const Createuser = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [userName, setUserName] = useState("");
    const [signup, error] = useSignup(auth);
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                const currentUser = auth.currentUser;
                if (currentUser) {
                    const idToken = await currentUser.getIdToken();
                    const decodedToken = jwtDecode(idToken); // Correct usage
                    setUserRole(decodedToken.role);
                }
            } catch (error) {
                console.error("Error fetching user role:", error);
            }
        };

        fetchUserRole();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signup({ email, password, role, userName });
            const userData = { email, role, userName };
            await addDoc(collection(db, "user"), userData);
            setEmail("");
            setPassword("");
            setRole("");
            setUserName("");
        } catch (error) {
            console.error("Error signing up:", error);
        }
    };

    return (
        <div className="h-screen flex justify-center items-center ">
           
                <form onSubmit={handleSubmit} className="bg-gray-100 p-8 rounded shadow-md w-full sm:max-w-md sm:justify-center">
                    <h1 className="text-2xl font-semibold mb-6">Register</h1>
                    <div className="mb-4">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border border-zinc-300 rounded-md px-3 py-2 w-full focus:outline-none"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Role (optional)"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="User Name"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none"
                            required
                        />
                    </div>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <button
                        type="submit"
                        className="bg-black text-white px-4 py-2 rounded-md hover:bg-green-100 hover:text-black focus:outline-none w-full"
                    >
                        Create User
                    </button>
                </form>
            
        </div>
    );
};

export default Createuser;
