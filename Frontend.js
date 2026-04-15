Frontend.js
frontend/package.json
{
  "name": "frontend",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "axios": "^1.6.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1"
  },
  "scripts": {
    "start": "react-scripts start"
  }
}

frontend/src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

frontend/src/App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:5000/api/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/tasks", { title });
    setTitle("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`);
    fetchTasks();
  };

  return (
    <div className="container">
      <h1>Task Manager</h1>

      <form onSubmit={addTask}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task"
        />
        <button>Add</button>
      </form>

      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.title}
            <button onClick={() => deleteTask(task._id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

frontend/src/App.css
body {
  font-family: Arial;
  background: #f5f5f5;
}

.container {
  width: 400px;
  margin: auto;
  text-align: center;
}

input {
  padding: 10px;
  margin: 10px;
}

button {
  padding: 8px;
  margin-left: 5px;
  background: blue;
  color: white;
  border: none;
}