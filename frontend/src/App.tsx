import {Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import InstructorForm from "./components/InstructorForm";
import CustomerForm from "./components/CustomerForm";
import InstructorList from "./pages/InstructorList";
import CustomerList from "./pages/CustomerList";
import AddClass from "./components/ClassForm";

function App() {
  return (
    
    <Routes>
      <Route path="/" element={<Home />} />

      {/* Instructor */}
      <Route path="/instructors/add" element={<InstructorForm />} />
      <Route path="/instructors/list" element={<InstructorList />} />

      {/* Customer */}
      <Route path="/customers" element={<CustomerForm />} />
      <Route path="/customers/list" element={<CustomerList />} />
      <Route path="/add-class" element={<AddClass />} />
    </Routes>
    
  );
}

export default App;