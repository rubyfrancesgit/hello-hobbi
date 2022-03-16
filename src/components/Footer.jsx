import React from 'react'
// import { Link } from "react-router-dom";

// style
import '../sass/style.scss';

// media
import facebookIcon from '../assets/facebook.svg';
import instagramIcon from '../assets/instagram.svg';

function Footer() {
    return (
        <div className="footer">
            <p className="footer__p">About</p>

            <div className="footer__contact-div">
                <p className="footer__light-p">Contact:</p>
                <p className="footer__p">support@hellohobbi.co.nz</p>
            </div>

            <div className="footer__social-div">
                <img className="footer__icon" src={facebookIcon} alt="Facebook icon" />
                <img className="footer__icon" src={instagramIcon} alt="Instagram icon" />
            </div>
        </div>
    )
}

export default Footer
