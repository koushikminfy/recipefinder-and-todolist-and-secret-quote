import express from "express";
import jwt from "jsonwebtoken";
import { users } from "../db.js";

const router = express.Router();
const SECRET = "your_secret_key"; // use env for real apps

// Register a user (no hashing in this easy version)
router.post("/register", (req, res) => {
  const { username, password } = req.body;

  const exists = users.find((user) => user.username === username);
  if (exists) return res.status(400).json({ message: "User already exists" });

  const newUser = {
    id: Date.now(),
    username,
    password,
  };

  users.push(newUser);
  res.status(201).json({ message: "User registered successfully" });
});

// Login and issue JWT
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { id: user.id, username: user.username },
    SECRET,
    { expiresIn: "1h" }
  );

  res.json({ accessToken: token });
});

export default router;
