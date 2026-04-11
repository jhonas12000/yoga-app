import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CustomerList() {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState<any[]>([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/customers");
      setCustomers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <button onClick={() => navigate("/")} style={{ marginBottom: "20px" }}>
        ⬅ Back to Home
      </button>
      <h2>Customer List</h2>

      {customers.length === 0 ? (
        <p>No customers found</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {customers.map((cust) => (
            <li key={cust._id} style={{ marginBottom: "10px" }}>
              {cust.firstName} {cust.lastName} ({cust.email})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CustomerList;