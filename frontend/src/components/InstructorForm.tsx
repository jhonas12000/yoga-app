import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function InstructorForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
    email: "",
    preferredContact: "email",
  });

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/instructors", form);

      alert(res.data.message);

      navigate("/instructors/list");
    } catch (err: any) {
      if (err.response) {
        alert(err.response.data.message);
      } else {
        alert("Server error");
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
            Add Instructor
          </h1>

          <p className="text-gray-500">
            Create a new instructor profile for the yoga management system.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First Name
            </label>

            <input
              name="firstName"
              placeholder="Enter first name"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last Name
            </label>

            <input
              name="lastName"
              placeholder="Enter last name"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address
            </label>

            <input
              name="address"
              placeholder="Enter address"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone
            </label>

            <input
              name="phone"
              placeholder="Enter phone number"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>

            <input
              name="email"
              placeholder="Enter email"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Preferred Contact */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Contact
            </label>

            <select
              name="preferredContact"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="email">Email</option>
              <option value="phone">Phone</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl text-lg font-semibold transition duration-300 shadow-lg"
          >
            Add Instructor
          </button>
        </form>
      </div>
    </div>
  );
}

export default InstructorForm;