import express from "express";
import { client } from "../index";

const router = express.Router();

router.get("/score", async (req, res) => {
  try {
    const { score } = req.query;
    const { rows } = await client.query(`SELECT * FROM ${score}`);
    const randomIndex = Math.floor(Math.random() * rows.length);
    const randomAdvice = rows[randomIndex];
    console.log("Random workout advice:", randomAdvice);
    console.log("Get workout advice", rows);
    res.send(rows);
  } catch (error) {
    console.error("Error handling GET request", error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
