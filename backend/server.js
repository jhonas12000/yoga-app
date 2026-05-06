const express = require("express");
const mongoose = require("mongoose");
const instructorRoutes = require("./routes/instructorRoutes");
const customerRoutes = require("./routes/customerRoutes");
const classRoutes = require("./routes/classRoutes");
const cors = require("cors");
const path = require("path");
const attendanceRoutes = require("./routes/attendanceRoutes");
const saleRoutes = require("./routes/saleRoutes");
const reportRoutes = require("./routes/reportRoutes");

const app = express();

app.use(cors({
  origin: "http://localhost:5173"
}));

app.use(express.json());

app.use("/api/instructors", instructorRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/classes", classRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/sales", saleRoutes);
app.use("/api/reports", reportRoutes);

console.log("Starting server...");

// MongoDB connection
const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/yoga_app";

mongoose.connect(uri)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));



if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "..", "frontend", "dist");

  app.use(express.static(frontendPath));

  app.use((req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});
}

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});