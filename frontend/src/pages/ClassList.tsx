import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ClassList() {
  const navigate = useNavigate();
  const [classes, setClasses] = useState<any[]>([]);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/classes`
        );
      console.log("Classes:", res.data);
      setClasses(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <button onClick={() => navigate("/")} style={{ marginBottom: "20px" }}>
        ⬅ Back to Home
      </button>

      <h2>Class List</h2>

      {classes.length === 0 ? (
        <p>No classes found</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {classes.map((cls) => (
            <li key={cls._id} style={{ marginBottom: "15px" }}>
              <strong>{cls.title}</strong>
              <br />
              Instructor ID: {cls.instructorId}
              <br />
              Date: {cls.date}
              <br />
              Capacity: {cls.capacity}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ClassList;