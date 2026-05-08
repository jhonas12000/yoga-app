import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Reports() {
  const navigate = useNavigate();
  const [report, setReport] = useState<any>(null);
 
  

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    try {
      const res = await axios.get("/api/reports");
      setReport(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!report) {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "100px",
          fontSize: "24px",
          fontWeight: "bold",
          color: "#555",
        }}
      >
        Loading Reports...
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #f5f7fa, #c3cfe2)",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          backgroundColor: "white",
          borderRadius: "20px",
          padding: "40px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
        }}
      >
        <div
            onClick={() => navigate("/")}
            style={{
                cursor: "pointer",
                fontSize: "20px",
                fontWeight: "bold",
                color: "#2c3e50",
                marginBottom: "20px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
            }}
        >
  ← Back to Home
</div>
        <h1
          style={{
            textAlign: "center",
            marginBottom: "40px",
            color: "#2c3e50",
            fontSize: "40px",
          }}
        >
          Reports Dashboard
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "25px",
          }}
        >
          <div
            style={{
              backgroundColor: "#3498db",
              color: "white",
              padding: "30px",
              borderRadius: "15px",
              textAlign: "center",
            }}
          >
            <h2>Total Customers</h2>
            <p style={{ fontSize: "36px", fontWeight: "bold" }}>
              {report.totalCustomers}
            </p>
          </div>

          <div
            style={{
              backgroundColor: "#2ecc71",
              color: "white",
              padding: "30px",
              borderRadius: "15px",
              textAlign: "center",
            }}
          >
            <h2>Total Classes</h2>
            <p style={{ fontSize: "36px", fontWeight: "bold" }}>
              {report.totalClasses}
            </p>
          </div>

          <div
            style={{
              backgroundColor: "#9b59b6",
              color: "white",
              padding: "30px",
              borderRadius: "15px",
              textAlign: "center",
            }}
          >
            <h2>Total Attendance</h2>
            <p style={{ fontSize: "36px", fontWeight: "bold" }}>
              {report.totalAttendance}
            </p>
          </div>

          <div
            style={{
              backgroundColor: "#e67e22",
              color: "white",
              padding: "30px",
              borderRadius: "15px",
              textAlign: "center",
            }}
          >
            <h2>Total Revenue</h2>
            <p style={{ fontSize: "36px", fontWeight: "bold" }}>
              ${report.totalRevenue}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports;