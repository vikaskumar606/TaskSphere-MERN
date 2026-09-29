import { useEffect, useState } from 'react'
import '../style/addtask.css'
import '../style/App.css'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {

    const [userData, setUserData] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem('login')) {
            navigate('/');
        }
    }, [navigate]);

    const handleLogin = async () => {
        console.log(userData);
        let result = await fetch('http://localhost:3200/login', {
            method: 'Post',
            body: JSON.stringify(userData),
            headers: {
                'Content-Type': 'Application/Json'
            }
        })
        result = await result.json()
        if (result.success) {
            document.cookie = "token=" + result.token + "; path=/;";            
            localStorage.setItem('login', userData.email);
            navigate('/')

        } else {
            alert("Try after sometime")
        }
    }


    return (
        <div className="container" >
            <h1>Login</h1>



            <label htmlFor="">Email</label>
            <input onChange={(event) => setUserData({ ...userData, email: event.target.value })}
                type="text" name="email" placeholder="Enter user email" autoComplete='off' />

            <label htmlFor="">Password</label>
            <input onChange={(event) => setUserData({ ...userData, password: event.target.value })}
                type="password" name="password" placeholder="Enter user password" autoComplete='new-password' />

            <button onClick={handleLogin} className="submit" >Login</button>
            <Link className='link' to="/signup" >Sign up</Link>

        </div>

    )
}
