import express from "express";
import { client } from "../index";

const router = express.Router();

router.post("/users", async (req, res) => {
  try {
    const { username, name, email, password } = req.body;

    await client.query(
      "INSERT INTO users (username, name, email, password) VALUES ($1, $2, $3, $4)",
      [username, name, email, password]
    );

    res.status(201).send("User created successfully");
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/users", async (req, res) => {
  const { email } = req.query;
  try {
    const { rows } = await client.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    console.log("Get user info", rows);
    res.send(rows);
  } catch (error) {
    console.error("Error fetching user", error);
    res.status(500).json({ error });
  }
});

export default router;
