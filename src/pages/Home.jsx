import React from 'react';
import AvailableHobbies from '../components/AvailableHobbies';
import Footer from '../components/Footer';
import LandingSection from '../components/LandingSection';
import LaunchBanner from '../components/LaunchBanner';
import TopNav from '../components/TopNav';
import SmallTopNav from '../components/SmallTopNav';

function Home() {
    return (
        <>
            <SmallTopNav />
            <LandingSection />
            <AvailableHobbies />
            <Footer />
        </>
    )
}

export default Home
