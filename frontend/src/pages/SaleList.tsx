import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type Sale = {
  _id: string;
  customerId: string;
  amount: number;
  date: string;
};

type Customer = {
  customerId: string;
  firstName: string;
  lastName: string;
};

function SaleList() {
  const navigate = useNavigate();

  const [sales, setSales] = useState<Sale[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const salesRes = await axios.get("/api/sales");
      const custRes = await axios.get("/api/customers");

      setSales(salesRes.data);
      setCustomers(custRes.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getCustomerName = (id: string) => {
    const customer = customers.find((c) => c.customerId === id);
    return customer
      ? `${customer.firstName} ${customer.lastName}`
      : id;
  };

  const handleDelete = async (id: string | undefined) => {
    if (!id) return;
    const confirmed = window.confirm("Delete this sale record?");
    if (!confirmed) return;

    try {
      await axios.delete(`/api/sales/${id}`);
      fetchData();
    } catch (error) {
      console.error(error);
      alert("Failed to delete sale");
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
            Sales Records
          </h1>
        </div>

        {/* Add Sale */}
        <button
          onClick={() => navigate("/sales/add")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl transition text-sm font-medium"
        >
          + Add Sale
        </button>
      </div>

      {/* Sales Table */}
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-sm overflow-hidden">

        {sales.length === 0 ? (
          <p className="p-6 text-gray-500">
            No sales found
          </p>
        ) : (
          <table className="w-full text-left">

            <thead className="bg-gray-50 text-gray-600 text-sm uppercase">
              <tr>
                <th className="px-6 py-4">
                  Customer
                </th>

                <th className="px-6 py-4">
                  Amount
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
              {sales.map((sale) => (
                <tr
                  key={sale._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  {/* Customer */}
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {getCustomerName(sale.customerId)}
                  </td>

                  {/* Amount */}
                  <td className="px-6 py-4 text-gray-500">
                    ${sale.amount}
                  </td>

                  {/* Date */}
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(sale.date).toLocaleDateString()}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-4 text-lg">

                      {/* Update */}
                      <button
                        title="Update (Coming Soon)"
                        className="text-indigo-600 hover:text-indigo-800 transition"
                        onClick={() => alert("Edit functionality coming soon")}
                      >
                        ✏️
                      </button>

                      {/* Delete */}
                      <button
                        title="Delete"
                        className="text-red-500 hover:text-red-700 transition"
                        onClick={() => handleDelete(sale._id)}
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

export default SaleList;