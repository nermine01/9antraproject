const mongoose = require("mongoose");

// Define the Course Schema
const courseSchema = new mongoose.Schema({
    title: { type: String, required: true }, // Course title
    price: { type: String, required: true }, // Course price
    image: { type: String, required: true }, // Image URL
});

// Create and export the Course model
const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
