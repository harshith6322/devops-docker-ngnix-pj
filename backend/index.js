import express from "express";
import "dotenv/config";
import cors from "cors";

const PORT = 3000;
const APPNUM = process.env.APPNUMENV || null;

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    server: "ok",
    num: APPNUM,
  });
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
