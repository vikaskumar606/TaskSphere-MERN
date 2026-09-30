import { useEffect, useState } from 'react'
import '../style/addtask.css'
import '../style/App.css'
import { Link, useNavigate } from 'react-router-dom'
import API from '../api'

export default function Login() {

    const [userData, setUserData] = useState({ email: '', password: '' })
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/')
        }
    }, [navigate])

    const handleLogin = async (e) => {
        e.preventDefault()
        setErrorMessage('')
        try {
            const res = await API.post("/login", { 
                email: userData.email, 
                password: userData.password 
            })
            
            if (res.data.success) {
                localStorage.setItem("token", res.data.token)
                navigate('/')
            } else {
                setErrorMessage(res.data.msg || "User not found")
            }
        } catch (err) {
            setErrorMessage("User not found")
        }
    }

    return (
        <div className="container">
            <h1>Login</h1>

            <label htmlFor="">Email</label>
            <input 
                onChange={(event) => {
                    setUserData({ ...userData, email: event.target.value })
                    setErrorMessage('')
                }}
                type="text" 
                name="email" 
                placeholder="Enter user email" 
                autoComplete='off' 
            />

            <label htmlFor="">Password</label>
            <input 
                onChange={(event) => {
                    setUserData({ ...userData, password: event.target.value })
                    setErrorMessage('')
                }}
                type="password" 
                name="password" 
                placeholder="Enter user password" 
                autoComplete='new-password' 
            />

            {errorMessage && (
                <div className="error-msg">
                    {errorMessage}
                </div>
            )}

            <button onClick={handleLogin} className="submit">Login</button>
            <Link className='link' to="/signup">Sign up</Link>
        </div>
    )
}