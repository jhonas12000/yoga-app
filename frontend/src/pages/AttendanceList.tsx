import { useEffect, useState } from "react";
import axios from "axios";

function AttendanceList() {
  const [records, setRecords] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const attRes = await axios.get("/api/attendance");
      const custRes = await axios.get("/api/customers");
      const classRes = await axios.get("/api/classes");

      setRecords(attRes.data);
      setCustomers(custRes.data);
      setClasses(classRes.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Helper functions
  const getCustomerName = (id: string) => {
    const customer = customers.find((c) => c.customerId === id);
    return customer
      ? `${customer.firstName} ${customer.lastName}`
      : id;
  };

  const getClassName = (id: string) => {
    const cls = classes.find((c) => c.classId === id);
    return cls ? cls.title : id;
  };

  const handleDelete = async (id: string | undefined) => {
  if (!id) return;

  try {
    await axios.delete(`/api/attendance/${id}`);
    alert("Deleted successfully");
    fetchData();
  } catch (error) {
    console.error(error);
    alert("Delete failed");
  }
};

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Attendance Records</h1>

      {records.length === 0 ? (
        <p>No attendance records found</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {records.map((rec) => (
            <li
                key={rec._id}
                style={{
                    marginBottom: "15px",
                    borderBottom: "1px solid #ccc",
                    paddingBottom: "10px"
                }}
                >
                <div>
                    <strong>
                    {getCustomerName(rec.customerId)}
                    </strong>{" "}
                    attended{" "}
                    <strong>
                    {getClassName(rec.classId)}
                    </strong>
                </div>

                <div style={{ color: "gray" }}>
                    Date: {new Date(rec.date).toLocaleDateString()}
                </div>

                <button
                    style={{
                    marginTop: "8px",
                    backgroundColor: "red",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    cursor: "pointer"
                    }}
                    onClick={() => handleDelete(rec._id)}
                >
                    Delete
                </button>
                </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AttendanceList;