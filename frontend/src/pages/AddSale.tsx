import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddSale() {
  const navigate = useNavigate();

  const [customers, setCustomers] = useState<any[]>([]);
  const [customerId, setCustomerId] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const res = await axios.get("/api/customers");
      setCustomers(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/sales", {
        customerId,
        amount: Number(amount),
      });

      alert(res.data.message);

      setCustomerId("");
      setAmount("");

      navigate("/sales");
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
            Record Sale
          </h1>

          <p className="text-gray-500">
            Record customer purchase and transaction details.
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

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount
            </label>

            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl text-lg font-semibold transition duration-300 shadow-lg"
          >
            Record Sale
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddSale;