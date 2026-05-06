import { useEffect, useState } from "react";
import axios from "axios";

function Reports() {
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
    return <p style={{ textAlign: "center" }}>Loading...</p>;
  }

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Reports Dashboard</h1>

      <div style={{ marginTop: "20px" }}>
        <h3>Total Customers: {report.totalCustomers}</h3>
        <h3>Total Classes: {report.totalClasses}</h3>
        <h3>Total Attendance: {report.totalAttendance}</h3>
        <h3>Total Revenue: ${report.totalRevenue}</h3>
      </div>
    </div>
  );
}

export default Reports;