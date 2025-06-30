import express from "express";
import authRoutes from "./routes/auth.js";
import todosRoutes from "./routes/todos.js";

const app = express();
app.use(express.json());

app.use("/", authRoutes);
app.use("/api", todosRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
