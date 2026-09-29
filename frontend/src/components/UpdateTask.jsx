import { useEffect, useState } from 'react'
import '../style/addtask.css'
import { useNavigate, useParams } from "react-router-dom" 

export default function  UpdateTask(){
    const [taskData,setTaskData]=useState()
    const navigate = useNavigate()
    const {id} = useParams()    

    useEffect(()=>{
        getTask(id)
    },[])
         
    const getTask =async(id)=>{        
        let task = await fetch(`https://tasksphere-backend-kpyz.onrender.com/task/`+id,{
            credentials: 'include'
        })
        task = await task.json()
        if(task.result){
            setTaskData(task.result)
        }


    }

    const handleUpdateTask = async ()=>{
        console.log("function called",taskData);
        let task = await fetch("https://tasksphere-backend-kpyz.onrender.com/update-task",{
            method:'PUT',
            body:JSON.stringify(taskData),
            headers:{
                'Content-Type':'application/json'
            },
            credentials: 'include'
        }) 
        task = await task.json()
        if(task){
            navigate('/')
        }
    }

    return(
        <div className="container" >
            <h1>Update Task </h1>            
                <label htmlFor="">Titel</label>
                <input value={taskData?.title} onChange={(event)=>setTaskData({...taskData,title:event.target.value})} type="text" name="title"  placeholder="Enter task title" />

                <label htmlFor="">Description</label>
                <textarea value={taskData?.description} onChange={(event)=>setTaskData({...taskData,description:event.target.value})} rows={4} name="description" placeholder="Enter task description" id=""></textarea>

                <button onClick={handleUpdateTask}  className="submit" >Update Task</button>
           
        </div>

    )
}
