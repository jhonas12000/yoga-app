import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AttendanceList() {
  const navigate = useNavigate();

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

      setRecords(Array.isArray(attRes.data) ? attRes.data : []);
      setCustomers(Array.isArray(custRes.data) ? custRes.data : []);
      setClasses(Array.isArray(classRes.data) ? classRes.data : []);
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
    <div className="min-h-screen bg-gray-100 px-6 py-10">

      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8 flex items-center justify-between">

        <div>
          <button
            onClick={() => navigate("/")}
            className="text-indigo-600 hover:text-indigo-800 font-medium mb-3"
          >
            ← Back to Home
          </button>

          <h1 className="text-4xl font-bold text-gray-800">
            Attendance Records
          </h1>
        </div>

        {/* Add Attendance */}
        <button
          onClick={() => navigate("/attendance")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl transition text-sm font-medium"
        >
          + Record Attendance
        </button>
      </div>

      {/* Attendance Table */}
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-sm overflow-hidden">

        {records.length === 0 ? (
          <p className="p-6 text-gray-500">
            No attendance records found
          </p>
        ) : (
          <table className="w-full text-left">

            <thead className="bg-gray-50 text-gray-600 text-sm uppercase">
              <tr>
                <th className="px-6 py-4">
                  Customer
                </th>

                <th className="px-6 py-4">
                  Class
                </th>

                <th className="px-6 py-4">
                  Date
                </th>

                <th className="px-6 py-4 text-center">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {records.map((rec) => (
                <tr
                  key={rec._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  {/* Customer */}
                  <td className="px-6 py-4">
                    {getCustomerName(rec.customerId)}
                  </td>

                  {/* Class */}
                  <td className="px-6 py-4">
                    {getClassName(rec.classId)}
                  </td>

                  {/* Date */}
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(rec.date).toLocaleDateString()}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-4 text-lg">

                      {/* Delete */}
                      <button
                        title="Delete"
                        onClick={() => handleDelete(rec._id)}
                        className="text-red-500 hover:text-red-700 transition"
                      >
                        🗑️
                      </button>

                    </div>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        )}
      </div>
    </div>
  );
}

export default AttendanceList;