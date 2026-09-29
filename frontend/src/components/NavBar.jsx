import { Link, useNavigate, useLocation } from "react-router-dom";
import '../style/navbar.css';
import { useEffect, useState } from "react";

function NavBar() {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const navigate = useNavigate();
    const location = useLocation();

    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        setToken(null);
        navigate("/login");
    };

    useEffect(() => {
        setToken(localStorage.getItem('token'));
    }, [location]);

    return (
        <nav className='navbar'>
            <div className='logo'>TaskSphere-MERN</div>
            <ul className='nav-links'>
                {
                    token ?
                        <>
                            <li><Link to="/">List</Link></li>
                            <li><Link to="/add">Add Task</Link></li>
                            <li><Link to="#" onClick={logout} className="logout-link">Logout</Link></li>
                        </> : null
                }
            </ul>
        </nav>
    );
}

export default NavBar;