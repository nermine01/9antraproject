const express = require("express");
const multer = require("multer");
const Course = require("../Models/Course");
const { verifyAdmin } = require("../middleware/authMiddleware");  // Import middleware

const router = express.Router();

// File Upload Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// CRUD Operations

// Get All Courses (Accessible to all users, no authentication required)
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a New Course (Only Admin)
router.post("/", verifyAdmin, upload.single("image"), async (req, res) => {
  try {
    const { title, price } = req.body;
    const course = new Course({
      title,
      price,
      image: `http://localhost:5000/uploads/${req.file.filename}`,
    });
    await course.save();
    res.status(201).json(course);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a Course (Only Admin)
router.put("/:id", verifyAdmin, upload.single("image"), async (req, res) => {
  try {
    const { title, price } = req.body;
    const updateData = { title, price };
    if (req.file) {
      updateData.image = `http://localhost:5000/uploads/${req.file.filename}`;
    }
    const course = await Course.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.status(200).json(course);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a Course (Only Admin)
router.delete("/:id", verifyAdmin, async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
