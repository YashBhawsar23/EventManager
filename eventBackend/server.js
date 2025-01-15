const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const Guest = require("./models/Guest");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes

// Health Check
app.get("/", (req, res) => {
  res.send("Event Backend API is running.");
});

// Add a Guest
app.post("/add-guest", async (req, res) => {
  try {
    const { GuestID, Name } = req.body;
    const newGuest = new Guest({ GuestID, Name });
    await newGuest.save();
    res.status(201).send({ message: "Guest added successfully." });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Check-In a Guest
app.post("/check-in", async (req, res) => {
  try {
    const { GuestID } = req.body;
    const guest = await Guest.findOneAndUpdate(
      { GuestID },
      { ArrivalStatus: true, TimeOfArrival: new Date() },
      { new: true }
    );
    if (!guest) return res.status(404).send({ message: "Guest not found." });
    res.send({ message: "Check-in successful.", guest });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Fetch All Guests
app.get("/guests", async (req, res) => {
  try {
    const guests = await Guest.find();
    res.send(guests);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
