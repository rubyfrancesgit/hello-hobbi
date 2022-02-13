import React from 'react';

// style
import '../sass/style.scss';

// images
import bulbEducation from '../assets/bulb-education.svg';
import calendar from '../assets/calendar.svg';
import brushCamera from '../assets/brush-camera.svg'
import star from '../assets/star.svg';

function LandingSection() {
    return (
        <div className="landing-page">
            <div className="landing-page__left">
                <p className="landing-page__big-text">
                    Learn <b>hobbies</b>
                    <br />
                    hands on
                    <br />
                    & in person
                </p>
            </div>

            <div className="landing-page__right">
                <div className="landing-page__top">
                    <div className="landing-page__top-left">
                        <img className="landing-page__icon" src={bulbEducation} alt="bulb and graduation cap icon" />
                        <p className="landing-page__p">Connect with & learn from skilled hobbiests</p>
                    </div>
                    <div className="landing-page__top-right">
                        <img className="landing-page__icon" src={calendar} alt="calendar icon" />
                        <p className="landing-page__p">Book sessions when it works best for you</p>
                    </div>
                </div>
                <div className="landing-page__bottom">
                    <div className="landing-page__bottom-left">
                        <img className="landing-page__icon" src={brushCamera} alt="paint brush and camera icon" />
                        <p className="landing-page__p">Get access to equipment & materials</p>
                    </div>
                    <div className="landing-page__bottom-right">
                        <img src={star} alt="star icon" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandingSection
