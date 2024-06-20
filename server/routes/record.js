import express from "express";
import db from "../db/connection.js";

import { ObjectId } from "mongodb";

const router = express.Router();
const collection = await db.collection("users");

router.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await collection.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Email is already registered" });
    }

    let newDocument = { firstName, lastName, email, password };
    let result = await collection.insertOne(newDocument);

    if (!result) {
      return res.status(404).json({ error: "Failed to create new user" });
    }

    res.status(200).json({ message: "Successful registration" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error adding record" });
  }
});

router.post("/signin", async (req, res) => {
  try {
    let query = { email: req.body.email, password: req.body.password };
    let result = await collection.findOne(query);

    if (!result) res.status(404).json({ error: "Not found the user" });
    else {
      res.send(result).status(200);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error signing in" });
  }
});

router.get("/profile/:id", async (req, res) => {
  try {
    let query = { _id: new ObjectId(req.params.id) };
    let result = await collection.findOne(query);

    if (!result) res.status(404).json({ error: "Not found the user" });
    else res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error getting record" });
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
        homeLocation: req.body.homeLocation,
        favLocation: req.body.favLocation,
      },
    };
    let result = await collection.updateOne(query, updates);

    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error updating record" });
  }
});

router.delete("/profile/:id", async (req, res) => {
  try {
    let query = { _id: new ObjectId(req.params.id) };
    let result = await collection.deleteOne(query);

    if (!result) res.status(404).json({ error: "Not found the user" });
    else res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error deleting record" });
  }
});

export default router;
