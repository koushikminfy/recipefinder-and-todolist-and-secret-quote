import express from "express";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/secret-quote", authenticateToken, (req, res) => {
  res.json({
    quote: "The secret to getting ahead is getting started.",
    user: req.user.username,
  });
});

export default router;
