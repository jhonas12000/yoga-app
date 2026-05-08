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
      const res = await axios.get("/api/instructors");
      setInstructors(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.log(err);
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
            Instructors
          </h1>
        </div>

        {/* Add Instructor */}
        <button
          onClick={() => navigate("/instructors/add")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl transition text-sm font-medium"
        >
          + Add Instructor
        </button>
      </div>

      {/* Instructor Table */}
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-sm overflow-hidden">

        {instructors.length === 0 ? (
          <p className="p-6 text-gray-500">
            No instructors found
          </p>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-600 text-sm uppercase">
              <tr>
                <th className="px-6 py-4">First Name</th>
                <th className="px-6 py-4">Last Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Phone</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {instructors.map((inst) => (
                <tr
                  key={inst._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4">
                    {inst.firstName}
                  </td>

                  <td className="px-6 py-4">
                    {inst.lastName}
                  </td>

                  <td className="px-6 py-4 text-gray-500">
                    {inst.email}
                  </td>

                  <td className="px-6 py-4 text-gray-500">
                    {inst.phone}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-4 text-lg">

                      {/* Update */}
                      <button
                        title="Update"
                        className="text-indigo-600 hover:text-indigo-800 transition"
                      >
                        ✏️
                      </button>

                      {/* Delete */}
                      <button
                        title="Delete"
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

export default InstructorList;