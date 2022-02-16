import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, db, storage } from "../config/FirebaseConfig";
import { useAuthContext } from "./useAuthContext";
import { ref, uploadBytesResumable, getDownloadURL, uploadBytes } from "firebase/storage";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export const useSignup = () => {

    let navigate = useNavigate();

    const [isCancelled, setIsCancelled] = useState(false);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [photoURL, setPhotoURL] = useState('');
    const { dispatch } = useAuthContext();

    const signup = async (email, password, displayName, thumbnail, lastName, bio, birthday, ageMath) => {
        setError(null);
        createUserWithEmailAndPassword(auth, email, password)
            .then( async (res) => {
                console.log(thumbnail);

                // dispatch login action
                dispatch({ type: 'LOGIN', payload: res.user });

                // update state
                if (!isCancelled) {
                    setIsPending(false);
                    setError(null);
                }

                // updateProfile(res.user, {displayName});
                const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`;
                const img = await uploadBytes(ref(storage, uploadPath, thumbnail));
                const imgUrl = await getDownloadURL(img.ref);

                // add display AND PHOTO_URL name to user
                await updateProfile(res.user, { displayName, photoURL: imgUrl })
                    // adding extra user information to Firestore
                    .then( async () => {
                        const userID = res.user.uid
                        const todaysDate = new Date();
                        console.log(todaysDate);

                        const userCollectionRef = collection(db, "userDetails");

                        await addDoc(userCollectionRef, {firstName: displayName, lastName, email, bio, birthday, age: ageMath, userID, signedUp: todaysDate});
                    })
                        .then(() => {
                            navigate("/");
                        })
                
            })
            .catch((err) => {
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


    return { signup, error, isPending }

}