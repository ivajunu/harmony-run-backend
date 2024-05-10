import express from "express";
import { client } from "../index";

const router = express.Router();

router.get("/low", async (req, res) => {
  try {
    const { rows } = await client.query(`SELECT * FROM low;`);
    console.log("Low intensity workout routines:", rows);
    res.send(rows);
  } catch (error) {
    console.error("Error handling GET request", error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
