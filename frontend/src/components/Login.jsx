import { useEffect, useState } from 'react'
import '../style/addtask.css'
import '../style/App.css'
import { Link, useNavigate } from 'react-router-dom'
import API from '../api'

export default function Login() {

    const [userData, setUserData] = useState({ email: '', password: '' })
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/');
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post("/login", { 
                email: userData.email, 
                password: userData.password 
            });
            
            if (res.data.success) {
                localStorage.setItem("token", res.data.token);
                alert("Login successful!");
                navigate('/');
            } else {
                alert(res.data.msg || "Login failed");
            }
        } catch (err) {
            alert("Login failed");
        }
    };

    return (
        <div className="container" >
            <h1>Login</h1>

            <label htmlFor="">Email</label>
            <input 
                onChange={(event) => setUserData({ ...userData, email: event.target.value })}
                type="text" 
                name="email" 
                placeholder="Enter user email" 
                autoComplete='off' 
            />

            <label htmlFor="">Password</label>
            <input 
                onChange={(event) => setUserData({ ...userData, password: event.target.value })}
                type="password" 
                name="password" 
                placeholder="Enter user password" 
                autoComplete='new-password' 
            />

            <button onClick={handleLogin} className="submit" >Login</button>
            <Link className='link' to="/signup" >Sign up</Link>

        </div>
    )
}