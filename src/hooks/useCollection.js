import React, { useEffect, useState } from 'react';
import { db } from '../config/FirebaseConfig';
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

function useCollection(stuff) {

    const [documents, setDocuments] = useState(null);
    const [error, setError] = useState(null);

    useEffect( async () => {

        let ref = (collection(db, stuff));

        const querySnapshot = await getDocs(ref);
        const unsubscribe = querySnapshot.forEach((doc) => {
            // console.log(doc.id, " => ", doc.data);
            // console.log(querySnapshot.docs);

            let results = [];
            querySnapshot.docs.forEach(doc => {
                results.push({ ...doc.data(), id: doc.id })
            })

            // update state
            setDocuments(results);
            setError(null);

        }, (error) => {
            console.log(error);
            setError('Could not fetch the data');
        })

        // unsubscribe or unmount
        return () => unsubscribe()

        // let ref = db.collection(collection);
        // const unsubscribe = ref.onSnapshot((snapshot) => {
        //     let results = [];
        //     snapshot.docs.forEach(doc => {
        //         results.push({ ...doc.data(), id: doc.id })
        //     })

        //     // update state
        //     setDocuments(results);
        //     setError(null);
        // }, (error) => {
        //     console.log(error);
        //     setError('could not fetch the data');
        // })

        // // unsubscribe or unmount
        // return () => unsubscribe()

    }, [collection])

    return { documents, error }
}

export default useCollection
