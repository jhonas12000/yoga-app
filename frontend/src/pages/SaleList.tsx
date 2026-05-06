import { useEffect, useState } from "react";
import axios from "axios";

function SaleList() {
  const [sales, setSales] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);

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

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Sales Records</h1>

      {sales.length === 0 ? (
        <p>No sales found</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {sales.map((sale) => (
            <li
              key={sale._id}
              style={{
                marginBottom: "15px",
                borderBottom: "1px solid #ccc",
                paddingBottom: "10px"
              }}
            >
              <div>
                <strong>{getCustomerName(sale.customerId)}</strong>
              </div>

              <div style={{ color: "gray" }}>
                Amount: ${sale.amount}
              </div>

              <div style={{ fontSize: "14px", color: "#666" }}>
                Date: {new Date(sale.date).toLocaleDateString()}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SaleList;