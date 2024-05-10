import express from "express";
import { client } from "../index";

const router = express.Router();

router.get("/high", async (req, res) => {
  try {
    const { rows } = await client.query(`SELECT * FROM high;`);
    console.log("High intensity workout routines:", rows);
    res.send(rows);
  } catch (error) {
    console.error("Error handling GET request", error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
