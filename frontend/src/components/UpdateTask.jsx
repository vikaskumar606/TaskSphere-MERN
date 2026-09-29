import { useEffect, useState } from 'react'
import '../style/addtask.css'
import { useNavigate, useParams } from "react-router-dom"
import API from "../api"

export default function UpdateTask() {
    const [taskData, setTaskData] = useState({ title: '', description: '' })
    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        getTask(id)
    }, [id])

    const getTask = async (id) => {
        try {
            const res = await API.get(`/task/${id}`)
            if (res.data.result) {
                setTaskData(res.data.result)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const handleUpdateTask = async () => {
        try {
            const res = await API.put("/update-task", taskData)
            if (res.data.success) {
                navigate('/')
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="container">
            <h1>Update Task</h1>
            <label htmlFor="">Title</label>
            <input 
                value={taskData?.title || ''} 
                onChange={(event) => setTaskData({ ...taskData, title: event.target.value })} 
                type="text" 
                name="title" 
                placeholder="Enter task title" 
            />

            <label htmlFor="">Description</label>
            <textarea 
                value={taskData?.description || ''} 
                onChange={(event) => setTaskData({ ...taskData, description: event.target.value })} 
                rows={4} 
                name="description" 
                placeholder="Enter task description" 
            />

            <button onClick={handleUpdateTask} className="submit">Update Task</button>
        </div>
    )
}