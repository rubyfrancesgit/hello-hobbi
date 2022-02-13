import React, { useState } from 'react';
import SmallTopNav from '../components/SmallTopNav';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// firebase
import { doc, getDoc, addDoc, collection, getDocs, query, where, setDoc } from "firebase/firestore";
import { db } from "../config/FirebaseConfig";

// style
import '../sass/style.scss';

function CreateSession() {
    const hostDetails = document.getElementById('hostDetails');
    const sessionDetails = document.getElementById('sessionDetails');

    const [docID, setDocID] = useState('');
    const [docUniqueID, setDocUniqueID] = useState('');

    // add session photos
    const addPhotoTwo = document.getElementById("addPhotoTwo");
    const addPhotoThree = document.getElementById("addPhotoThree");
    const addPhotoFour = document.getElementById("addPhotoFour");

    // host details
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [bio, setBio] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [profilePicture, setProfilePicture] = useState(null);
    const [age, setAge] = useState(null);
    const [birthday, setBirthday] = useState(null);
    const [startDate, setStartDate] = useState(new Date());

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

    const [sessionPhotoOne, setSessionPhotoOne] = useState(null);
    const [sessionPhotoTwo, setSessionPhotoTwo] = useState(null);
    const [sessionPhotoThree, setSessionPhotoThree] = useState(null);
    const [sessionPhotoFour, setSessionPhotoFour] = useState(null);

    let uniqueID;

        function makeID() {
            var result           = '';
            var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            for ( var i = 0; i < 10; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * 10));
        }
        uniqueID = result;
        }
    makeID();

    function clickFileUpload() {
        console.log('clicked');
        document.getElementById('profilePictureUpload').click();
    }

    const handleProfileFileChange = (e) => {
        console.log("extra click");

        // sets image useState to the image uploaded by user
        if (e.target.files[0]) {
            setProfilePicture(e.target.files[0]);
            setThumbnail(e.target.files[0]);
          }

        const displayProfilePicture = document.getElementById("displayProfilePicture");
        const profilePic = document.getElementById("profilePictureUpload").files[0];

        if(profilePic) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(profilePic);
            fileReader.addEventListener("load", function () {
                // displayProfilePicture.style.display = "block";
                displayProfilePicture.classList.remove("hide");
                displayProfilePicture.src = this.result;
              });   
        }
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

        if (setSessionPhotoOne !== null) {
            console.log(sessionPhotoOne);
        }
    }

    const photoTwoFileChange = (e) => {
        console.log("photo two");
        setSessionPhotoTwo(e.target.files[0]);

        if (setSessionPhotoTwo !== null) {
            console.log(sessionPhotoTwo);
        }
    }

    const photoThreeFileChange = (e) => {
        console.log("photo three");
        // setSessionPhotoThree(e.target.files[0]);

        // if (setSessionPhotoThree !== null) {
        //     console.log(sessionPhotoThree);
        // }
    }

    const photoFourFileChange = (e) => {
        console.log("photo four");
        // setSessionPhotoFour(e.target.files[0]);

        // if (setSessionPhotoFour !== null) {
        //     console.log(sessionPhotoFour);
        // }
    }


    const handleHostDetailsSubmit = async (e) => {
        e.preventDefault();

        hostDetails.classList.add("hide");
        sessionDetails.classList.remove("hide");

        let msDay = 1000 * 3600 * 24;

        let birthDate = new Date (document.getElementById("birthDate").value);
        let todaysDate = new Date();

        let difference = todaysDate.getTime() - birthDate.getTime();

        let dayDifference = difference/msDay;
        let ageMath = (Math.floor(dayDifference/365));
        setAge((Math.floor(dayDifference/365)));

        setBirthday(document.getElementById("birthDate").value);

        submitHost(firstName, lastName, email, bio, birthday, age, uniqueID);

        // if(ageMath < 18) {
        //     console.log("Too young to join")
        // } 

        // else if ( (email !== "") && (thumbnail !== undefined) && (firstName !== "") && (lastName !== "") && (birthDate !== "") && (ageMath >= 18) ) {
        //     console.log("signup complete :)");

        //     console.log(email, thumbnail, firstName, lastName, birthDate, ageMath);

        //     hostDetails.classList.add("hide");
        //     sessionDetails.classList.remove("hide");

        // } 
        
        // else {
        //     console.log("please fill in all fields");
        // }
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

        submitSession(sessionName, city, lessonPlan, whatsIncluded, hostHouse, learnersHouse, publicSetting, extraGuest, extraGuestPrice, sessionPrice);
    }

    const submitHost = async (firstName, lastName, email, bio, birthday, age, uniqueID) => {
        const hostCollectionRef = collection(db, "hostDetails");

        await addDoc(hostCollectionRef, {firstName, lastName, email, bio, birthday, age, uniqueID: uniqueID});

        const colRef = collection(db, 'hostDetails');
        const queryUniqueID = query(colRef, where("uniqueID", "==", uniqueID));
        
        const querySnapshot = await getDocs(queryUniqueID);
        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data().uniqueID);
        setDocID(doc.id);
        setDocUniqueID(doc.data().uniqueID);
});

    }

    const submitSession = (sessionName, city, lessonPlan, whatsIncluded, hostHouse, learnersHouse, publicSetting, extraGuest, extraGuestPrice, sessionPrice) => {
        const sessionCollectionRef = collection(db, "HobbiSessions");

        addDoc(sessionCollectionRef, {sessionName, city, lessonPlan, whatsIncluded, hostHouse, learnersHouse, publicSetting, extraGuest, extraGuestPrice, sessionPrice, uniqueID: docUniqueID});
    }

    return (
        <>
            <SmallTopNav />

            <div className="yellow-banner">
                <h1 className="yellow-banner__h1">Create a session</h1>
            </div>

            <div className="host-details" id="hostDetails">
                <h2 className="host-details__heading">Host details</h2>

                <form className="host-details__form" onSubmit={handleHostDetailsSubmit}>

                    <div className="host-details__profile-picture-container">
                        <div className="host-details__profile-picture-div">
                            <div className="host-details__profile-blank-img" id="blankImgDiv">
                                <img className="host-details__profile-img hide" id="displayProfilePicture" alt="user profile picture" />
                            </div>

                            <div  className="host-details__profile-picture-text">
                                <p className="host-details__p">Choose your profile picture</p>

                                <input className="host-details__hidden-file-upload-btn" id="profilePictureUpload" type="file" accept="image/jpg, image/png,image/jpeg" onChange={handleProfileFileChange} />

                                <input className="host-details__visible-file-upload-btn" type="button" value="Select picture" onClick={clickFileUpload} />
                            </div>
                        </div>
                    </div>

                    <div className="host-details__name-div">
                        <input className="host-details__name-input" id="firstName" type="text" placeholder="First name..." onChange={(e) => setFirstName(e.target.value)} />

                        <input className="host-details__name-input" type="text" placeholder="Last name..." onChange={(e) => setLastName(e.target.value)} />
                    </div>

                    <input className="host-details__input" type="email" id="emailSignUp" placeholder="Email..." onChange={(e) => setEmail(e.target.value)}></input>

                    <div className="host-details__form-div">
                        <p className="host-details__regular-p">Bio</p>
                        <textarea className="host-details__text-area" id="userBio" placeholder="A little about yourself..." autoComplete="off" required onChange={(e) => setBio(e.target.value)} value={bio}  />
                    </div>

                    <div className="host-details__birthday-div">
                        <p className="host-details__regular-p">Birthday</p>
                        <DatePicker className="host-details__input host-details__datepicker" id="birthDate"
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            showYearDropdown
                            yearDropdownItemNumber={75}
                            scrollableYearDropdown={true}
                            scrollableMonthDropdown
                            minDate={new Date("01/01/1902")}
                            maxDate={new Date()} />
                    </div>

                    <button className="host-details__continue-btn" type="submit">Continue</button>
                </form>
            </div>

            {/* session details */}
            <div className="session-details hide" id="sessionDetails">
                <h2 className="session-details__h2">Session details</h2>

                <form className="session-details__form" onSubmit={handleSessionDetailsSubmit}>
                    <div className="session-details__name-city-div">
                        <input className="session-details__input" id="sessionName" type="text" placeholder="Session name..." autoComplete="off" onChange={(e) => setSessionName(e.target.value)} />
                        <input className="session-details__input" id="sessionCity" type="text" placeholder="City..." autoComplete="off" onChange={(e) => setCity(e.target.value)} />
                    </div>

                    <div className="session-details__form-div">
                        <p className="session-details__regular-p">Lesson plan</p>
                        <textarea className="session-details__text-area" id="lessonPlan" placeholder="What you’re going to be doing during the session, length of session etc...." autoComplete="off" onChange={(e) => setLessonPlan(e.target.value)}></textarea>
                    </div>

                    <div className="session-details__form-div">
                        <p className="session-details__regular-p">What's included</p>
                        <textarea className="session-details__text-area" id="whatsIncluded" placeholder="The equipment and materials included..." autoComplete="off" onChange={(e) => setWhatsIncluded(e.target.value)} ></textarea>
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
                                <p className="session-details__p">$</p>
                                <input className="session-details__number-input" id="sessionPrice" type="text" onChange={(e) => setSessionPrice(e.target.value)} />
                                <p className="session-details__p">per session</p>
                            </div>

                            <div className="session-details__pricing-input-div hide" id="extraGuestPriceDiv">
                                <p className="session-details__p">$</p>
                                <input className="session-details__number-input" id="extraGuestPrice" type="text" onChange={(e) => setExtraGuestPrice(e.target.value)} />
                                <p className="session-details__p">per extra guest</p>
                            </div>
                        </div>
                    </div>

                    <div className="session-details__photo-upload-container">
                        <p className="session-details__regular-p">Session images</p>

                        <div className="session-details__add-photo">
                            <input className="session-details__img-upload-btn create-session__img-upload-btn-one" id="sessionPicOne" type="file" accept="image/jpg, image/png,image/jpeg" onChange={photoOneFileChange} />

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

                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    )
}

export default CreateSession
