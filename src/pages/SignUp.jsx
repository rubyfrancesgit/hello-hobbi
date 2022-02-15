import React, { useState } from 'react';
import SmallTopNav from '../components/SmallTopNav';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// firebase
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db, storage } from "../config/FirebaseConfig";

// hooks
import { useSignup } from '../hooks/useSignup';
import { useAuthContext } from "../hooks/useAuthContext";

// style
import '../sass/style.scss'; 
import { ref, uploadBytesResumable } from 'firebase/storage';

function SignUp() {

    const { signup, isPending, error, imgUrl } = useSignup();
    const { user } = useAuthContext();

    const [docID, setDocID] = useState('');
    const [docUniqueID, setDocUniqueID] = useState('');

    const errorDiv = document.getElementById("errorDiv");
    const errorDivBackground = document.getElementById("errorDivBackground");
    const [errorMessage, setErrorMessage] = useState('');

    // host details
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [bio, setBio] = useState('');
    // const [thumbnail, setThumbnail] = useState(null);
    const [profilePicture, setProfilePicture] = useState(null);
    const [age, setAge] = useState(null);
    const [birthday, setBirthday] = useState(null);
    const [startDate, setStartDate] = useState(new Date());

    function closeErrorModal() {
        errorDiv.classList.add("hide");
        errorDivBackground.classList.add("hide");
    }

    // create unique ID for users so user data and session data can be matched up later on
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

    const handleProfileFileChange = (e) => {
        console.log("extra click");

        // sets image useState to the image uploaded by user
        if (e.target.files[0]) {
            setProfilePicture(e.target.files[0]);
            // setThumbnail(e.target.files[0]);
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

    const handleHostDetailsSubmit = async (e) => {
        e.preventDefault();

        let msDay = 1000 * 3600 * 24;

        let birthDate = new Date (document.getElementById("birthDate").value);
        let todaysDate = new Date();

        let difference = todaysDate.getTime() - birthDate.getTime();

        let dayDifference = difference/msDay;
        let ageMath = (Math.floor(dayDifference/365));
        setAge((Math.floor(dayDifference/365)));

        setBirthday(birthDate);

        if(ageMath < 18) {
            console.log("Too young to join")
            errorDiv.classList.remove("hide");
            errorDivBackground.classList.remove("hide");
            setErrorMessage("Sorry, you must be 18 years or older to join");
        } 

        else if ( (email !== "") && (profilePicture !== null) && (firstName !== "") && (lastName !== "") && (birthDate !== "") && (ageMath >= 18) ) {
            console.log("signup complete :)");

            await signup(email, password, firstName, profilePicture, lastName, bio, birthDate, ageMath, uniqueID);

            // submitHost(ageMath);
        } 
        
        else {
            console.log("please fill in all fields");
            errorDiv.classList.remove("hide");
            errorDivBackground.classList.remove("hide");
            setErrorMessage("Please fill in all fields!");
        }
    }

    const submitHost = async (ageMath) => {

        // setting path to upload img to in firebase storage
        const imgUploadPath = `/profilePhotos/${uniqueID}/${profilePicture.name}`;
        // connecting the upload path the firebase storage (imported from config)
        const imgStorageRef = ref(storage, imgUploadPath);
        // uploading the image to storage - set storage, then item that is being stored
        const imgUploadTask = uploadBytesResumable(imgStorageRef, profilePicture);

        const userCollectionRef = collection(db, "userDetails");

        await addDoc(userCollectionRef, {firstName, lastName, email, bio, birthday, age: ageMath, uniqueID});

        const colRef = collection(db, 'userDetails');
        const queryUniqueID = query(colRef, where("uniqueID", "==", uniqueID));
        
        const querySnapshot = await getDocs(queryUniqueID);
        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data().uniqueID);
        setDocID(doc.id);
        setDocUniqueID(doc.data().uniqueID);
        });
    }

    return (
        <div className="create-session-container">
            <SmallTopNav />

            <div className="yellow-banner">
                <h1 className="yellow-banner__h1">Sign up</h1>
            </div>

            <div className="host-details" id="hostDetails">
                {/* <h2 className="host-details__heading">Sign up</h2> */}

                <form className="host-details__form" onSubmit={handleHostDetailsSubmit}>

                    <div className="host-details__profile-picture-container">
                        <div className="host-details__profile-picture-div">
                            <div className="host-details__profile-blank-img" id="blankImgDiv">
                                <img className="host-details__profile-img hide" id="displayProfilePicture" alt="user profile picture" />
                            </div>

                            <div  className="host-details__profile-picture-text">
                                <p className="host-details__p">Choose your profile picture</p>

                                <input className="host-details__visible-file-upload-btn" id="profilePictureUpload" type="file" accept="image/jpg, image/png,image/jpeg" required onChange={handleProfileFileChange} />

                                {/* <input className="host-details__visible-file-upload-btn" type="button" value="Select picture" onClick={clickFileUpload} /> */}
                            </div>
                        </div>
                    </div>

                    <div className="host-details__name-div">
                        <input className="host-details__name-input" id="firstName" type="text" placeholder="First name..." required onChange={(e) => setFirstName(e.target.value)} />

                        <input className="host-details__name-input" type="text" placeholder="Last name..." required onChange={(e) => setLastName(e.target.value)} />
                    </div>

                    <div className="host-details__name-div">
                        <input className="host-details__input host-details__email-input" type="email" id="emailSignUp" placeholder="Email..." required onChange={(e) => setEmail(e.target.value)}></input>

                        <input className="host-details__input host-details__number-input" type="text" id="passwordSignUp" placeholder="Password..." onChange={(e) => setPassword(e.target.value)}></input>
                    </div>

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

                    <button className="host-details__continue-btn" type="submit">Sign up</button>
                </form>
            </div>

            <div className="error-div hide" id="errorDiv">
                <p className="error-div__p">{errorMessage}</p>
            </div>
            <div className="error-div-background hide" id="errorDivBackground" onClick={closeErrorModal}></div>
        </div>
    )
}


export default SignUp
