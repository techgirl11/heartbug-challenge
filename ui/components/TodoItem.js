import React from "react";
import { FaTrash } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";

function TodoItem({ task, editTask, deleteTask, toggleStatus }) {
  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={task.status}
        onChange={() => toggleStatus(task.id, !task.status)}
      />
      <p>{task.description}</p>
      <button className="icon-button" onClick={() => editTask(task.id)}>
        <AiFillEdit style={{ color: "#5e5e5e", fontSize: "16px" }} />
      </button>
      <button className="icon-button" onClick={() => deleteTask(task.id)}>
        <FaTrash style={{ color: "#5e5e5e", fontSize: "16px" }} />
      </button>
    </div>
  );
}
export default TodoItem;
