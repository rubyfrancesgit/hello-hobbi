import React from 'react'
import { Link } from "react-router-dom";
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

// style
import '../sass/style.scss';

function SmallTopNav() {
    const { logout } = useLogout();
    const { user } = useAuthContext();
    
    return (
        <div className="small-top-nav">
            <Link to="/" className="small-top-nav__heading">Hello <span className="small-top-nav__hobbi-heading">Hobbi</span></Link>
            {user && (
                <button className="small-top-nav__sign-out-btn" onClick={logout}>Sign out</button>
            )}
        </div>
    )
}

export default SmallTopNav
