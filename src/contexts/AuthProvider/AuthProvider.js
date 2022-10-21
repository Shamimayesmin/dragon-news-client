import React, { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from 'firebase/auth'
import app from '../../firebase/firebase.config';

export const AuthContext = createContext()

const auth = getAuth(app)

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading,setLoading] = useState(true);

    // const user = {displayName : 'shamima'}

    const providerLogin = (provider) =>{
        setLoading(true)
        return signInWithPopup(auth,provider)
    }


    const createUser = (email,password) =>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }

    const signIn = (email,password) =>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)

    }

    const updateUserProfile = (profile) =>{
        return updateProfile(auth.currentUser, profile)
    }


    const verifyEmail = () =>{
        return sendEmailVerification(auth.currentUser)
    }

    const logOut = () =>{
        setLoading(true)
        signOut(auth)
    }

    

    useEffect(() =>{
    const unsubscribe =     onAuthStateChanged(auth, (currentUser) =>{
            console.log('user inside state change', currentUser)
            // setUser(currentUser)
            // email verifiy ensure (optional)
            if(currentUser === null || currentUser.emailVerified){
                setUser(currentUser)
            }
            setLoading(false)
        })
        return () =>{
            unsubscribe()
        }
    },[])

    const authInfo = {user,providerLogin, logOut,createUser,signIn,loading,setLoading,updateUserProfile,verifyEmail}
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;