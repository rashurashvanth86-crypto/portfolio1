console.log("🚀 App starting...");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ Database Connected"))
.catch(err => console.log("❌ DB Error:", err));

// ✅ Schema
const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String
});

// ✅ Model
const Message = mongoose.model("Message", messageSchema);

// ✅ API Route (save message)
app.post("/contact", async (req, res) => {
  try {
    const newMessage = new Message(req.body);
    await newMessage.save();

    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
});

// ✅ (Optional) View messages in browser
app.get("/messages", async (req, res) => {
  const messages = await Message.find();
  res.json(messages);
});

// ✅ Serve frontend
app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// ✅ Port (IMPORTANT for Render)
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});