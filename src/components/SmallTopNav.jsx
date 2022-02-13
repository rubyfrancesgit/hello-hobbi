import React from 'react'
import { Link } from "react-router-dom";

// style
import '../sass/style.scss';

function SmallTopNav() {
    return (
        <div className="small-top-nav">
            <Link to="/" className="small-top-nav__heading">Hello <span className="small-top-nav__hobbi-heading">Hobbi</span></Link>
        </div>
    )
}

export default SmallTopNav
