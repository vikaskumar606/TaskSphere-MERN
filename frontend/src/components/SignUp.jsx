import { useEffect, useState } from 'react'
import '../style/addtask.css'
import { Link, useNavigate } from 'react-router-dom'

export default function  SignUp(){
    
    const [userData,setUserData] = useState()
    const navigate = useNavigate()
        useEffect(()=>{
            if(localStorage.getItem('login')){
                navigate('/')
            }
        })
    

    const handleSignUp = async()=>{
         console.log(userData);
        let result = await fetch('https://tasksphere-backend-kpyz.onrender.com/signup',{
            method:'Post',
            body:JSON.stringify(userData),
            headers:{
                'Content-Type':'Application/Json'
            }
        })
        result = await result.json()
        if(result.success){
           console.log(result);
           document.cookie="token="+result.token
           localStorage.setItem('login',userData.email)
           navigate('/')           
        }else{
            alert("Try after sometime")
        }
    }

    return(
        <div className="container">
            <h1>Sign Up</h1>
            
                <label htmlFor="">Name</label>
                <input onChange={(event)=>setUserData({...userData,name:event.target.value})} type="text" name="name"  placeholder="Enter user name" />
                
                <label htmlFor="">Email</label>
                <input onChange={(event)=>setUserData({...userData,email:event.target.value})} 
                type="text" name="email"  placeholder="Enter user email" />

                <label htmlFor="">Password</label>
                <input onChange={(event)=>setUserData({...userData,password:event.target.value})} 
                type="text" name="password"  placeholder="Enter user password" />

                <button onClick={handleSignUp}  className="submit" >Sign up</button>
                <Link className='link'  to="/login" >Login</Link>

           
        </div>

    )
}
