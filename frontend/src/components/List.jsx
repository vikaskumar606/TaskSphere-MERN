import { Fragment, useEffect, useState } from "react"
import '../style/list.css'
import { Link } from "react-router-dom"
import API from "../api"

export default function List() {

    const [taskData, setTaskData] = useState([])
    const [selectedTask, setSeletedTask] = useState([])

    useEffect(() => {
        getListData()
    }, [])

    const getListData = async () => {
        try {
            const res = await API.get('/tasks')
            if (res.data.success) {
                setTaskData(res.data.result)
            } else {
                alert("Try after sometime")
            }
        } catch (err) {
            console.log(err)
        }
    }

    const deleteTask = async (id) => {
        try {
            const res = await API.delete('/delete/' + id)
            if (res.data.success) {
                getListData()
            } else {
                alert("Try after sometime")
            }
        } catch (err) {
            console.log(err)
        }
    }

    const selectAll = (event) => {
        if (event.target.checked) {
            let items = taskData.map((item) => item._id)
            setSeletedTask(items)
        } else {
            setSeletedTask([])
        }
    }

    const selectSingleItem = (id) => {
        if (selectedTask.includes(id)) {
            let items = selectedTask.filter((item) => item !== id);
            setSeletedTask(items);
        } else {
            setSeletedTask([...selectedTask, id]);
        }
    }

    const deleteMultiple = async () => {
        try {
            const res = await API.delete('/delete-multiple', { data: selectedTask })
            if (res.data.success) {
                getListData()
                setSeletedTask([])
            } else {
                alert("Try after sometime")
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="list-container">
            <h1>Task Dashboard</h1>
            <button onClick={deleteMultiple} className="delete-item delete-multiple">Delete</button>

            <ul className="task-list">
                <li className="list-header"><input onChange={selectAll} type="checkbox" /></li>
                <li className="list-header">S.No.</li>
                <li className="list-header">Title</li>
                <li className="list-header">Description</li>
                <li className="list-header">Action</li>

                {
                    taskData && taskData.map((item, index) => (
                        <Fragment key={item._id}>
                            <li className="list-item"><input onChange={() => selectSingleItem(item._id)} checked={selectedTask.includes(item._id)} type="checkbox" /></li>
                            <li className="list-item">{index + 1}</li>
                            <li className="list-item">{item.title}</li>
                            <li className="list-item">{item.description}</li>
                            <li className="list-item">
                                <button onClick={() => deleteTask(item._id)} className="delete-item">Delete</button>
                                <Link to={"/update/" + item._id} className="update-item">Update</Link>
                            </li>
                        </Fragment>
                    ))
                }
            </ul>
        </div>
    )
}