import express from "express";
import cors from "cors";
import records from "./routes/record.js";
import maps from "./routes/map.js";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1/auth", records);
app.use("/api/v1/map", maps);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
