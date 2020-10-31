import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import logo from '../../images/logo.png';
import './Header.css';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    return (
        <div className="header_container">
            <img src={logo} alt=""/>
            <nav>
                <Link to ="/Shop">Shop</Link>
                <Link to ="/Review">Order Review</Link>
                <Link to ="/Enventory">Enventory</Link>
            <button className="btn btn-light px-4 my-3" onClick={() => setLoggedInUser({})}>sign out</button>
            </nav>
        </div>
    );
};

export default Header;