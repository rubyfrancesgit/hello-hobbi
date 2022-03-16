import React, { useState } from 'react';
import MiniamlTopNav from '../components/MinimalTopNav';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { onAuthStateChanged } from "firebase/auth";
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

// firebase
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { auth, db, storage } from "../config/FirebaseConfig";

// style
import '../sass/style.scss';

function CreateSession() {
    const hostDetails = document.getElementById('hostDetails');
    const sessionDetails = document.getElementById('sessionDetails');

    const errorDiv = document.getElementById("errorDiv");
    const errorDivBackground = document.getElementById("errorDivBackground");
    const [errorMessage, setErrorMessage] = useState('');

    // show add another photo
    const addPhotoTwo = document.getElementById("addPhotoTwo");
    const addPhotoThree = document.getElementById("addPhotoThree");
    const addPhotoFour = document.getElementById("addPhotoFour");

    // session details
    const [sessionName, setSessionName] = useState('');
    const [city, setCity] = useState('');
    const [lessonPlan, setLessonPlan] = useState('');
    const [whatsIncluded, setWhatsIncluded] = useState('');
    const [hostHouse, setHostHouse] = useState(false);
    const [learnersHouse, setLearnersHouse] = useState(false);
    const [publicSetting, setPublicSetting] = useState(false);
    const [extraGuest, setExtraGuest] = useState('');
    const [sessionPrice, setSessionPrice] = useState('');
    const [extraGuestPrice, setExtraGuestPrice] = useState('');
    const [noOfParticipants, setNoOfParticipants] = useState('');

    // set session photos
    const [sessionPhotoOne, setSessionPhotoOne] = useState(null);
    const [sessionPhotoTwo, setSessionPhotoTwo] = useState(null);
    const [sessionPhotoThree, setSessionPhotoThree] = useState(null);
    const [sessionPhotoFour, setSessionPhotoFour] = useState(null);

    let userID;

    onAuthStateChanged(auth, (user) => {
        if (user) {
            userID = (user.uid);
        }
    });

    function closeErrorModal() {
        errorDiv.classList.add("hide");
        errorDivBackground.classList.add("hide");
    }

    // showing hidden photo upload buttons
    const addPhotoTwoShow = () => {
        const addPhotoTwoDiv = document.getElementById("addPhotoTwoDiv");
        addPhotoTwoDiv.classList.remove("hide");
    }
    if(addPhotoTwo){
        addPhotoTwo.addEventListener('click', addPhotoTwoShow);
    }

    const addPhotoThreeShow = () => {
        const addPhotoThreeDiv = document.getElementById("addPhotoThreeDiv");
        addPhotoThreeDiv.classList.remove("hide");
    }
    if(addPhotoThree){
        addPhotoThree.addEventListener('click', addPhotoThreeShow);
    }

    const addPhotoFourShow = () => {
        const addPhotoFourDiv = document.getElementById("addPhotoFourDiv");
        addPhotoFourDiv.classList.remove("hide");
    }
    if(addPhotoFour){
        addPhotoFour.addEventListener('click', addPhotoFourShow);
    }
    

    // session photo upload
    const photoOneFileChange = (e) => {
        console.log("photo one");
        setSessionPhotoOne(e.target.files[0]); 
        // console.log(sessionPhotoOne);
    }

    const photoTwoFileChange = (e) => {
        console.log("photo two");
        setSessionPhotoTwo(e.target.files[0]);
    }

    const photoThreeFileChange = (e) => {
        console.log("photo three");
        setSessionPhotoThree(e.target.files[0]);
    }

    const photoFourFileChange = (e) => {
        console.log("photo four");
        setSessionPhotoFour(e.target.files[0]);
    }

    // session details
    // hiding & showing extra guests info 
    const hideShow = () => {
        if(document.getElementById("yesExtraGuest").checked === true) {
            document.getElementById("noOfParticipantsDiv").classList.remove("hide");
            document.getElementById("extraGuestPriceDiv").classList.remove("hide");
        }

        if(document.getElementById("noExtraGuest").checked === true) {
            document.getElementById("noOfParticipantsDiv").classList.add("hide");
            document.getElementById("extraGuestPriceDiv").classList.add("hide");
        }
    }

    const handleSessionDetailsSubmit = async (e) => {
        e.preventDefault();

        if( (sessionName !== "") && (city !== "") && (lessonPlan !== "") && (whatsIncluded !== "") && (sessionPrice !== "") && ( (hostHouse !== false) || (learnersHouse !== false) || (publicSetting !== false) ) && (extraGuest !== "") && (sessionPhotoOne !== null) ) {
            console.log("form almost filled");
            if(extraGuest === "yesExtraGuest"){
                if((extraGuestPrice !== "") && (noOfParticipants !== "")) {
                    console.log("form complete");
                    submitSession();
                } else {
                    console.log("form not complete");
                    errorDiv.classList.remove("hide");
                    errorDivBackground.classList.remove("hide");
                    setErrorMessage("Please fill in extra guest information!");
                }
            }
            
            else if(extraGuest === "noExtraGuest"){
                console.log("form complete");
                submitSession();
            }
        } 
        
        else {
            console.log("form not filled");
            errorDiv.classList.remove("hide");
            errorDivBackground.classList.remove("hide");
            setErrorMessage("Please fill in all fields!");
        }
    }

    const submitSession = async () => {
        console.log('session submit');
        console.log(userID);

        if(sessionPhotoOne !== null && sessionPhotoTwo === null && sessionPhotoThree === null &&  sessionPhotoFour === null) {
            // setting path to upload img to in firebase storage
            const imgOneUploadPath = `/sessionPhotos/${userID}/session-${sessionName}-${sessionPhotoOne.name}`;
            // uploading the image to storage - set storage, then item that is being stored
            const imgOneUploadTask = await uploadBytesResumable(ref(storage, imgOneUploadPath, sessionPhotoOne));
            // get img URL
            const img1URL = await getDownloadURL(imgOneUploadTask.ref);

            const sessionCollectionRef = collection(db, "HobbiSessions");

            addDoc(sessionCollectionRef, {sessionName, city, lessonPlan, whatsIncluded, hostHouse, learnersHouse, publicSetting, extraGuest, extraGuestPrice, sessionPrice, userID, imgOneURL: img1URL, imgTwoURL: "", imgThreeURL: "", imgFourURL: ""});
        } 
        
        else if(sessionPhotoOne !== null && sessionPhotoTwo !== null && sessionPhotoThree === null &&  sessionPhotoFour === null){
            // IMG ONE
            const imgOneUploadPath = `/sessionPhotos/${userID}/session-${sessionName}-${sessionPhotoOne.name}`;
            const imgOneUploadTask = await uploadBytesResumable(ref(storage, imgOneUploadPath, sessionPhotoOne));
            const img1URL = await getDownloadURL(imgOneUploadTask.ref);

            // IMG TWO
            const imgTwoUploadPath = `/sessionPhotos/${userID}/session-${sessionName}-${sessionPhotoTwo.name}`;
            const imgTwoUploadTask = await uploadBytesResumable(ref(storage, imgTwoUploadPath, sessionPhotoTwo));
            const img2URL = await getDownloadURL(imgTwoUploadTask.ref);

            const sessionCollectionRef = collection(db, "HobbiSessions");

            addDoc(sessionCollectionRef, {sessionName, city, lessonPlan, whatsIncluded, hostHouse, learnersHouse, publicSetting, extraGuest, extraGuestPrice, sessionPrice, userID, imgOneURL: img1URL, imgTwoURL: img2URL, imgThreeURL: "", imgFourURL: ""});
        }
        
        else if(sessionPhotoOne !== null && sessionPhotoTwo !== null && sessionPhotoThree !== null &&  sessionPhotoFour === null){
            // IMG ONE
            const imgOneUploadPath = `/sessionPhotos/${userID}/session-${sessionName}-${sessionPhotoOne.name}`;
            const imgOneUploadTask = await uploadBytesResumable(ref(storage, imgOneUploadPath, sessionPhotoOne));
            const img1URL = await getDownloadURL(imgOneUploadTask.ref);

            // IMG TWO
            const imgTwoUploadPath = `/sessionPhotos/${userID}/session-${sessionName}-${sessionPhotoTwo.name}`;
            const imgTwoUploadTask = await uploadBytesResumable(ref(storage, imgTwoUploadPath, sessionPhotoTwo));
            const img2URL = await getDownloadURL(imgTwoUploadTask.ref);

            // IMG THREE
            const imgThreeUploadPath = `/sessionPhotos/${userID}/session-${sessionName}-${sessionPhotoThree.name}`;
            const imgThreeUploadTask = await uploadBytesResumable(ref(storage, imgThreeUploadPath, sessionPhotoThree));
            const img3URL = await getDownloadURL(imgThreeUploadTask.ref);

            const sessionCollectionRef = collection(db, "HobbiSessions");

            addDoc(sessionCollectionRef, {sessionName, city, lessonPlan, whatsIncluded, hostHouse, learnersHouse, publicSetting, extraGuest, extraGuestPrice, sessionPrice, userID, imgOneURL: img1URL, imgTwoURL: img2URL, imgThreeURL: img3URL, imgFourURL: ""});
        }

        else if(sessionPhotoOne !== null && sessionPhotoTwo !== null && sessionPhotoThree !== null &&  sessionPhotoFour !== null){
            // IMG ONE
            const imgOneUploadPath = `/sessionPhotos/${userID}/session-${sessionName}-${sessionPhotoOne.name}`;
            const imgOneUploadTask = await uploadBytesResumable(ref(storage, imgOneUploadPath, sessionPhotoOne));
            const img1URL = await getDownloadURL(imgOneUploadTask.ref);

            // IMG TWO
            const imgTwoUploadPath = `/sessionPhotos/${userID}/session-${sessionName}-${sessionPhotoTwo.name}`;
            const imgTwoUploadTask = await uploadBytesResumable(ref(storage, imgTwoUploadPath, sessionPhotoTwo));
            const img2URL = await getDownloadURL(imgTwoUploadTask.ref);

            // IMG THREE
            const imgThreeUploadPath = `/sessionPhotos/${userID}/session-${sessionName}-${sessionPhotoThree.name}`;
            const imgThreeUploadTask = await uploadBytesResumable(ref(storage, imgThreeUploadPath, sessionPhotoThree));
            const img3URL = await getDownloadURL(imgThreeUploadTask.ref);

            // IMG FOUR
            const imgFourUploadPath = `/sessionPhotos/${userID}/session-${sessionName}-${sessionPhotoFour.name}`;
            const imgFourUploadTask = await uploadBytesResumable(ref(storage, imgFourUploadPath, sessionPhotoFour));
            const img4URL = await getDownloadURL(imgFourUploadTask.ref);

            const sessionCollectionRef = collection(db, "HobbiSessions");

            addDoc(sessionCollectionRef, {sessionName, city, lessonPlan, whatsIncluded, hostHouse, learnersHouse, publicSetting, extraGuest, extraGuestPrice, sessionPrice, userID, imgOneURL: img1URL, imgTwoURL: img2URL, imgThreeURL: img3URL, imgFourURL: img4URL});
        }
    }

    return (
        <div className="create-session-container">
            <MiniamlTopNav />

            <div className="yellow-banner">
                <h1 className="yellow-banner__h1">Create a session</h1>
            </div>

            {/* session details */}
            <div className="session-details" id="sessionDetails">
                <h2 className="session-details__h2">Session details</h2>

                <div className="session-details__form" >
                    <div className="session-details__name-city-div">
                        <input className="session-details__input" id="sessionName" type="text" placeholder="Session name..." required autoComplete="off" onChange={(e) => setSessionName(e.target.value)} />
                        <input className="session-details__input" id="sessionCity" type="text" placeholder="City..." required autoComplete="off" onChange={(e) => setCity(e.target.value)} />
                    </div>

                    <div className="session-details__form-div">
                        <p className="session-details__regular-p">Lesson plan</p>
                        <textarea className="session-details__text-area" id="lessonPlan" placeholder="What you’re going to be doing during the session, length of session etc...." required autoComplete="off" onChange={(e) => setLessonPlan(e.target.value)}></textarea>
                    </div>

                    <div className="session-details__form-div">
                        <p className="session-details__regular-p">What's included</p>
                        <textarea className="session-details__text-area" id="whatsIncluded" placeholder="The equipment and materials included..." required autoComplete="off" onChange={(e) => setWhatsIncluded(e.target.value)} ></textarea>
                    </div>

                    <div className="session-details__form-div">
                        <p className="session-details__regular-p">Location options</p>
                        <div className="session-details__select-div">
                            <input className="session-details__checkbox-input" id="hostHouse" value="hostHouse" type="checkbox" onChange={(e) => setHostHouse(e.target.checked)} />
                            <label className="session-details__p">Host's house</label>
                        </div>

                        <div className="session-details__select-div">
                            <input className="session-details__checkbox-input" id="learnerHouse" value="learnerHouse" type="checkbox" onChange={(e) => setLearnersHouse(e.target.checked)} />
                            <label className="session-details__p" htmlFor="learnerHouse">Learner's house</label>
                        </div>

                        <div className="session-details__select-div">
                            <input className="session-details__checkbox-input" id="publicSetting" value="publicSetting" type="checkbox" onChange={(e) => setPublicSetting(e.target.checked)} />
                            <label className="session-details__p" htmlFor="publicSetting">Public setting</label>
                        </div>
                    </div>

                    <div className="session-details__extra-learner-div">
                        <p className="session-details__regular-p">Does this session allow for additional learners?</p>

                        <div className="session-details__radio-container">
                            <div>
                                <div className="session-details__radio-div">
                                    <input className="session-details__radio-input" id="yesExtraGuest" value="yesExtraGuest" name="extraGuest" type="radio" onClick={hideShow} onChange={(e) => setExtraGuest(e.target.value)} />
                                    <label className="session-details__p" htmlFor="extraGuest">Yes</label>
                                </div>

                                <div className="session-details__radio-div">
                                    <input className="session-details__radio-input" id="noExtraGuest" value="noExtraGuest" name="extraGuest" type="radio" onClick={hideShow} onChange={(e) => setExtraGuest(e.target.value)} />
                                    <label className="session-details__p" htmlFor="extraGuest">No</label>
                                </div>
                            </div>
                            
                        </div>
                    </div>

                    <div className="session-details__participant-no-div hide" id="noOfParticipantsDiv">
                        <p className="session-details__regular-p">Maximum no. of participants</p>
                        <select className="session-details__participant-no" id="noOfParticipants" onClick={hideShow} onChange={(e) => setNoOfParticipants(e.target.value)}>
                            <option value="">  </option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                    </div>

                    <div className="session-details__pricing-container">
                        <p className="session-details__regular-p">Session price</p>
                        <div className="session-details__pricing-div">
                            <div className="session-details__pricing-input-div">
                                <p className="session-details__light-weight-p">$</p>
                                <input className="session-details__number-input" id="sessionPrice" type="text" required onChange={(e) => setSessionPrice(e.target.value)} />
                                <p className="session-details__light-weight-p">per session</p>
                            </div>

                            <div className="session-details__pricing-input-div hide" id="extraGuestPriceDiv">
                                <p className="session-details__light-weight-p">$</p>
                                <input className="session-details__number-input" id="extraGuestPrice" type="text" onChange={(e) => setExtraGuestPrice(e.target.value)} />
                                <p className="session-details__light-weight-p">per extra guest</p>
                            </div>
                        </div>
                    </div>

                    <div className="session-details__photo-upload-container">
                        <p className="session-details__regular-p">Session images</p>

                        <div className="session-details__add-photo">
                            <input className="session-details__img-upload-btn create-session__img-upload-btn-one" id="sessionPicOne" type="file" accept="image/jpg, image/png,image/jpeg" required onChange={photoOneFileChange} />

                            <button id="addPhotoTwo"> + another photo </button>
                        </div>

                        <div className="session-details__add-photo hide" id="addPhotoTwoDiv">
                            <input className="session-details__img-upload-btn create-session__img-upload-btn-one" id="sessionPicTwo" type="file" accept="image/jpg, image/png,image/jpeg" onChange={photoTwoFileChange} />

                            <button id="addPhotoThree"> + another photo </button>
                        </div>

                        <div className="session-details__add-photo hide" id="addPhotoThreeDiv">
                            <input className="session-details__img-upload-btn create-session__img-upload-btn-one" id="sessionPicThree" type="file" accept="image/jpg, image/png,image/jpeg" onChange={photoThreeFileChange} />

                            <button id="addPhotoFour"> + another photo </button>
                        </div>

                        <div className="session-details__add-photo hide" id="addPhotoFourDiv">
                            <input className="session-details__img-upload-btn create-session__img-upload-btn-one" id="sessionPicFour" type="file" accept="image/jpg, image/png,image/jpeg" onChange={photoFourFileChange} />
                        </div>
                    </div>

                    <div className="session-details__photo-display-container hide">
                        <div className="session-details__photo-display" id="photoDisplayOne"></div>
                        <div className="session-details__photo-display" id="photoDisplayTwo"></div>
                    </div>

                    <button className="session-details__submit" onClick={handleSessionDetailsSubmit}>Submit</button>
                </div>
            </div>

            <div className="error-div hide" id="errorDiv">
                <p className="error-div__p">{errorMessage}</p>
            </div>
            <div className="error-div-background hide" id="errorDivBackground" onClick={closeErrorModal}></div>
        </div>
    )
}

export default CreateSession
