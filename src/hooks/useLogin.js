import { useEffect, useState } from "react";
import { auth } from '../config/FirebaseConfig';
import { useAuthContext } from "./useAuthContext";
import { signInWithEmailAndPassword } from "firebase/auth";

export const useLogin = () => {
    const [isCancelled, setIsCancelled] = useState(false);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        setError(null);
        setIsPending(true);

        signInWithEmailAndPassword(auth, email, password)
            .then((res) => {
                console.log('user logged in:', res.user);

                // dispatch login action
                    dispatch({ type: 'LOGIN', payload: res.user });

                // update state
                if (!isCancelled) {
                    setIsPending(false);
                    setError(null);
                }  
            })
            .catch((err) => {
                if (!isCancelled) {
                    console.log(err.message)
                    setError(err.message)
                    setIsPending(false)
                }
            })
    }



    // const login = async (email, password) => {
    //     setError(null);
    //     setIsPending(true);

    //     // sign user in
    //     try {
    //         const res = await signInWithEmailAndPassword(email, password);

    //         // dispatch login action
    //         dispatch({ type: 'LOGIN', payload: res.user });

    //         // update state
    //         if (!isCancelled) {
    //             setIsPending(false);
    //             setError(null);
    //         }  
    //     }
    //     catch(err) {
    //         if (!isCancelled) {
    //             console.log(err.message)
    //             setError(err.message)
    //             setIsPending(false)
    //         }
    //     }
    // }

    useEffect(() => {
        return () => setIsCancelled(true);
    }, []);

    return { login, error, isPending };
}