const express = require("express");
const mongoose = require("mongoose");
const instructorRoutes = require("./routes/instructorRoutes");
const customerRoutes = require("./routes/customerRoutes");
const cors = require("cors");


const app = express();

app.use(cors());

app.use(express.json());
app.use("/api/instructors", instructorRoutes);
app.use("/api/customers", customerRoutes);


console.log("Starting server...");

// Connect MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/yoga_app")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("Backend is running...");
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});

// keep alive fix
setInterval(() => {}, 1000);