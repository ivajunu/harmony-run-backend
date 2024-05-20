import express from "express";
import { client } from "../index";

const router = express.Router();

router.post("/saved_scores", async (req, res) => {
  try {
    const { user_id, score } = req.body;

    await client.query(
      "INSERT INTO saved_scores (score, user_id) VALUES ($1, $2)",
      [score, user_id]
    );

    res.status(201).send("Score saved correctly");
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
