import express from "express";
import authRoutes from "./routes/auth.js";
import quoteRoutes from "./routes/quote.js";

const app = express();
app.use(express.json()); // to parse JSON body

app.use("/", authRoutes);
app.use("/api", quoteRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
