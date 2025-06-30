import express from "express";
import { todos } from "../db.js";
import { authenticateToken } from "../middleware/auth.js";
import { authorizeAdmin } from "../middleware/authorizeAdmin.js";

const router = express.Router();
router.use(authenticateToken);

// Get current user's todos
router.get("/todos", (req, res) => {
  const userTodos = todos.filter((todo) => todo.userId === req.user.id);
  res.json(userTodos);
});

// Create todo
router.post("/todos", (req, res) => {
  const todo = {
    id: Date.now(),
    task: req.body.task,
    userId: req.user.id,
  };
  todos.push(todo);
  res.status(201).json(todo);
});

// Delete todo (only if user owns it)
router.delete("/todos/:id", (req, res) => {
  const index = todos.findIndex(
    (todo) => todo.id == req.params.id && todo.userId === req.user.id
  );

  if (index === -1) {
    return res.status(403).json({ message: "Not allowed or not found" });
  }

  todos.splice(index, 1);
  res.json({ message: "Todo deleted" });
});

// (Bonus) Admin: Get all todos
router.get("/admin/all-todos", authorizeAdmin, (req, res) => {
  res.json(todos);
});

export default router;
