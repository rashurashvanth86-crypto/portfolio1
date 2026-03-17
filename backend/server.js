console.log("🚀 App starting...");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/contact", (req, res) => {
  console.log(req.body);
  res.json({ success: true });
});

app.listen(10000, () => {
  console.log("🔥 Server running on port 10000");
});