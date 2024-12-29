import React, { useEffect, useState } from "react";
import { getCourses, createCourse, updateCourse, deleteCourse } from "../api/courses";

const AdminPanel = ({ role, token }) => {
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({ title: "", price: "", image: null });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = () => {
    getCourses()
      .then((res) => setCourses(res.data))
      .catch(console.error);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("price", formData.price);
    if (formData.image) data.append("image", formData.image);

    const action = editId
      ? updateCourse(editId, data, token)
      : createCourse(data, token);

    action
      .then(() => {
        loadCourses();
        setFormData({ title: "", price: "", image: null });
        setEditId(null);
      })
      .catch(console.error);
  };

  const handleDelete = (id) => {
    deleteCourse(id, token).then(loadCourses).catch(console.error);
  };

  const handleEdit = (course) => {
    setEditId(course._id);
    setFormData({ title: course.title, price: course.price, image: null });
  };

  if (role !== "admin") {
    return <h2 className="text-center text-2xl font-bold text-red-500 mt-10">Access Denied. Admins Only.</h2>;
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Admin Panel Title */}
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Panel</h1>

      {/* Course Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8 max-w-3xl mx-auto">
        <h2 className="text-xl font-bold mb-4">{editId ? "Edit Course" : "Add Course"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Course Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Price (e.g., 350 DT/Month)"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            required
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="file"
            onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
            className="w-full px-4 py-2 border rounded-md"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            {editId ? "Update Course" : "Add Course"}
          </button>
        </form>
      </div>

      {/* Courses Table */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Manage Courses</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-4 py-2 border">Image</th>
                <th className="px-4 py-2 border">Title</th>
                <th className="px-4 py-2 border">Price</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  </td>
                  <td className="px-4 py-2 border">{course.title}</td>
                  <td className="px-4 py-2 border">{course.price}</td>
                  <td className="px-4 py-2 border space-x-2">
                    <button
                      onClick={() => handleEdit(course)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(course._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
