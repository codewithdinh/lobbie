import React, { useContext } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';

const Header = () => {
    const location = useLocation();
    const themeContext = useContext(ThemeContext);
    
    if (!themeContext) {
        console.error('ThemeContext is not available');
        return null;
    }

    const { isDarkMode, toggleTheme } = themeContext;

    return (
        <>
            <nav className="navbar">
                <div className="navbar-brand">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="brand-icon">
                        <path d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <Link to="/"><h1>Lobbie</h1></Link>
                </div>
                
                <div className="navbar-nav">
                    <Link 
                        to="/" 
                        className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="nav-icon">
                            <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Home
                    </Link>
                    <Link 
                        to="/createpost" 
                        className={`nav-link ${location.pathname === '/createpost' ? 'active' : ''}`}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="nav-icon">
                            <path d="M12 4v16m8-8H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Create New Post
                    </Link>
                    <button 
                        onClick={toggleTheme} 
                        className="theme-toggle"
                        aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
                    >
                        {isDarkMode ? (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        ) : (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        )}
                    </button>
                </div>
            </nav>
            <main className="main-content">
                <Outlet />
            </main>
        </>
    )
}

export default Header;
