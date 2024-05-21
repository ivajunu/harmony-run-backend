import express from "express";
import { client } from "../index";

const router = express.Router();

router.post("/saved_exercises", async (req, res) => {
  try {
    const { user_id, savedexercise } = req.body;

    const savedexerciseString = JSON.stringify(savedexercise);

    await client.query(
      "INSERT INTO saved_exercises (user_id, savedexercise) VALUES ($1, $2)",
      [user_id, savedexerciseString]
    );

    res.status(201).send("Exercise saved correctly");
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
