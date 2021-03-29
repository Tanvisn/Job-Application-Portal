import React from 'react';
import { Link } from 'react-router-dom';
import { NavLink, NavItem } from 'reactstrap'

const Menu = () => {
    return (
        // <> 
        //     <a href="/about">About Us</a>
        //     <a href="/">Home</a>
        // </>
        <div>
            <Link to="/" className="mr-2 text-white">Login</Link>
            <Link to="/register" className="mr-2 text-white">Register</Link>
        </div>


    )
}

export default Menu;