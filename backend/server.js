const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb+srv://jenithdatabase:<200706>@cluster1.s9lmhie.mongodb.net/")
.then(() => console.log("Database Connected"))
.catch((err) => console.log(err));


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
    res.json({ success: false, message: "Error saving message" });
  }
});


// API to get messages
app.get("/messages", async (req, res) => {

  const messages = await Message.find();

  res.json(messages);

});


// Server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});