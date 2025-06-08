import React, { useState, useEffect } from "react";
import { 
  onAuthStateChanged, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword 
} from "firebase/auth";
import { AuthContext } from "./UseAuth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../fireabase";

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      await initializeUser(user);
    });

    return () => unsubscribe();
  }, []);

  const initializeUser = async (user) => {
    if (user) {
      try {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setCurrentUser({
            uid: user.uid,
            email: user.email,
            ...userData,
          });
        } else {
          // User doc does not exist — set minimal user info
          setCurrentUser({
            uid: user.uid,
            email: user.email,
          });
          console.warn("No user document found in Firestore for this user.");
        }
        setUserLoggedIn(true);
      } catch (error) {
        console.error("Error initializing user:", error);
        setCurrentUser(null);
        setUserLoggedIn(false);
      }
    } else {
      setCurrentUser(null);
      setUserLoggedIn(false);
    }
    setLoading(false);
  };

  const signup = async (userData) => {
    try {
      const { email, password, ...additionalData } = userData;
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        ...additionalData,
      });

      setCurrentUser({
        uid: user.uid,
        email: user.email,
        ...additionalData,
      });

      setUserLoggedIn(true);
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setCurrentUser({
          uid: user.uid,
          email: user.email,
          ...userData,
        });
      } else {
        setCurrentUser({
          uid: user.uid,
          email: user.email,
        });
        console.warn("No user document found in Firestore for this user.");
      }

      setUserLoggedIn(true);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = () => {
    auth.signOut();
    setCurrentUser(null);
    setUserLoggedIn(false);
  };

  const value = {
    currentUser,
    userLoggedIn,
    setCurrentUser,
    signup,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
