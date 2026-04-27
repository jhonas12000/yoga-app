import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function InstructorList() {
  const navigate = useNavigate();
  const [instructors, setInstructors] = useState<any[]>([]);

  useEffect(() => {
    fetchInstructors();
  }, []);

  const fetchInstructors = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/instructors`
      );
      setInstructors(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
     <button onClick={() => navigate("/")} style={{ marginBottom: "20px" }}>
        ⬅ Back to Home
     </button>
      <h2>Instructor List</h2>

      {instructors.length === 0 ? (
        <p>No instructors found</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {instructors.map((inst) => (
            <li key={inst._id} style={{ marginBottom: "10px" }}>
              {inst.firstName} {inst.lastName} ({inst.email})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default InstructorList;