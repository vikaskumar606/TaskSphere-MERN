import { Fragment, useEffect, useState } from "react"
import '../style/list.css'
import { Link } from "react-router-dom"

export default function List() {

    const [taskData, setTaskData] = useState()
    const [selectedTask, setSeletedTask] = useState([])


    useEffect(() => {
        getListData()
    }, [])
    const getListData = async () => {
        let list = await fetch('http://localhost:3200/tasks', {
            credentials: 'include'
        })
        list = await list.json()
        console.log(list)
        if (list.success) {
            setTaskData(list.result)
        } else {
            alert("Try after somtime")
        }
    }

    const deleteTask = async (id) => {
        let item = await fetch('http://localhost:3200/delete/' + id, { method: 'delete', credentials: 'include' })
        item = await item.json()
        console.log(item)
        if (item.success) {
            getListData()
            console.log("Item  delete");
        } else {
            alert("Try after somtime")
        }
    }

    const selectAll = (event) => {
        console.log(event.target.checked)
        if (event.target.checked) {
            let items = taskData.map((item) => item._id)
            setSeletedTask(items)
        } else {
            setSeletedTask([])

        }
    }

    const selectSingleItem = (id) => {
        console.log(id);
        if (selectedTask.includes(id)) {
            let items = selectedTask.filter((item) => item !== id);
            setSeletedTask(items);
        } else {
            setSeletedTask([...selectedTask, id]);
        }
    }

    const deleteMultiple = async () => {
        console.log(selectedTask);
        let item = await fetch('http://localhost:3200/delete-multiple/',
            {
                credentials: 'include',
                method: 'delete',
                body: JSON.stringify(selectedTask),
                headers: {
                    'Content-Type': 'Application/json'
                }
            })
        item = await item.json()
        console.log(item)
        if (item.success) {
            getListData()
            console.log("Item  dlete");
        } else {
            alert("Try after somtime")
        }

    }

    return (
        <div className="list-container" >
            <h1>Task Dashboard</h1>
            <button onClick={deleteMultiple} className="delete-item delete-multiple" >Delete</button>

            <ul className="task-list">
                <li className="list-header" ><input onChange={selectAll} type="checkbox" /></li>
                <li className="list-header" >S.No.</li>
                <li className="list-header" >Title</li>
                <li className="list-header" >Description</li>
                <li className="list-header" >Action</li>

                {
                    taskData && taskData.map((item, index) => (
                        <Fragment key={item._id}>
                            <li className="list-item" ><input onChange={() => selectSingleItem(item._id)} checked={selectedTask.includes(item._id)} type="checkbox" /></li>
                            <li className="list-item" >{index + 1}</li>
                            <li className="list-item" >{item.title}</li>
                            <li className="list-item" >{item.description}</li>
                            <li className="list-item" ><button onClick={() => deleteTask(item._id)} className="delete-item" >Delete</button>
                                <Link to={"/update/" + item._id} className="update-item"  >Update</Link></li>
                        </Fragment>
                    ))
                }
            </ul>
        </div>
    )
}