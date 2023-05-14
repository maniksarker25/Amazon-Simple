import React, { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from '../firebase/firebase.config';

const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider();

export const authContext = createContext(null)
    

const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true)
    // create user-------
    const createUser = (email,password) =>{
        setLoading(true)
       return createUserWithEmailAndPassword(auth,email,password);
    }
    // google sign in ----------
    const googleSignIn = ()=>{
        setLoading(true)
       return signInWithPopup(auth,googleProvider)
    }
    // email verification
    // log in user --
    const logIn = (email,password) =>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password);
    }
    // send email for reset password -------
    const resetPassword = (email)=>{
        return sendPasswordResetEmail(auth,email);
    }
    // logout -------
    const logOut = ()=>{
        return signOut(auth)
    }
    /// observe user ----
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,currentUser=>{
            // console.log(currentUser)
            setLoading(false)
        })
        // stop observing while unmounting
        return () =>{
            return unsubscribe()
        } 
    },[])
   
    const authInfo = {
        createUser,
        logIn,
        googleSignIn,
        resetPassword,
        logOut,
        user,
        loading
    }
    
    return (
        <authContext.Provider value={authInfo}>
            {children}
        </authContext.Provider>
    );
};

export default AuthProvider;