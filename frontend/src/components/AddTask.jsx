import React, { useState } from "react";
import '../style/addtask.css';
import '../style/App.css';
import API from "../api";
import { useNavigate } from "react-router-dom";

const AddTask = () => {
  const [taskData, setTaskData] = useState({ title: "", description: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    API.post("/add-task", taskData)
      .then((res) => {
        if (res.data.success) {
          setTaskData({ title: "", description: "" });
          navigate("/");
        } else {
          alert("Task not added");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <h1>Add New Task</h1>
      <form onSubmit={handleSubmit}>
        <label>Titel</label>
        <input
          type="text"
          name="title"
          placeholder="Enter task title"
          value={taskData.title}
          onChange={handleChange}
          required
        />
        
        <label>Description</label>
        <textarea
          name="description"
          placeholder="Enter task description"
          value={taskData.description}
          onChange={handleChange}
          rows={4}
        />
        
        <button type="submit" className="submit">Add New Task</button>
      </form>
    </div>
  );
};

export default AddTask;