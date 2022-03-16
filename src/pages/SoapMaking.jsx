import React from 'react'
import SmallTopNav from '../components/SmallTopNav'

// media
import soapMakingImg from '../assets/soap-making.png'
import soapImg from '../assets/soap.png'
import rosieImg from '../assets/rosie.jpg'
import { useState } from 'react'
import Footer from '../components/Footer'

function SoapMaking() {

    const [noOfParticipants, setNoOfParticipants] = useState("");

    return (
        <>
            <SmallTopNav />

            {/* <div className="rainbow-separator"></div> */}

            <div className="hobby-listing">
                <div className="hobby-listing__title-div">
                    <h1 className="hobby-listing__heading">Soap making</h1>
                    <p className="hobby-listing__p">Wellington</p>
                </div>

                <div className="hobby-listing__img-container">
                    <div className="hobby-listing__soap-making-img-div">
                        <img className="hobby-listing__soap-making-img" src={soapMakingImg} alt="someone making soap by hand" />

                        <img className="hobby-listing__soap-making-img" src={soapImg} alt="blocks of handmade soap" />
                    </div>
                </div>

                <div className="hobby-listing__info-container">
                    <div className="hobby-listing__info-left">
                        <div className="hobby-listing__info-div">
                            <h2 className="hobby-listing__small-heading">Lesson plan</h2>

                            <p className="hobby-listing__p">You'll learn to make candles by melting wax beads, pouring in the desired colours & scents, and setting the wax in a mold of your choosing! The session in an hour long.</p>
                        </div>

                        <div className="hobby-listing__info-div">
                            <h2 className="hobby-listing__small-heading">What's included</h2>

                            <p className="hobby-listing__p">All candle making supplies included - you don't need to bring anything!</p>
                        </div>

                        <div className="hobby-listing__host-div">
                            <h2 className="hobby-listing__small-heading">Meet your host</h2>

                            <div className="hobby-listing__host-profile-div">
                                <img className="hobby-listing__profile-img" src={rosieImg} alt="profile picture" />
                                <p className="hobby-listing__p">Rosie Meadow</p>
                            </div>

                            <p className="hobby-listing__p">Hey, I'm Rosie! I'm a Welly local. I love all kinds of ceative outlets such as sewing, singing, and of course candle making. I work as a barista during the day, and spend my free time working on passion projects.</p>
                        </div>
                    </div>

                    <div className="hobby-listing__booking-right">
                        <div className="hobby-listing__booking-div">
                            <p className="hobby-listing__p"><b>$30</b> per session</p>
                            <p className="hobby-listing__price-p"><b>$15</b> / extra participant</p>

                            <select className="hobby-listing__guest-select" onChange={(e) => setNoOfParticipants(e.target.value)}>
                                <option value=""> No. of participants</option>
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

                            <button className="hobby-listing__booking-btn">Request booking</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default SoapMaking
