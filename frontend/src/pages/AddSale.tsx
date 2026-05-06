import { useEffect, useState } from "react";
import axios from "axios";

function AddSale() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [customerId, setCustomerId] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const res = await axios.get("/api/customers");
      setCustomers(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/sales", {
        customerId,
        amount: Number(amount)
      });

      alert(res.data.message);
      setCustomerId("");
      setAmount("");
    } catch (error: any) {
      alert(error.response?.data?.message || "Error");
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Record Sale</h1>

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

        {/* Amount */}
        <div>
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <br />

        <button type="submit">Record Sale</button>
      </form>
    </div>
  );
}

export default AddSale;