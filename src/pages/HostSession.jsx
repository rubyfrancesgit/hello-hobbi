import React from 'react';
import TopNav from '../components/TopNav';
import { Link } from "react-router-dom";
import { useAuthContext } from '../hooks/useAuthContext';

// style
import '../sass/style.scss';

// images
import checkedBox from '../assets/checked-box.svg';
import Footer from '../components/Footer';
import SmallTopNav from '../components/SmallTopNav';

function HostSession() {

    const { user } = useAuthContext();

    return (
        <>
            <SmallTopNav />
            <div className="host-session">
                <div className="host-session__title-div">
                    <h2 className="host-session__title">Host a session</h2>
                </div>

                <div className="host-session__body">
                    <div className="host-session__left">
                        <p className="host-session__big-text">Earn <b>money</b> teaching people the <b>skills</b> you know & love </p>
                    </div>

                    <div className="host-session__right">
                        <p className="host-session__h3">Three things you need to be host a Hobbi:</p>

                        <div className="host-session__list-div">
                            <div className="host-session__list-item-div">
                                <img className="host-session__tick-icon" src={checkedBox} alt="checked box icon" />
                                <p className="host-session__p"><span className="host-session__regular-p">Experience</span> - you don’t need to be an expert by any means! But you’ve got to know your way around the hobby you're going to teach - at least enough to show a beginner.</p>
                            </div>

                            <div className="host-session__list-item-div">
                                <img className="host-session__tick-icon" src={checkedBox} alt="checked box icon" />
                                <p className="host-session__p"><span className="host-session__regular-p">Equipment</span> - if you’re teaching a hobby that requires equipment or materials, make sure to prepare anything you might need ahead of time.</p>
                            </div>

                            <div className="host-session__list-item-div">
                                <img className="host-session__tick-icon" src={checkedBox} alt="checked box icon" />
                                <p className="host-session__p"><span className="host-session__regular-p">Teahcing</span> - Hobbi is all about learning new skills, so you’ve got to be comfortable with teaching a skill. If you don’t have experience, you can always start by teaching a friend first!</p>
                            </div>
                        </div>

                        {user && (
                            <Link to="/create-session" className="host-session__apply-btn">Apply here!</Link>
                        )}

                        {!user && (
                            <button className="host-session__apply-btn">Login or sign up to apply</button>
                        )}
                    </div>
                </div>

                <div className="host-session__contact-div">
                    <p className="host-session__contact-p">Not sure if you’re a good fit? Get in contact and we can talk it through with you! Email us at hobbi@gamil.com</p>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default HostSession
