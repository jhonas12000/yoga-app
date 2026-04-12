const express = require("express");
const mongoose = require("mongoose");
const instructorRoutes = require("./routes/instructorRoutes");
const customerRoutes = require("./routes/customerRoutes");
const cors = require("cors");
import path from "path";


const app = express();

app.use(cors());

app.use(express.json());
app.use("/api/instructors", instructorRoutes);
app.use("/api/customers", customerRoutes);


console.log("Starting server...");

// Connect MongoDB
const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/yoga_app";

mongoose.connect(uri)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("Backend is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const __dirname = new URL('.', import.meta.url).pathname;

// Serve frontend
app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});