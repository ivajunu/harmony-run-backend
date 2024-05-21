import express from "express";
import { client } from "../index";

const router = express.Router();

router.get("/myexercises", async (req, res) => {
  try {
    const user_id = req.query.user_id;

    if (!user_id) {
      return res.status(400).send("Missing user_id parameter");
    }

    const result = await client.query(
      `
      SELECT u.id AS user_id, u.username, u.email,
             JSON_BUILD_OBJECT(
               'id', se.savedexercise_json ->> 'id',
               'type', se.savedexercise_json ->> 'type',
               'duration', se.savedexercise_json ->> 'duration',
               'intensity', se.savedexercise_json ->> 'intensity',
               'instruction', se.savedexercise_json ->> 'instruction'
             ) AS savedexercise,
             ss.score
      FROM users u
      INNER JOIN saved_exercises se ON u.id = se.user_id
      INNER JOIN saved_scores ss ON u.id = ss.user_id
      WHERE u.id = $1
    `,
      [user_id]
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching exercises and scores:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
