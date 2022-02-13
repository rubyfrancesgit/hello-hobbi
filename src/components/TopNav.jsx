import React from 'react';
import { Link } from "react-router-dom";

// style
import '../sass/style.scss';

function TopNav() {
    return (
        <div className="top-nav">
            <Link to="/" className="top-nav__h1-hello">Hello <span className="top-nav__h1-hobbi">Hobbi</span></Link>

            <div className="top-nav__menu">
                <p className="top-nav__about">About</p>
                <Link to="/host-a-session" className="top-nav__teach-hobby-btn">Host a session</Link>
            </div>
        </div>
    )
}

export default TopNav
