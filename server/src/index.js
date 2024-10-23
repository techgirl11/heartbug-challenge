const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const server = express();
const port = 8080;

const corsOptions = {
  origin: "http://localhost:3000", // Allow this origin
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};

server.use(cors(corsOptions));
server.use(bodyParser.json());

server.get("/", (req, res) => {
  res.send("Welcome to todo app REST API");
});

const connection = mysql.createConnection({
  host: "32c97cc37c63",
  user: "root",
  password: "heartbug",
  database: "heartbug",
});

server.get("/tasks", (req, res) => {
  const query = "select id, description, status from tasks";
  connection.query(query, (err, rows) => {
    if (err) throw err;

    res.json(rows);
  });
});

server.post("/task", (req, res) => {
  const description = req.body.description;

  const query = "INSERT INTO tasks (description) VALUES (?)";

  connection.query(query, [description], (err, result) => {
    if (err) throw err;

    res
      .status(201)
      .json({ message: "Task added successfully", taskId: result.insertId });
  });
});

server.patch("/task/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const { description, status } = req.body;

  const updates = [];
  const values = [];

  if (description) {
    updates.push("description = ?");
    values.push(description);
  }

  if (status) {
    updates.push("status = ?");
    values.push(status);
  }

  if (updates.length === 0) {
    return res.status(400).json({ message: "No fields to update" });
  }

  values.push(taskId);

  const query = `UPDATE tasks SET ${updates.join(", ")} WHERE id = ?`;
  connection.query(query, values, (err, result) => {
    if (err) throw err;

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task updated successfully" });
  });
});

server.delete("/task/:id", (req, res) => {
  const taskId = parseInt(req.params.id);

  const query = "DELETE FROM tasks WHERE id = ?";

  connection.query(query, [taskId], (err, result) => {
    if (err) throw err;

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  });
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
