import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { users } from "../db.js";

const router = express.Router();
const SECRET = "super_secret_key"; // use .env in real projects

// Register
router.post("/register", async (req, res) => {
  const { username, password, role = "user" } = req.body;

  if (users.find((u) => u.username === username)) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = {
    id: Date.now(),
    username,
    password: hashedPassword,
    role,
  };

  users.push(user);
  res.status(201).json({ message: "Registered successfully" });
});

// Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username);
  if (!user) return res.status(401).json({ message: "User not found" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(403).json({ message: "Incorrect password" });

  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    SECRET,
    { expiresIn: "1h" }
  );

  res.json({ accessToken: token });
});

export default router;
