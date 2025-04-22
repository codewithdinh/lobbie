import { Outlet, Link } from "react-router-dom";

const SideBar = () => {
    return (
        <div>
            <div>
                <div>
                    <h1>Lobbie</h1>
                </div>
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/createnewpost">Create New Post</Link></li>
                        <li><Link to="/register">Register</Link></li>
                    </ul>
                </nav>
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    )

}


export default SideBar;