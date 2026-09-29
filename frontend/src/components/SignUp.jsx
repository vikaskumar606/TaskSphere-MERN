import { useEffect, useState } from 'react'
import '../style/addtask.css'
import { Link, useNavigate } from 'react-router-dom'
import API from '../api'

export default function SignUp() {

    const [userData, setUserData] = useState({ name: '', email: '', password: '' })
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/')
        }
    }, [navigate])

    const handleSignUp = async () => {
        try {
            const res = await API.post('/signup', userData)
            if (res.data.success) {
                localStorage.setItem('token', res.data.token)
                navigate('/')
            } else {
                alert("Try after sometime")
            }
        } catch (err) {
            alert("Signup failed")
        }
    }

    return (
        <div className="container">
            <h1>Sign Up</h1>

            <label htmlFor="">Name</label>
            <input onChange={(event) => setUserData({ ...userData, name: event.target.value })} type="text" name="name" placeholder="Enter user name" />

            <label htmlFor="">Email</label>
            <input onChange={(event) => setUserData({ ...userData, email: event.target.value })} type="text" name="email" placeholder="Enter user email" />

            <label htmlFor="">Password</label>
            <input onChange={(event) => setUserData({ ...userData, password: event.target.value })} type="password" name="password" placeholder="Enter user password" />

            <button onClick={handleSignUp} className="submit">Sign up</button>
            <Link className='link' to="/login">Login</Link>
        </div>
    )
}