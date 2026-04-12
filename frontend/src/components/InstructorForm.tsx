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
    preferredContact: "email"
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
    
    <div>
      <button onClick={() => navigate(-1)}>
        ⬅ Go Back
      </button>
      <h2>Add Instructor</h2>
      <form onSubmit={handleSubmit}>
        <input name="firstName" placeholder="First Name" onChange={handleChange} /><br />
        <input name="lastName" placeholder="Last Name" onChange={handleChange} /><br />
        <input name="address" placeholder="Address" onChange={handleChange} /><br />
        <input name="phone" placeholder="Phone" onChange={handleChange} /><br />
        <input name="email" placeholder="Email" onChange={handleChange} /><br />

        <select name="preferredContact" onChange={handleChange}>
          <option value="email">Email</option>
          <option value="phone">Phone</option>
        </select><br />

        <button type="submit">Add Instructor</button>
      </form>
    </div>
  );
}

export default InstructorForm;