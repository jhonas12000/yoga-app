import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function InstructorForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
    email: "",
    preferredContact: "email",
  });

  const [errors, setErrors] = useState<any>({});

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    // Remove error while typing
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  useEffect(() => {
    const fetchInstructor = async () => {
      if (!id) return;

      try {
        const res = await axios.get(`/api/instructors/${id}`);

        setForm({
          firstName: res.data.firstName || "",
          lastName: res.data.lastName || "",
          address: res.data.address || "",
          phone: res.data.phone || "",
          email: res.data.email || "",
          preferredContact: res.data.preferredContact || "email",
        });
      } catch (error) {
        console.error(error);
        alert("Unable to load instructor data.");
      }
    };

    fetchInstructor();
  }, [id]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: any = {};

    // First Name Validation
    if (!form.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    // Last Name Validation
    if (!form.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    // Address Validation
    if (!form.address.trim()) {
      newErrors.address = "Address is required";
    }

    // Phone Validation
    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(form.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    // Email Validation
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }

    setErrors(newErrors);

    // Stop submit if errors exist
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      const res = id
        ? await axios.put(`/api/instructors/${id}`, form)
        : await axios.post("/api/instructors", form);

      alert(res.data.message);

      navigate("/instructors/list");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        alert(error.response.data?.message || "Server error");
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
            {id ? "Edit Instructor" : "Add Instructor"}
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
              value={form.firstName}
              onChange={handleChange}
              className={`w-full border rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 ${
                errors.firstName
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-indigo-500"
              }`}
            />

            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.firstName}
              </p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last Name
            </label>

            <input
              name="lastName"
              placeholder="Enter last name"
              value={form.lastName}
              onChange={handleChange}
              className={`w-full border rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 ${
                errors.lastName
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-indigo-500"
              }`}
            />

            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.lastName}
              </p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address
            </label>

            <input
              name="address"
              placeholder="Enter address"
              value={form.address}
              onChange={handleChange}
              className={`w-full border rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 ${
                errors.address
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-indigo-500"
              }`}
            />

            {errors.address && (
              <p className="text-red-500 text-sm mt-1">
                {errors.address}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone
            </label>

            <input
              name="phone"
              placeholder="Enter phone number"
              value={form.phone}
              onChange={handleChange}
              className={`w-full border rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 ${
                errors.phone
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-indigo-500"
              }`}
            />

            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>

            <input
              name="email"
              placeholder="Enter email"
              value={form.email}
              onChange={handleChange}
              className={`w-full border rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-indigo-500"
              }`}
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email}
              </p>
            )}
          </div>

          {/* Preferred Contact */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Contact
            </label>

            <select
              name="preferredContact"
              value={form.preferredContact}
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
            {id ? "Update Instructor" : "Add Instructor"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default InstructorForm;