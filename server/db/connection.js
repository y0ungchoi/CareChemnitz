import { MongoClient, ServerApiVersion } from "mongodb";

// Local db
const db_uri = "mongodb://localhost:27017";

// MongoDB Atlas
const uri = process.env.ATLAS_URI || "";

const client = new MongoClient(db_uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

try {
  await client.connect();
  await client.db("admin").command({ ping: 1 });
  console.log("Pinged your deployment. You successfully connected to MongoDB!");
} catch (err) {
  console.error(err);
}

let db = client.db("DBW");

export default db;
