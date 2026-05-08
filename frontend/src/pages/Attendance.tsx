import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Attendance() {
  const navigate = useNavigate();

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

      setCustomers(Array.isArray(custRes.data) ? custRes.data : []);
      setClasses(Array.isArray(classRes.data) ? classRes.data : []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/attendance", {
        customerId,
        classId,
      });

      alert(res.data.message);

      setCustomerId("");
      setClassId("");

      navigate("/attendance-list");
    } catch (error: any) {
      alert(error.response?.data?.message || "Error");
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
            Record Attendance
          </h1>

          <p className="text-gray-500">
            Record customer attendance for yoga classes.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Customer */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Customer
            </label>

            <select
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">
                Select Customer
              </option>

              {customers.map((cust) => (
                <option
                  key={cust._id}
                  value={cust.customerId}
                >
                  {cust.firstName} {cust.lastName}
                </option>
              ))}
            </select>
          </div>

          {/* Class */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Class
            </label>

            <select
              value={classId}
              onChange={(e) => setClassId(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">
                Select Class
              </option>

              {classes.map((cls) => (
                <option
                  key={cls._id}
                  value={cls.classId}
                >
                  {cls.title} (
                  {new Date(cls.date).toLocaleDateString()})
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl text-lg font-semibold transition duration-300 shadow-lg"
          >
            Record Attendance
          </button>
        </form>
      </div>
    </div>
  );
}

export default Attendance;