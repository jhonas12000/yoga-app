import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type YogaClass = {
  _id: string;
  title: string;
  instructorId: string;
  date: string;
  capacity: number | string;
};

function ClassList() {
  const navigate = useNavigate();

  const [classes, setClasses] = useState<YogaClass[]>([]);

  const fetchClasses = async () => {
    try {
      const res = await axios.get("/api/classes");

      console.log("Classes:", res.data);

      setClasses(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const loadClasses = async () => {
      try {
        const res = await axios.get("/api/classes");

        console.log("Classes:", res.data);

        setClasses(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.log(error);
      }
    };

    loadClasses();
  }, []);

  const handleDelete = async (id: string | undefined) => {
    if (!id) return;

    const confirmed = window.confirm("Delete this class?");
    if (!confirmed) return;

    try {
      await axios.delete(`/api/classes/${id}`);
      fetchClasses();
    } catch (err) {
      console.log(err);
      alert("Failed to delete class");
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
            Yoga Classes
          </h1>
        </div>

        {/* Add Class */}
        <button
          onClick={() => navigate("/classes/add")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl transition text-sm font-medium"
        >
          + Add Class
        </button>
      </div>

      {/* Class Table */}
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-sm overflow-hidden">

        {classes.length === 0 ? (
          <p className="p-6 text-gray-500">
            No classes found
          </p>
        ) : (
          <table className="w-full text-left">

            <thead className="bg-gray-50 text-gray-600 text-sm uppercase">
              <tr>
                <th className="px-6 py-4">
                  Class Title
                </th>

                <th className="px-6 py-4">
                  Instructor ID
                </th>

                <th className="px-6 py-4">
                  Date
                </th>

                <th className="px-6 py-4">
                  Capacity
                </th>

                <th className="px-6 py-4 text-center">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {classes.map((cls) => (
                <tr
                  key={cls._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  {/* Title */}
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {cls.title}
                  </td>

                  {/* Instructor */}
                  <td className="px-6 py-4 text-gray-500">
                    {cls.instructorId}
                  </td>

                  {/* Date */}
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(cls.date).toLocaleDateString()}
                  </td>

                  {/* Capacity */}
                  <td className="px-6 py-4 text-gray-500">
                    {cls.capacity}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-4 text-lg">

                      {/* Update */}
                      <button
                        title="Update (Coming Soon)"
                        className="text-indigo-600 hover:text-indigo-800 transition"
                        onClick={() => navigate(`/classes/edit/${cls._id}`)}
                      >
                        ✏️
                      </button>

                      {/* Delete */}
                      <button
                        title="Delete"
                        className="text-red-500 hover:text-red-700 transition"
                        onClick={() => handleDelete(cls._id)}
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

export default ClassList;