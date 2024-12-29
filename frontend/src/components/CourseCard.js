import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CardForm = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch courses from the backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/courses');
        setCourses(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-6">Available Courses</h2>

      {loading ? (
        <p className="text-center">Loading courses...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course._id} className="bg-white border rounded-lg p-4 shadow-md">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3 className="text-lg font-bold mb-2">{course.title}</h3>
              <p className="text-gray-700 mb-2">{course.price}</p>
              <button className="w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600">
                Enroll Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CardForm;
