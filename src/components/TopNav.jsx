import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import { Modal, Button } from 'react-bootstrap';
import { useLogin } from '../hooks/useLogin';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../config/FirebaseConfig';

// style
import '../sass/style.scss';

function TopNav() {
    const { logout } = useLogout();
    const { user } = useAuthContext();

    // modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // login details
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, error, isPending } = useLogin();

    const handleLogin = (e) => {
        console.log(email, password);
        console.log(error);
        e.preventDefault();
        login(email, password);
    }

    onAuthStateChanged(auth, (user) => {
        if (user) {
            setShow(false);
        }
    });

    return (
        <>
            <Modal centered show={show} onHide={handleClose}>
                <form className="login-form" onSubmit={handleLogin}>
                    <h1 className="login-form__heading">Login</h1>

                    <div className="login-form__details">
                        <input className="login-form__input" placeholder="Email..." type="email" required onChange={(e) => setEmail(e.target.value)} />

                        <input className="login-form__input" placeholder="Password..." type="password" required onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    {!isPending && <button className="login-form__login-btn" type="submit"  id="emailLoginBtn">Login</button>}
                    {isPending && <button className="login-form__div" disabled>Loading...</button>}
                    {error && <p>Error: {error}</p>}
                </form>
            </Modal>

            <div className="top-nav">
                <Link to="/" className="top-nav__h1-hello">Hello <span className="top-nav__h1-hobbi">Hobbi</span></Link>

                {!user && (
                    <div className="top-nav__menu">
                        <p className="top-nav__login" onClick={handleShow}>Login</p>
                        <Link to="/sign-up" className="top-nav__login">Sign up</Link>
                        <Link to="/host-a-session" className="top-nav__teach-hobby-btn">Teach a hobby</Link>
                    </div>
                )}

                {user && (
                    <div className="top-nav__menu">
                        <p className="top-nav__sign-out" onClick={logout}>Sign out</p>
                        <Link to="/host-a-session" className="top-nav__teach-hobby-btn">Teach a hobby</Link>
                    </div>
                )}
            </div>
        </>
    )
}

export default TopNav
