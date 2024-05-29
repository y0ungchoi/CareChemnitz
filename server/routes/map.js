import express from "express";
import db from "../db/connection.js";

const router = express.Router();

router.get("/:featureCollectionName", async (req, res) => {
  try {
    let featureCollectionName = req.params.featureCollectionName;
    let collection = await db.collection("facilities");
    let results = await collection
      .find({ name: featureCollectionName })
      .toArray();
    if (results.length > 0) {
      res.status(200).send(results);
    } else {
      res.status(404).send("Not found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error getting records");
  }
});

export default router;
