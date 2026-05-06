import {Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import InstructorForm from "./components/InstructorForm";
import CustomerForm from "./components/CustomerForm";
import InstructorList from "./pages/InstructorList";
import CustomerList from "./pages/CustomerList";
import AddClass from "./components/ClassForm";
import Attendance from "./pages/Attendance";
import AttendanceList from "./pages/AttendanceList";
import AddSale from "./pages/AddSale";
import SaleList from "./pages/SaleList";
import Reports from "./pages/Reports";

function App() {
  return (
    
    <Routes>
      <Route path="/" element={<Home />} />

      {/* Instructor */}
      <Route path="/instructors/add" element={<InstructorForm />} />
      <Route path="/instructors/list" element={<InstructorList />} />
      {/* Customer */}
      <Route path="/customers" element={<CustomerList />} />
      <Route path="/customers/add" element={<CustomerForm />} />
      <Route path="/add-class" element={<AddClass />} />
      <Route path="/attendance" element={<Attendance />} />
      <Route path="/attendance-list" element={<AttendanceList />} />
      <Route path="/add-sale" element={<AddSale />} />
      <Route path="/sales" element={<SaleList />} />
      <Route path="/reports" element={<Reports />} />
    </Routes>
    
  );
}

export default App;