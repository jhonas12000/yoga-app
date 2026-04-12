import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {
  const [instructors, setInstructors] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const instructorRes = await axios.get("/api/instructors");
      const customerRes = await axios.get("/api/customers");

      console.log("Instructors:", instructorRes.data);
      console.log("Customers:", customerRes.data);

      setInstructors(instructorRes.data);
      setCustomers(customerRes.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Yoga Management System</h1>

      <img
        src="https://images.unsplash.com/photo-1552196563-55cd4e45efb3"
        alt="Yoga"
        style={{ width: "300px", borderRadius: "10px" }}
      />

      <div style={{ marginTop: "20px" }}>
        <Link to="/instructors/add">
          <button style={{ marginLeft: "10px" }}>
            Manage Instructors
          </button>
        </Link>

        <Link to="/customers">
          <button style={{ marginLeft: "10px" }}>
            Manage Customers
          </button>
        </Link>
      </div>

      <hr style={{ margin: "30px 0" }} />

      {/* ✅ FIXED: Proper wrapper for both sections */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          maxWidth: "700px",
          margin: "0 auto",
          alignItems: "flex-start",
          gap: "40px"
        }}
      >
        {/* Instructor List */}
        <div style={{ flex: 1 }}>
          <h2>Instructors</h2>
          {instructors.length === 0 ? (
            <p>No instructors found</p>
          ) : (
            <ul style={{ listStyle: "none", padding: 0 }}>
              {instructors.map((inst) => (
                <li
                  key={inst._id}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "10px"
                  }}
                >
                  <span style={{ marginRight: "8px" }}>
                    {inst.firstName} {inst.lastName}
                  </span>

                  <span style={{ color: "gray" }}>
                    ({inst.email})
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Customer List */}
        <div style={{ flex: 1 }}>
          <h2>Customers</h2>
          {customers.length === 0 ? (
            <p>No customers found</p>
          ) : (
            <ul style={{ listStyle: "none", padding: 0 }}>
              {customers.map((cust) => (
                <li
                    key={cust._id}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginBottom: "10px"
                    }}
                  >
                    <span style={{ marginRight: "8px" }}>
                      {cust.firstName} {cust.lastName}
                    </span>

                    <span style={{ color: "gray" }}>
                      ({cust.email})
                    </span>
                  </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;