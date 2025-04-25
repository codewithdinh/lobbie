import React from 'react'
import { Link, Outlet } from 'react-router-dom';

const Header = () => {
    return (
        <header className="title">
            Lobbie
            <nav>
                <Link to="/" className="nav-link">Home</Link>
                {/* <li><Link to="/login">Login</Link></li> */}
                <Link to="/createpost" className="nav-link">Create New Post</Link>
                {/* <li><Link to="/register">Register</Link></li> */}
            </nav>
            <div className="main-content">
                <Outlet />
            </div>
        </header>
    )
}

export default Header;
