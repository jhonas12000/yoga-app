const express = require("express");
const mongoose = require("mongoose");
const instructorRoutes = require("./routes/instructorRoutes");
const customerRoutes = require("./routes/customerRoutes");
const cors = require("cors");
const classRoutes = require("./routes/classRoutes");
//const path = require("path");

const app = express();

//app.use(cors());
app.use(cors({
  origin: "http://localhost:5173"
}));
app.use(express.json());

app.use("/api/instructors", instructorRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/classes", classRoutes);

console.log("Starting server...");

// MongoDB connection
const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/yoga_app";

mongoose.connect(uri)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

//  DEFINE THIS
//const frontendPath = path.join(__dirname, "..", "frontend", "dist");

// Serve frontend
//app.use(express.static(frontendPath));

//  fallback route
// app.use((req, res) => {
//   res.sendFile(path.join(frontendPath, "index.html"));
// });

app.get("/", (req, res) => {
  res.send("Backend is running...");
});


const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});