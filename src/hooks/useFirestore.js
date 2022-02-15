// not currently in use (skipped the rest of these lessons on Udemy)

import { useReducer, useEffect, useState } from "react";
import { db } from "../config/FirebaseConfig";
import { userCollectionRef } from "../config/FirebaseConfig";

let initialState = {
    document: null,
    isPending: false,
    error: null,
    success: null
}

const firestoreReducer = (state, action) => {
    switch (action.type) {
        case 'IS_PENDING':
            return { isPending: true, document: null, success: false, error: null }
        case 'ADDED-DOCUMENT':
            return { isPending: false, document: action.payload, success: true, error: null }
        case 'ERROR' :
            return { isPending: false, document: null, success: false, error: action.payload }
        default:
            return state
    }
}

export const useFirestore = (collection) => {
    const [response, dispatch] = useReducer(firestoreReducer, initialState);
    const [isCancelled, setIsCancelled] = useState(false);

    // collection ref
    const ref = userCollectionRef;

    // only dispatch is not cancelled
    const dispatchIfNotCancelled = (action) => {
        if (!isCancelled) {
            dispatch(action);
        }
    }

    // add document
    const addDocument = async (doc) => {
        dispatch({type: 'IS_PENDING'});

        try {
            const addedDocument = await ref.add(doc);
            dispatchIfNotCancelled({ type: 'ADDED_DOCUMENT', paylaod: addedDocument})
        }
        catch(err) {
            dispatchIfNotCancelled({ type: 'ERROR', payload: err.message })
        }
    }

    // delete a document
    const deleteDocument = (id) => {

    }

    // clean up
    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return { addDocument, deleteDocument, response }
}