import express from "express";
import db from "../db/connection.js";

const router = express.Router();

router.post("/collections", async (req, res) => {
  try {
    const { collections } = req.body;
    let collection = await db.collection("facilities");
    let results = await collection
      .find({ name: { $in: collections } })
      .toArray();
    res.status(200).send(results);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error getting records");
  }
});

export default router;
