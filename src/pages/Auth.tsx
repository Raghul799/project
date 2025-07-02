// src/pages/Auth.tsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FaShoppingCart } from "react-icons/fa";
import { auth, db } from "../components/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

const avatars = [
  "/avatars/avatar1.jpg",
  "/avatars/avatar2.jpg",
  "/avatars/avatar3.jpg",
  "/avatars/avatar4.jpg",
  "/avatars/avatar5.jpg",
];

const Auth = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState<string>(avatars[0]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password || (mode === "signup" && !name)) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password should be at least 6 characters.");
      return;
    }

    try {
      if (mode === "login") {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success("Logged in successfully!");
        navigate("/products");
      } else {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const uid = userCredential.user.uid;

        await setDoc(doc(db, "users", uid), {
          uid,
          email,
          name,
          avatar: selectedAvatar,
        });

        toast.success("Account created successfully!");
        navigate("/products");
      }

      setEmail("");
      setPassword("");
      setName("");
    } catch (error: any) {
      console.error("Firebase Auth Error:", error);

      if (error.code === "auth/email-already-in-use") {
        toast.error("Email is already in use.");
      } else if (error.code === "auth/invalid-email") {
        toast.error("Invalid email address.");
      } else if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password" ||
        error.code === "auth/invalid-credential"
      ) {
        toast.error("Invalid email or password.");
      } else {
        toast.error(error.message || "Authentication failed.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 w-full max-w-md border border-gray-200 dark:border-gray-700 transition-all">
        <div className="flex flex-col items-center mb-6">
          <FaShoppingCart className="text-blue-600 text-4xl mb-2" />
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            {mode === "login" ? "Welcome Back" : "Create Your Account"}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm text-center">
            {mode === "login"
              ? "Login to continue shopping seamlessly"
              : "Sign up to start your shopping journey"}
          </p>
        </div>

        <div className="flex justify-center mb-4 space-x-2">
          <button
            onClick={() => setMode("login")}
            className={`px-4 py-2 rounded-full font-medium text-sm transition ${
              mode === "login"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-gray-700"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setMode("signup")}
            className={`px-4 py-2 rounded-full font-medium text-sm transition ${
              mode === "signup"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-gray-700"
            }`}
          >
            Sign Up
          </button>
        </div>

        {mode === "signup" && (
          <>
            <div className="flex justify-center mb-4">
              <img
                src={selectedAvatar}
                alt="Selected Avatar"
                className="w-20 h-20 rounded-full border-4 border-blue-500 shadow object-cover"
              />
            </div>

            <label className="block text-gray-600 dark:text-gray-300 text-sm font-medium mb-2 text-center">
              Choose a Profile Picture
            </label>

            <div className="flex flex-wrap justify-center gap-3 mb-4 max-w-full">
              {avatars.map((avatar, index) => (
                <img
                  key={index}
                  src={avatar}
                  alt={`Avatar ${index + 1}`}
                  onClick={() => setSelectedAvatar(avatar)}
                  className={`w-14 h-14 rounded-full cursor-pointer border-2 object-cover transition ${
                    selectedAvatar === avatar
                      ? "border-blue-600 ring-2 ring-blue-300"
                      : "border-transparent hover:border-blue-400"
                  }`}
                />
              ))}
            </div>
          </>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          {mode === "signup" && (
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-700 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-gray-100 transition"
            />
          )}
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-700 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-gray-100 transition"
          />
          <input
            type="password"
            placeholder="Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-700 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-gray-100 transition"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-2 rounded-md font-semibold shadow"
          >
            {mode === "login" ? "Login" : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
