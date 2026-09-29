import { Link,  useNavigate, useLocation } from "react-router-dom";
import '../style/navbar.css'
import { useEffect, useState } from "react";


function NavBar() {
    const [login, setLogin] = useState(localStorage.getItem('login'))
    const navigate = useNavigate() 
    const location = useLocation();   

    const logout = () => {
        localStorage.removeItem('login')
        setLogin(null)
        setTimeout(() => {
            navigate("/login")            
        }, 0);
    }   

    useEffect(() => {
        setLogin(localStorage.getItem('login'));
    }, [location]);

    return (
        <nav className='navbar' >
            <div className='logo' >TaskSphere-MERN </div>
            <ul className='nav-links' >
                {
                    login ?
                        <>
                            <li> <Link to="/" >List </Link> </li>
                            <li> <Link to="/add" >Add Task </Link> </li>
                            <li> <Link onClick={logout} >Logout</Link> </li>
                        </> : null
                }
            </ul>
        </nav>
    )
}
export default NavBar   


