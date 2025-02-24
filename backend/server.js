const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5001; // Change to a different port if needed

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
const mongoURI = "mongodb://127.0.0.1:27017/medicalDB"; // Use your correct MongoDB URI

mongoose
  .connect(mongoURI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err.message));

// Mongoose Schema
const medicalSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  condition: String,
  contact: String,
  address: String,
});

const MedicalRecord = mongoose.model("MedicalRecord", medicalSchema);

// API Endpoint for Form Submission
app.post("/api/medical-form", async (req, res) => {
  try {
    const newRecord = new MedicalRecord(req.body);
    await newRecord.save();
    res.status(201).json({ message: "Form submitted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error saving to database" });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

