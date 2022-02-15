import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import { Modal, Button } from 'react-bootstrap';

// style
import '../sass/style.scss';

function TopNav() {
    const { logout } = useLogout();
    const { user } = useAuthContext();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <div className="top-nav">
                <Link to="/" className="top-nav__h1-hello">Hello <span className="top-nav__h1-hobbi">Hobbi</span></Link>

                {!user && (
                    <div className="top-nav__menu">
                        {/* <Button variant="primary" onClick={handleShow}>
                            Launch demo modal
                        </Button> */}
                        <Button variant="primary" className="top-nav__about" onClick={handleShow}>Login</Button>
                        <Link to="/sign-up" className="top-nav__teach-hobby-btn">Sign up</Link>
                    </div>
                )}

                {user && (
                    <div className="top-nav__menu">
                        <p className="top-nav__about" onClick={logout}>Sign out</p>
                        <Link to="/create-session" className="top-nav__teach-hobby-btn">Teach a hobby</Link>
                    </div>
                )}
            </div>
        </>
    )
}

export default TopNav
