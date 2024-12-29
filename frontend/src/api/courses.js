import axios from 'axios';

const API_URL = "http://localhost:5000/api/courses";

// Get all courses
export const getCourses = async () => axios.get(API_URL);

// Create a new course
export const createCourse = async (formData, token) =>
  axios.post(API_URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,  // Send token with the request
    },
  });

// Update a course
export const updateCourse = async (id, formData, token) =>
  axios.put(`${API_URL}/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,  // Send token with the request
    },
  });

// Delete a course
export const deleteCourse = async (id, token) =>
  axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },  // Send token with the request
  });
