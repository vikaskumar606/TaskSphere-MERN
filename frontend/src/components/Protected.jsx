import { Navigate } from "react-router-dom"

 export default function Protected({children}){
    if(!localStorage.getItem('login')){
        return <Navigate to="/login"  replace />
    }
    return children
}




// app.jsx-import './style/app.css'
// import NavBar from "./components/NavBar.jsx";
// import { Routes, Route } from "react-router-dom"
// import AddTask from './components/AddTask'
// import List from './components/List.jsx';
// import UpdateTask from './components/UpdateTask.jsx';
// import SignUp from './components/SignUp.jsx';
// import Login from './components/Login.jsx';
// import Protected from './components/Protected.jsx';
// function App() {

//   return (
//     <>

//       <NavBar />
//       <Routes>

//         <Route path="/" element={<Protected><List/></Protected>} />
//         <Route path="/add" element={<Protected><AddTask/></Protected>} />
//         <Route path="/signup" element={<SignUp />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/update/:id" element={<UpdateTask/>} />
//       </Routes>

//     </>
//   )
// }

// export default App
// main.jsx-import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './style/index.css'
// import App from './App.jsx'
// import { BrowserRouter } from "react-router-dom";

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <BrowserRouter>
//     <App />
//     </BrowserRouter>

//   </StrictMode>,
// )


// aaddtsk.jsx-import { useState } from 'react'
// import '../style/addtask.css'
// import { useNavigate } from "react-router-dom" 

// export default function  AddTask(){
//     const [taskData,setTaskData]=useState()
//     const navigate = useNavigate()

//     
//     const handleAddTask = async ()=>{
//         console.log(taskData);
//         let result = await fetch('https://tasksphere-backend-kpyz.onrender.com/add-task',{
//             method:'Post',
//             body:JSON.stringify(taskData),
//             credentials:'include',
//             headers:{
//                 'Content-Type':'Application/Json'
//             }
//         })
//         result = await result.json()
//         if(result.success){
//             navigate("/")
//             console.log("new task added");            
//         }else{
//             alert("try after sometime")
//         }
//         
//     }
//     return(
//         <div className="container" >
//             <h1>Add New Task </h1>
//             
//                 <label htmlFor="">Titel</label>
//                 <input onChange={(event)=>setTaskData({...taskData,title:event.target.value})} type="text" name="title"  placeholder="Enter task title" />
//                 <label htmlFor="">Description</label>
//                 <textarea onChange={(event)=>setTaskData({...taskData,description:event.target.value})} rows={4} name="description" placeholder="Enter task description" id=""></textarea>
//                 <button onClick={handleAddTask} className="submit" >Add New Task</button>
//            
//         </div>

//     )
// }
// list.jsx-import { Fragment, useEffect, useState } from "react"
// import '../style/list.css'
// import { Link } from "react-router-dom"

// export default function List() {

//     const [taskData, setTaskData] = useState()
//     const [selectedTask, setSeletedTask] = useState([])


//     useEffect(() => {
//         getListData()
//     }, [])
//     const getListData = async () => {
//         let list = await fetch('https://tasksphere-backend-kpyz.onrender.com/tasks', {
//             credentials: 'include'
//         })
//         list = await list.json()
//         console.log(list)
//         if (list.success) {
//             setTaskData(list.result)
//         } else {
//             alert("Try after somtime")
//         }
//     }

//     const deleteTask = async (id) => {
//         let item = await fetch('https://tasksphere-backend-kpyz.onrender.com/delete/' + id, { method: 'delete', credentials: 'include' })
//         item = await item.json()
//         console.log(item)
//         if (item.success) {
//             getListData()
//             console.log("Item  delete");
//         } else {
//             alert("Try after somtime")
//         }
//     }

//     const selectAll = (event) => {
//         console.log(event.target.checked)
//         if (event.target.checked) {
//             let items = taskData.map((item) => item._id)
//             setSeletedTask(items)
//         } else {
//             setSeletedTask([])

//         }
//     }

//     const selectSingleItem = (id) => {
//         console.log(id);
//         if (selectedTask.includes(id)) {
//             let items = selectedTask.filter((item) => item !== id);
//             setSeletedTask(items);
//         } else {
//             setSeletedTask([...selectedTask, id]);
//         }
//     }

//     const deleteMultiple = async () => {
//         console.log(selectedTask);
//         let item = await fetch('https://tasksphere-backend-kpyz.onrender.com/delete-multiple/',
//             {
//                 credentials: 'include',
//                 method: 'delete',
//                 body: JSON.stringify(selectedTask),
//                 headers: {
//                     'Content-Type': 'Application/json'
//                 }
//             })
//         item = await item.json()
//         console.log(item)
//         if (item.success) {
//             getListData()
//             console.log("Item  dlete");
//         } else {
//             alert("Try after somtime")
//         }

//     }

//     return (
//         <div className="list-container" >
//             <h1>Task Dashboard</h1>
//             <button onClick={deleteMultiple} className="delete-item delete-multiple" >Delete</button>

//             <ul className="task-list">
//                 <li className="list-header" ><input onChange={selectAll} type="checkbox" /></li>
//                 <li className="list-header" >S.No.</li>
//                 <li className="list-header" >Title</li>
//                 <li className="list-header" >Description</li>
//                 <li className="list-header" >Action</li>

//                 {
//                     taskData && taskData.map((item, index) => (
//                         <Fragment key={item._id}>
//                             <li className="list-item" ><input onChange={() => selectSingleItem(item._id)} checked={selectedTask.includes(item._id)} type="checkbox" /></li>
//                             <li className="list-item" >{index + 1}</li>
//                             <li className="list-item" >{item.title}</li>
//                             <li className="list-item" >{item.description}</li>
//                             <li className="list-item" ><button onClick={() => deleteTask(item._id)} className="delete-item" >Delete</button>
//                                 <Link to={"/update/" + item._id} className="update-item"  >Update</Link></li>
//                         </Fragment>
//                     ))
//                 }
//             </ul>
//         </div>
//     )
// }login.jsx-import { useEffect, useState } from 'react'
// import '../style/addtask.css'
// import '../style/App.css'
// import { Link, useNavigate } from 'react-router-dom'

// export default function Login() {

//     const [userData, setUserData] = useState()
//     const navigate = useNavigate()

//     useEffect(() => {
//         if (localStorage.getItem('login')) {
//             navigate('/');
//         }
//     }, [navigate]);

//     const handleLogin = async () => {
//         console.log(userData);
//         let result = await fetch('https://tasksphere-backend-kpyz.onrender.com/login', {
//             method: 'Post',
//             body: JSON.stringify(userData),
//             headers: {
//                 'Content-Type': 'Application/Json'
//             }
//         })
//         result = await result.json()
//         if (result.success) {
//             document.cookie = "token=" + result.token + "; path=/;";            
//             localStorage.setItem('login', userData.email);
//             navigate('/')

//         } else {
//             alert("Try after sometime")
//         }
//     }


//     return (
//         <div className="container" >
//             <h1>Login</h1>



//             <label htmlFor="">Email</label>
//             <input onChange={(event) => setUserData({ ...userData, email: event.target.value })}
//                 type="text" name="email" placeholder="Enter user email" autoComplete='off' />

//             <label htmlFor="">Password</label>
//             <input onChange={(event) => setUserData({ ...userData, password: event.target.value })}
//                 type="password" name="password" placeholder="Enter user password" autoComplete='new-password' />

//             <button onClick={handleLogin} className="submit" >Login</button>
//             <Link className='link' to="/signup" >Sign up</Link>

//         </div>

//     )
// }
// navbar.jsx-import { Link,  useNavigate, useLocation } from "react-router-dom";
// import '../style/navbar.css'
// import { useEffect, useState } from "react";


// function NavBar() {
//     const [login, setLogin] = useState(localStorage.getItem('login'))
//     const navigate = useNavigate() 
//     const location = useLocation();   

//     const logout = () => {
//         localStorage.removeItem('login')
//         setLogin(null)
//         setTimeout(() => {
//             navigate("/login")            
//         }, 0);
//     }   

//     useEffect(() => {
//         setLogin(localStorage.getItem('login'));
//     }, [location]);

//     return (
//         <nav className='navbar' >
//             <div className='logo' >TaskSphere-MERN </div>
//             <ul className='nav-links' >
//                 {
//                     login ?
//                         <>
//                             <li> <Link to="/" >List </Link> </li>
//                             <li> <Link to="/add" >Add Task </Link> </li>
//                             <li> <Link onClick={logout} >Logout</Link> </li>
//                         </> : null
//                 }
//             </ul>
//         </nav>
//     )
// }
// export default NavBar   
// protectes.jsx-import { Navigate } from "react-router-dom"

//  export default function Protected({children}){
//     if(!localStorage.getItem('login')){
//         return <Navigate to="/login"  replace />
//     }
//     return children
// } signup.jsx-import { useEffect, useState } from 'react'
// import '../style/addtask.css'
// import { Link, useNavigate } from 'react-router-dom'

// export default function  SignUp(){
//     
//     const [userData,setUserData] = useState()
//     const navigate = useNavigate()
//         useEffect(()=>{
//             if(localStorage.getItem('login')){
//                 navigate('/')
//             }
//         })
//     

//     const handleSignUp = async()=>{
//          console.log(userData);
//         let result = await fetch('https://tasksphere-backend-kpyz.onrender.com/signup',{
//             method:'Post',
//             body:JSON.stringify(userData),
//             headers:{
//                 'Content-Type':'Application/Json'
//             }
//         })
//         result = await result.json()
//         if(result.success){
//            console.log(result);
//            document.cookie="token="+result.token
//            localStorage.setItem('login',userData.email)
//            navigate('/')           
//         }else{
//             alert("Try after sometime")
//         }
//     }

//     return(
//         <div className="container">
//             <h1>Sign Up</h1>
//             
//                 <label htmlFor="">Name</label>
//                 <input onChange={(event)=>setUserData({...userData,name:event.target.value})} type="text" name="name"  placeholder="Enter user name" />
//                 
//                 <label htmlFor="">Email</label>
//                 <input onChange={(event)=>setUserData({...userData,email:event.target.value})} 
//                 type="text" name="email"  placeholder="Enter user email" />

//                 <label htmlFor="">Password</label>
//                 <input onChange={(event)=>setUserData({...userData,password:event.target.value})} 
//                 type="text" name="password"  placeholder="Enter user password" />

//                 <button onClick={handleSignUp}  className="submit" >Sign up</button>
//                 <Link className='link'  to="/login" >Login</Link>

//            
//         </div>

//     )
// }
// Updatetask.jsx-import { useEffect, useState } from 'react'
// import '../style/addtask.css'
// import { useNavigate, useParams } from "react-router-dom" 

// export default function  handleUpdateTask(){
//     const [taskData,setTaskData]=useState()
//     const navigate = useNavigate()
//     const {id} = useParams()    

//     useEffect(()=>{
//         getTask(id)
//     },[])
//          
//     const getTask =async(id)=>{        
//         let task = await fetch(`https://tasksphere-backend-kpyz.onrender.com/task/`+id,{
//             credentials: 'include'
//         })
//         task = await task.json()
//         if(task.result){
//             setTaskData(task.result)
//         }


//     }

//     const handleUpdateTask = async ()=>{
//         console.log("function called",taskData);
//         let task = await fetch("https://tasksphere-backend-kpyz.onrender.com/update-task",{
//             method:'put',
//             body:JSON.stringify(taskData),
//             headers:{
//                 'Content-Type':'Application/json'
//             },
//             credentials: 'include'
//         }) 
//         task = await task.json()
//         if(task){
//             navigate('/')
//         }
//     }

//     return(
//         <div className="container" >
//             <h1>Update Task </h1>            
//                 <label htmlFor="">Titel</label>
//                 <input value={taskData?.title} onChange={(event)=>setTaskData({...taskData,title:event.target.value})} type="text" name="title"  placeholder="Enter task title" />

//                 <label htmlFor="">Description</label>
//                 <textarea value={taskData?.description} onChange={(event)=>setTaskData({...taskData,description:event.target.value})} rows={4} name="description" placeholder="Enter task description" id=""></textarea>

//                 <button onClick={handleUpdateTask}  className="submit" >Update Task</button>
//            
//         </div>

//     )
// }
//     .gitignore >-# Logs
// logs
// *.log
// npm-debug.log*
// yarn-debug.log*
// yarn-error.log*
// pnpm-debug.log*
// lerna-debug.log*

// node_modules
// dist
// dist-ssr
// *.local

// # Editor directories and files
// .vscode/*
// !.vscode/extensions.json
// .idea
// .DS_Store
// *.suo
// *.ntvs*
// *.njsproj
// *.sln
// *.sw?
// bachend me index.js-import e from "express"
// import { connection, collectionName } from "./dbconfig.js";
// import cors from 'cors'
// import { ObjectId } from "mongodb";
// import jwt, { decode } from 'jsonwebtoken'
// import cookieParser from "cookie-parser"

// const app = e()

// app.use(e.json())
// app.use(cors({
//     origin: 'http://localhost:5173',
//     credentials: true
// }))
// app.use(cookieParser())

// app.post("/login", async (req, resp) => {
//     const userData = req.body
//     if (userData.email && userData.password) {
//         const db = await connection()
//         const collection = await db.collection('users')
//         const result = await collection.findOne({ email: userData.email, password: userData.password })
//         if (result) {
//             jwt.sign({ userId: result._id, email: result.email }, 'Google', { expiresIn: '5d' }, (error, token) => {
//                 resp.send({
//                     success: true,
//                     msg: 'login done',
//                     token
//                 })
//             })
//         } else {
//             resp.send({
//                 success: false,
//                 msg: 'user not found',
//             })
//         }

//     } else {
//         resp.send({
//             success: false,
//             msg: 'login not done',
//         })
//     }

// })


// app.post("/signup", async (req, resp) => {
//     const userData = req.body
//     if (userData.email && userData.password) {
//         const db = await connection()
//         const collection = await db.collection('users')
//         const result = await collection.insertOne(userData)
//         if (result) {
//            jwt.sign({ userId: result.insertedId, email: userData.email }, 'Google', { expiresIn: '5d' }, (error, token) => {
//                 resp.send({
//                     success: true,
//                     msg: 'signup done',
//                     token
//                 })
//             })
//         }

//     } else {
//         resp.send({
//             success: false,
//             msg: 'signup not done',
//         })
//     }

// })

// app.post("/add-task",verifyJWTToken, async (req, resp) => {
//     const db = await connection()
//     const collection = await db.collection(collectionName)
//     const taskData = { ...req.body, userId: req.userId }
//     const result = await collection.insertOne(taskData)
//     if (result) {
//         resp.send({ message: 'new  task  added', success: true, result })
//     } else {
//         resp.send({ message: 'task not added', success: false })
//     }
// })

// app.get("/tasks", verifyJWTToken, async (req, resp) => {
//     const db = await connection()
//     const collection = await db.collection(collectionName)
//     const result = await collection.find({ userId: req.userId }).toArray()
//     if (result) {
//         resp.send({ message: 'task list fetched', success: true, result })
//     } else {
//         resp.send({ message: 'error try after sometime ', success: false })
//     }
// })



// app.get("/task/:id",verifyJWTToken, async (req, resp) => {
//     const db = await connection()
//     const collection = await db.collection(collectionName)
//     const id = req.params.id
//     const result = await collection.findOne({ _id: new ObjectId(id) })
//     if (result) {
//         resp.send({ message: 'task fetched', success: true, result })
//     } else {
//         resp.send({ message: 'error try after sometime ', success: false })
//     }
// })


// app.put("/update-task",verifyJWTToken, async (req, resp) => {
//     const db = await connection()
//     const collection = await db.collection(collectionName)
//     const { _id, ...fields } = req.body
//     const update = { $set: fields }
//     console.log(fields);
//     console.log(req.body);
//     const result = await collection.updateOne({ _id: new ObjectId(_id) }, update)
//     if (result) {
//         resp.send({ message: 'task data updated', success: true, result })
//     } else {
//         resp.send({ message: 'error try after sometime ', success: false })
//     }
// })

// app.delete("/delete/:id",verifyJWTToken, async (req, resp) => {
//     const db = await connection()
//     const id = req.params.id
//     const collection = await db.collection(collectionName)
//     const result = await collection.deleteOne({ _id: new ObjectId(id) })
//     if (result) {
//         resp.send({ message: 'task deleted', success: true, result })
//     } else {
//         resp.send({ message: 'error try after sometime ', success: false })
//     }
// })

// app.delete("/delete-multiple",verifyJWTToken, async (req, resp) => {
//     const db = await connection()
//     const Ids = req.body
//     const deleteTaskIds = Ids.map((item) => new ObjectId(item))
//     console.log(Ids);

//     const collection = await db.collection(collectionName)
//     const result = await collection.deleteMany({ _id: { $in: deleteTaskIds } })
//     if (result) {
//         resp.send({ message: 'task deleted', success: result, })
//     } else {
//         resp.send({ message: 'error try after sometime ', success: false })
//     }
// })


// function verifyJWTToken(req, resp, next) {
//     const token = req.cookies['token']
//     jwt.verify(token, 'Google', (error, decoded) => {
//         if(error){
//             return resp.send({
//                 msg:"invalid token",
//                 success:false
//             })
//         }
//         req.userId = decoded.userId
//     next()
//     })

// }

// app.listen(3200)     