import React from 'react';
import useCollection from '../hooks/useCollection';
import { getStorage, ref, getDownloadURL } from "firebase/storage";

// style
import '../sass/style.scss';

import imgUrl from '../assets/photography.png'

function AvailableHobbies({ src }) {

    const { documents, error } = useCollection('HobbiSessions')
    // let displayImg;
    // let img;

    // documents.map((docs) => {
    //     console.log(docs.imgOneURL);
    //     const storage = getStorage();
    //     getDownloadURL(ref (storage, docs.imgOneURL))
    //         .then((url) => {
    //             console.log(url)
    //             // `url` is the download URL for 'images/stars.jpg'
            
    //             // This can be downloaded directly:
    //             const xhr = new XMLHttpRequest();
    //             xhr.responseType = 'blob';
    //             xhr.onload = (event) => {
    //             const blob = xhr.response;
    //             };
    //             xhr.open('GET', url);
    //             xhr.send();
            
    //             // Or inserted into an <img> element
    //             // img = document.getElementById('img');
    //             // img.setAttribute('src', url);
    //         })
    //         .catch((error) => {
    //             // Handle any errors
    //         });
    // });

    return (
        <>
            {error && <p>{error}</p>}
            {documents &&

                <div className="available-hobbies">
                    <div className="available-hobbies__div">
                        {documents.map((availableHobbi) => (
                            <>
                                <p>{availableHobbi.sessionName}</p>
                                <img className="available-hobbies__img" src={availableHobbi.imgOneURL}  alt="" id="img" />
                                <div style={{width: '12rem', height: '12rem', background: `url(${availableHobbi.imgOneURL}) no-repeat`}}></div>
                                <p>{availableHobbi.imgOneURL}</p>
                            </>
                        ))}
                    </div>
                </div>
            }
        </>
    )
}

export default AvailableHobbies
