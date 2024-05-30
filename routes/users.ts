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

router.put("/users:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { username, name, email, password } = req.body;

    const { rows: existingUser } = await client.query(
      "SELECT * FROM users WHERE id = $1",
      [id]
    );

    if (existingUser.length === 0) {
      return res.status(404).send("User not found");
    }

    await client.query(
      "UPDATE users SET username = $1, name = $2, email = $3, password = $4 WHERE id = $5",
      [username, name, email, password, id]
    );

    res.status(200).send("User updated successfully");
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { rows: existingUser } = await client.query(
      "SELECT * FROM users WHERE id = $1",
      [id]
    );

    if (existingUser.length === 0) {
      return res.status(404).send("Användare hittades inte");
    }

    await client.query("DELETE FROM saved_exercises WHERE user_id = $1", [id]);

    await client.query("DELETE FROM saved_scores WHERE user_id = $1", [id]);

    await client.query("DELETE FROM users WHERE id = $1", [id]);

    res.status(200).send("Användare borttagen framgångsrikt");
  } catch (error) {
    console.error("Fel vid borttagning av användare:", error);
    res.status(500).send("Internt serverfel");
  }
});

export default router;
