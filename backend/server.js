const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb+srv://jenithdatabase:200706@cluster1.s9lmhie.mongodb.net/portfolioDB")
.then(() => console.log("Database Connected"))
.catch((err) => console.log(err));


// Root route (to test server)
app.get("/", (req, res) => {
  res.send("Backend server is running");
});


// Schema
const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String
});

// Model
const Message = mongoose.model("Message", messageSchema);


// API to save message
app.post("/contact", async (req, res) => {
  try {

    const newMessage = new Message({
      name: req.body.name,
      email: req.body.email,
      message: req.body.message
    });

    await newMessage.save();

    res.json({ success: true, message: "Message saved successfully" });

  } catch (error) {
    res.status(500).json({ success: false, message: "Error saving message" });
  }
});


// API to get messages
app.get("/messages", async (req, res) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Error fetching messages" });
  }
});


// Server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});