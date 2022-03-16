import React from 'react'
import { Link } from "react-router-dom";
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

// style
import '../sass/style.scss';

function MiniamlTopNav() {
    const { logout } = useLogout();
    const { user } = useAuthContext();
    
    return (
        <div className="minimal-top-nav">
            <Link to="/" className="minimal-top-nav__heading">Hello <span className="minimal-top-nav__hobbi-heading">Hobbi</span></Link>
        </div>
    )
}

export default MiniamlTopNav
