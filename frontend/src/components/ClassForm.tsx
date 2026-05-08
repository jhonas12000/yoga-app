import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const AddClass = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    title: "",
    instructorId: "",
    date: "",
    capacity: "",
  });

  useEffect(() => {
    const fetchClass = async () => {
      if (!id) return;

      try {
        const res = await axios.get(`/api/classes/${id}`);
        setForm({
          title: res.data.title || "",
          instructorId: res.data.instructorId || "",
          date: res.data.date ? res.data.date.split("T")[0] : "",
          capacity: res.data.capacity ? String(res.data.capacity) : "",
        });
      } catch (error) {
        console.error(error);
        alert("Unable to load class data.");
      }
    };

    fetchClass();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = id
        ? await axios.put(`/api/classes/${id}`, form)
        : await axios.post("/api/classes", form);

      alert(res.data.message);

      navigate("/classes/list");
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        alert(error.response?.data?.message || "Failed to add class");
      } else {
        alert("Failed to add class");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6 py-12">

      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl p-10">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="text-indigo-600 hover:text-indigo-800 font-medium mb-6"
        >
          ← Go Back
        </button>

        {/* Heading */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            {id ? "Edit Yoga Class" : "Add Yoga Class"}
          </h1>

          <p className="text-gray-500">
            Create and schedule a new yoga class session.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* Class Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Class Title
            </label>

            <input
              type="text"
              name="title"
              placeholder="Enter class title"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Instructor ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Instructor ID
            </label>

            <input
              type="text"
              name="instructorId"
              placeholder="Instructor ID (ex: I001)"
              value={form.instructorId}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Class Date
            </label>

            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Capacity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Capacity
            </label>

            <input
              type="number"
              name="capacity"
              placeholder="Enter class capacity"
              value={form.capacity}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl text-lg font-semibold transition duration-300 shadow-lg"
          >
            {id ? "Update Class" : "Save Class"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddClass;