import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddClass = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    instructorId: "",
    date: "",
    capacity: ""
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/classes", form);

      alert(res.data.message);
      navigate("/");
    } catch (error: any) {
      console.error(error);
      alert(
        error.response?.data?.message ||
        "Failed to add class"
      );
    }
  };

  return (
    <div style={{ padding: "20px" }}>
        <button onClick={() => navigate("/")} style={{ marginBottom: "20px" }}>
        ⬅ Back to Home
      </button>
      <h1>Add Class</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Class Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          type="text"
          name="instructorId"
          placeholder="Instructor ID (ex: I001)"
          value={form.instructorId}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          type="number"
          name="capacity"
          placeholder="Capacity"
          value={form.capacity}
          onChange={handleChange}
          required
        />
        <br /><br />

        <button type="submit">
          Save Class
        </button>

        <button
          type="button"
          onClick={() => navigate(-1)}
          style={{ marginLeft: "10px" }}
        >
          Back
        </button>
      </form>
    </div>
  );
};

export default AddClass;