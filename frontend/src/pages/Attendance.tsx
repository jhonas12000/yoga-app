import { useEffect, useState } from "react";
import axios from "axios";

function Attendance() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [customerId, setCustomerId] = useState("");
  const [classId, setClassId] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const custRes = await axios.get("/api/customers");
      const classRes = await axios.get("/api/classes");

      setCustomers(custRes.data);
      setClasses(classRes.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/attendance", {
        customerId,
        classId
      });

      alert(res.data.message);
      setCustomerId("");
      setClassId("");
    } catch (error: any) {
      alert(error.response?.data?.message || "Error");
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Record Attendance</h1>

      <form onSubmit={handleSubmit}>
        {/* Customer */}
        <div>
          <select
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            required
          >
            <option value="">Select Customer</option>
            {customers.map((cust) => (
              <option key={cust._id} value={cust.customerId}>
                {cust.firstName} {cust.lastName}
              </option>
            ))}
          </select>
        </div>

        <br />

        {/* Class */}
        <div>
          <select
            value={classId}
            onChange={(e) => setClassId(e.target.value)}
            required
          >
            <option value="">Select Class</option>
            {classes.map((cls) => (
              <option key={cls._id} value={cls.classId}>
                {cls.title} ({new Date(cls.date).toLocaleDateString()})
              </option>
            ))}
          </select>
        </div>

        <br />

        <button type="submit">Record Attendance</button>
      </form>
    </div>
  );
}

export default Attendance;