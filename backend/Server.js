const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const courseRoutes = require("./routes/courseRoutes");
const authRoutes = require("./routes/authRoutes"); // Add authentication routes

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads")); // Serve uploaded files

// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/coursesDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Connection error", err));

// Routes
app.use("/api/courses", courseRoutes); // Courses CRUD routes
app.use("/api/auth", authRoutes); // Authentication routes (register/login)

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
