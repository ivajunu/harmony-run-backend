import express from "express";
import { client } from "../index";

const router = express.Router();

router.get("/homepage", async (req, res) => {
  try {
    const { rows } = await client.query(`SELECT * FROM homepage;`);
    console.log("Homepage descriptions:", rows);
    res.send(rows);
  } catch (error) {
    console.error("Error handling GET request", error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
