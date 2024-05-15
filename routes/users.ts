import express from "express";
import { client } from "../index";

const router = express.Router();

router.post("/users", async (req, res) => {
  try {
    const { username, name, email, password } = req.body;

    await client.query(
      "INSERT INTO users (user_id, username, name, email, password) VALUES ($1, $2, $3, $4, $5)",
      [username, name, email, password]
    );

    res.status(201).send("User created successfully");
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
