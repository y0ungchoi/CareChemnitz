import express from "express";
import db from "../db/connection.js";

const router = express.Router();

router.get("/maps/:featureCollectionName", async (req, res) => {
  try {
    let collection = await db.collection("facilities");
    let featureCollectionName = req.params.featureCollectionName;
    let results = await collection
      .find({ name: featureCollectionName })
      .toArray();
    if (results) {
      res.send(results).status(200);
    } else {
      res.send("Not found").status(404);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error getting record");
  }
});

export default router;
