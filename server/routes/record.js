import express from "express";
import db from "../db/connection.js";

// This help convert the id from string to ObjectId for the _id.
import { ObjectId } from "mongodb";

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();
const collection = await db.collection("users");

// This section will help you get a list of all the records.
router.get("/", async (req, res) => {
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

router.post("/signup", async (req, res) => {
  try {
    let newDocument = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    };
    let result = await collection.insertOne(newDocument);

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding record");
  }
});

router.post("/signin", async (req, res) => {
  try {
    let query = { email: req.body.email, password: req.body.password };
    let result = await collection.findOne(query);

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error signing in");
  }
});

router.get("/profile/:id", async (req, res) => {
  try {
    let query = { _id: new ObjectId(req.params.id) };
    let result = await collection.findOne(query);

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error getting record");
  }
});

router.patch("/profile/:id", async (req, res) => {
  try {
    let query = { _id: new ObjectId(req.params.id) };
    let updates = {
      $set: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
        homePlace: req.body.homePlace,
        favPlace: req.body.favPlace,
      },
    };
    let result = await collection.updateOne(query, updates);

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating record");
  }
});

router.delete("/profile/:id", async (req, res) => {
  try {
    let query = { _id: new ObjectId(req.params.id) };
    let result = await collection.deleteOne(query);

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting record");
  }
});

export default router;
