

import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type Customer = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

function CustomerList() {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState<Customer[]>([]);

  const fetchCustomers = async () => {
    try {
      const res = await axios.get("/api/customers");
      setCustomers(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const loadCustomers = async () => {
      try {
        const res = await axios.get("/api/customers");
        setCustomers(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.log(error);
      }
    };

    loadCustomers();
  }, []);

  const handleDelete = async (id: string | undefined) => {
    if (!id) return;

    const confirmed = window.confirm("Delete this customer?");
    if (!confirmed) return;

    try {
      await axios.delete(`/api/customers/${id}`);
      fetchCustomers();
    } catch (err) {
      console.log(err);
      alert("Failed to delete customer");
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
          Customers
        </h1>
      </div>

      <button
        onClick={() => navigate("/customers/add")}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl transition text-sm font-medium"
      >
        + Add Customer
      </button>
    </div>

    {/* Customer Table */}
    <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-sm overflow-hidden">

      {customers.length === 0 ? (
        <p className="p-6 text-gray-500">
          No customers found
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
            {customers.map((cust) => (
              <tr
                key={cust._id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4">
                  {cust.firstName}
                </td>

                <td className="px-6 py-4">
                  {cust.lastName}
                </td>

                <td className="px-6 py-4 text-gray-500">
                  {cust.email}
                </td>

                <td className="px-6 py-4 text-gray-500">
                  {cust.phone}
                </td>

                {/* Actions */}
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-4 text-lg">

                    {/* Update */}
                    <button
                      title="Update"
                      className="text-indigo-600 hover:text-indigo-800 transition"
                      onClick={() => navigate(`/customers/edit/${cust._id}`)}
                    >
                      ✏️
                    </button>

                    {/* Delete */}
                    <button
                      title="Delete"
                      className="text-red-500 hover:text-red-700 transition"
                      onClick={() => handleDelete(cust._id)}
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

export default CustomerList;
