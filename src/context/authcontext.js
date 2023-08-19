import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import {
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "firebase/auth";

import Loader from "@/components/loader";
import { firebaseAuth } from "@/service/firebase";
import { useRouter } from "next/router";
import { message } from "antd";
const AuthContextProvider = createContext(null);

function AuthProvider({ children }) {
    const [loading, setloading] = useState(true);
    const [user, setuser] = useState(null);
    const [isAuthenticated, setisAuthenticated] = useState(false);
    const { push } = useRouter()
    const login = useCallback(async ({ email, password }) => {
        try {
            const response = await signInWithEmailAndPassword(firebaseAuth, email, password)
            if (response) {
                push("/dashboard")
            }
        } catch (error) {
            console.log("🚀 ~ file: AuthContext.tsx:12 ~ login ~ error:", error)
            message.error("something went wrong")
        }
    }, [push])

    const signup = useCallback(async ({ email, password, username, repeatpassward, lastname }) => {
        try {
            const { user } = await createUserWithEmailAndPassword(firebaseAuth, email, password);
            updateProfile(user, {
                displayName: firstname,
                photoURL: image,
                lastname: lastname,
            });
        } catch (error) {
            // Handle error
        }
    }, [push]);

    const signout = useCallback(async () => {
        try {
            await signOut(firebaseAuth);
            push("/")
        } catch (error) {
            console.log(error);
        }
    }, [push]);

    const checkAuth = useCallback(() => {
        onAuthStateChanged(firebaseAuth, async (_user) => {
            setloading(true);
            setuser(_user);
            setisAuthenticated(!!_user);
            setloading(false);
        });
    }, [user]);

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    const value = useMemo(() => ({
        login,
        signup,
        signout,
        isAuthenticated,
        user,
    }), [
        login,
        signup,
        signout,
        isAuthenticated,
        user,
    ]);

    return (
        <div>
            <AuthContextProvider.Provider value={value} >
                <div >
                    {loading ? <Loader /> : children}
                </div>
            </AuthContextProvider.Provider>
        </div>
    );
}
export { AuthContextProvider, AuthProvider };