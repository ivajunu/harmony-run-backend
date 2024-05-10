import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import { Client } from "pg";
import express from "express";

import score from "./routes/score";
import high from "./routes/high";
import medium from "./routes/medium";
import low from "./routes/low";
import tips from "./routes/tips";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, "dist")));
app.use(express.json());

export const client = new Client({
  connectionString: process.env.PGURI,
});

client.connect();

// routes
app.use(score);
app.use(high);
app.use(medium);
app.use(low);
app.use(tips);

// GET anrop test
app.get("/api", async (req, res) => {
  try {
    const { rows } = await client.query(`SELECT * FROM high`);
    console.log("High intensity workout routines:", rows);
    console.log(rows);
    res.send(rows);
  } catch (error) {
    console.error("Error handling GET request", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Redo på http://localhost:${port}/`);
});
