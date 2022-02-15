import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from '../config/FirebaseConfig';
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
    const [isCancelled, setIsCancelled] = useState(false);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();

    const logout = () => {
        setError(null);
        setIsPending(true);

        signOut(auth)
            .then(() => {
                console.log('user signed out');

                // dispatch logout action
                dispatch({ type: 'LOGOUT' });

                // update state
                if (!isCancelled) {
                    setIsPending(false);
                    setError(null);
                }  
            })
            .catch((err) => {
                // console.log(err.message);
                if (!isCancelled) {
                    console.log(err.message)
                    setError(err.message)
                    setIsPending(false)
                }
            })
    }

    useEffect(() => {
        return () => setIsCancelled(true);
    }, []);

    return { logout, error, isPending };
}