import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

import Loader from "./Loader";

import "./TaskManager.css";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/tasks`
      );
      setTasks(response.data.data);
    } catch (error) {
      toast.error("Internal server error!");
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingTask) {
        await axios.put(
          `${process.env.REACT_APP_BACKEND_URL}/tasks/${editingTask._id}`,
          newTask
        );
        setEditingTask(null);
      } else {
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/tasks`, newTask);
      }
      setNewTask({ title: "", description: "" });
      fetchTasks();
    } catch (error) {
      toast.error("Internal server error!");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      toast.error("Internal server error!");
    } finally {
      setLoading(false);
    }
  };

  const handleMarkComplete = async (id, status) => {
    setLoading(true);
    try {
      await axios.patch(
        `${process.env.REACT_APP_BACKEND_URL}/tasks/${id}/complete`,
        { completed: !status }
      );
      fetchTasks();
    } catch (error) {
      toast.error("Internal server error!");
    } finally {
      setLoading(false);
    }
  };

  const handleEditTask = (task) => {
    setNewTask({ title: task.title, description: task.description });
    setEditingTask(task);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="dashboard">
      <main className="main-content">
        <h1>Task Manager</h1>
        <header>
          <h2>{editingTask ? "Edit Task" : "Add Task"}</h2>
        </header>
        <form onSubmit={handleAddTask} className="task-form">
          <input
            type="text"
            placeholder="Task Title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            required
          />
          <textarea
            placeholder="Task Description"
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
            required
          ></textarea>
          <button type="submit">
            {editingTask ? "Update Task" : "Add Task"}
          </button>
        </form>
        <h2>Task List</h2>
        <table className="task-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task._id}>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.completed ? "Completed" : "Pending"}</td>
                <td className="button-container">
                  <button
                    onClick={() => handleMarkComplete(task._id, task.completed)}
                  >
                    {task.completed ? "Undo" : "Complete"}
                  </button>
                  <button onClick={() => handleEditTask(task)}>Edit</button>
                  <button onClick={() => handleDeleteTask(task._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
      {loading && <Loader />}
    </div>
  );
};

export default TaskManager;
