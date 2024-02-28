"use client";
import { auth, googleAuthProvider } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { useRouter } from "next/navigation"; // Import useRouter
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";


export default function Auth() {
  const router = useRouter(); // Initialize useRouter

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
  

  const SignIn = async () => {
    
    
    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/Home"); // Use router.push
      toast.success("Signed In successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Error signing in");
     
    } finally {
      setLoading(false); 
    }
   
   
  };

  const SignInWithGoogle = async () => {
    
    try {
     
      await signInWithPopup(auth, googleAuthProvider);
      toast.success("Signed In successfully!");
      router.push("/Home"); // Use router.push
    } catch (error) {
      console.error(error);
     
    }
  } 
 
  return (
    <div className=" min-h-full w-1/3 mx-auto my-[5%] p-5 bg-slate-50 border rounded-md grid">
      <p className="text-center text-blue-500 text-lg">Sign In</p>
      <input
      className="w-full p-2  rounded m-2 items-center mx-auto border "
        
        type="text"
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
      className="w-full p-2  rounded m-2 items-center mx-auto border"
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="py-1 px-5 w-fit text-center text-blue-800 bg-blue-400 rounded-md m-2 items-center mx-auto" onClick={SignIn}>{loading ? "Signing In..." : "Sign In"}</button>
      <span>Do you have a Google account? <button className="p-2 w-fit text-center rounded-lg font-bold text-blue-500 hover:text-green-500" onClick={SignInWithGoogle}>Sign with google</button>
      </span>
      
    </div>
  );
}
