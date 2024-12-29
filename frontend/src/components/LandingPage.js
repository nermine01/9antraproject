import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

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
    <div>

<section
  className="relative h-[500px] bg-cover bg-center flex items-center justify-center"
  style={{ backgroundImage: 'url(/front.jpg)' }}
>
  {/* Overlay */}
  <div className="absolute inset-0 bg-black bg-opacity-50"></div>

  {/* Content */}
  <div className="relative text-center bg-white bg-opacity-90 px-4 py-10 rounded-lg shadow-lg max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-black leading-snug">
          Improve your skills on your own<br />
          To prepare for a better future
        </h1>
        <Link
          to="/register"
          className="bg-pink-500 text-white font-medium text-lg px-8 py-3 rounded-md hover:bg-pink-600 transition-all inline-block"
        >
          REGISTER NOW
        </Link>
      </div>
</section>

      {/* Courses Section */}
      <section className="py-12 px-6 bg-gray-50">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">Discover Our Courses</h2>
          <button className="bg-pink-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-pink-600">
            View More
          </button>
        </div>

        {loading ? (
          <p className="text-center">Loading courses...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div key={course._id} className="bg-white shadow-md rounded-md overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-2">{course.title}</h3>
                  <p className="text-pink-500 font-medium">{course.price}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Contact Section */}
      <section className="bg-orange-400 py-12 px-6 rounded-3xl mx-auto max-w-4xl shadow-lg">
  <div className="text-center mb-6">
    <h2 className="text-3xl font-bold text-black">Contact Us</h2>
  </div>
  <form className="space-y-6">
    <div>
      <label className="block text-sm font-bold mb-1 text-black">NAME</label>
      <input
        type="text"
        placeholder="Jiara Martins"
        className="w-full px-4 py-2 bg-orange-200 rounded-md placeholder:text-orange-700"
      />
    </div>
    <div>
      <label className="block text-sm font-bold mb-1 text-black">EMAIL</label>
      <input
        type="email"
        placeholder="hello@reallygreatsite.com"
        className="w-full px-4 py-2 bg-orange-200 rounded-md placeholder:text-orange-700"
      />
    </div>
    <div>
      <label className="block text-sm font-bold mb-1 text-black">MESSAGE</label>
      <textarea
        placeholder="Write your message here"
        rows="4"
        className="w-full px-4 py-2 bg-orange-200 rounded-md placeholder:text-orange-300"
      ></textarea>
    </div>
    <div className="text-center">
      <button
        type="submit"
        className="bg-pink-600 text-white px-6 py-2 rounded-md hover:bg-pink-700"
      >
        Send the message
      </button>
    </div>
  </form>
</section>
    </div>
  );
};

export default Home;
