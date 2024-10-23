import React, { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import { FaPlusCircle } from "react-icons/fa";
import { getTaskList, createTask, updateTask, removeTask } from "./../handler";

function TodoList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTaskList().then((resp) => {
      console.log(resp);
      setTasks(resp);
    });
  }, []);

  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  function addTask(text) {
    const newTask = {
      description: text,
    };
    createTask(newTask);

    setTasks([...tasks, newTask]);
    setDescription("");
  }

  function editTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }
  function deleteTask(id) {
    removeTask(id);
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function toggleStatus(id, status) {
    updateTask(id, { status: status });
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, status: !task.status };
        } else {
          return task;
        }
      })
    );
  }
  return (
    <div className="todo-list">
      <input
        className="todo-input"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button className="icon-button" onClick={() => addTask(description)}>
        <FaPlusCircle style={{ color: "#5e5e5e", fontSize: "16px" }} />
      </button>
      {tasks.map((task) => (
        <TodoItem
          key={task.id}
          task={task}
          editTask={editTask}
          deleteTask={deleteTask}
          toggleStatus={toggleStatus}
        />
      ))}
    </div>
  );
}
export default TodoList;
