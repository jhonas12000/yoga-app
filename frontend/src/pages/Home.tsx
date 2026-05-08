
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {
  const [instructors, setInstructors] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [showAbout, setShowAbout] = useState(false);
  const aboutRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const instructorRes = await axios.get("/api/instructors");
      const customerRes = await axios.get("/api/customers");
      const classRes = await axios.get("/api/classes");

      setInstructors(instructorRes.data);
      setCustomers(customerRes.data);
      setClasses(classRes.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAboutToggle = () => {
  if (showAbout) {
    setShowAbout(false);
  } else {
    setShowAbout(true);

    setTimeout(() => {
      aboutRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);
  }
};

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
    <nav className="sticky top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-lg shadow-[0_2px_10px_rgba(0,0,0,0.05)] border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">

        {/* Logo */}
       <div className="flex items-center gap-3">
  <div className="text-2xl">
    🧘
  </div>

  <h1 className="text-xl font-extralight italic tracking-[0.2em] text-white">
    YogaMS
  </h1>
</div>


        <div className="flex items-center gap-8 text-sm font-medium text-gray-700">

          <Link
            to="/instructors/list"
            className="relative hover:text-indigo-600 transition after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-indigo-600 after:transition-all hover:after:w-full"
          >
            Instructors
          </Link>

          <Link
            to="/customers"
            className="relative hover:text-indigo-600 transition after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-indigo-600 after:transition-all hover:after:w-full"
          >
            Customers
          </Link>

          <Link
            to="/classes/list"
            className="relative hover:text-indigo-600 transition after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-indigo-600 after:transition-all hover:after:w-full"
          >
            Classes
          </Link>

          <Link
            to="/reports"
            className="relative hover:text-indigo-600 transition after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-indigo-600 after:transition-all hover:after:w-full"
          >
            Reports
          </Link>

        </div>
      </div>
    </nav>
      {/* Hero Section */}
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">

      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2070&auto=format&fit=crop"
        alt="Yoga"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 max-w-4xl">

        <p className="uppercase tracking-[6px] text-indigo-200 mb-4 text-sm">
          BALANCE • WELLNESS • MINDFULNESS
        </p>

        <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
          Discover Your Inner
          <span className="block text-indigo-300">
            Peace Through Yoga
          </span>
        </h1>

        <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-10 leading-relaxed">
          Experience the harmony of mind, body, and soul through
          guided yoga sessions designed to improve flexibility,
          mindfulness, strength, and overall well-being.
        </p>

        {/* Main Buttons */}
        <div className="mt-10">
          <button
            onClick={handleAboutToggle}
            className="border border-white/40 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white px-8 py-3 rounded-2xl transition duration-300 text-sm tracking-wide"
          >
            About Us
          </button>
        </div>

       

      </div>
    </section>

    {/* About Us Section */}
{showAbout && (
  <section className="relative py-28 px-6 overflow-hidden">

    {/* Background Image */}
    <img
      src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2070&auto=format&fit=crop"
      alt="Yoga"
      className="absolute inset-0 w-full h-full object-cover"
    />

    {/* Overlay */}
    <div className="absolute inset-0 bg-black/70"></div>

    {/* Content */}
    <div className="relative z-10 max-w-4xl mx-auto text-center text-white">

      <p className="uppercase tracking-[6px] text-indigo-200 mb-4 text-sm">
        ABOUT US
      </p>

      <h2 className="text-5xl md:text-6xl font-bold mb-8">
        Our Yoga Journey
      </h2>

      <p className="text-lg md:text-xl text-gray-200 leading-relaxed mb-6">
        We believe yoga is more than physical movement —
        it is a journey toward balance, mindfulness,
        inner peace, and personal growth.
      </p>

      <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
        Our mission is to create a welcoming environment
        where individuals of all levels can strengthen
        the connection between body, mind, and spirit
        through guided yoga practice and wellness.
      </p>

    </div>
  </section>
)}

    {/* Quick Actions */}
<section className="bg-gray-50 py-16 px-6">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
      Quick Actions
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <Link
        to="/attendance"
        className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition hover:-translate-y-1"
      >
        <h3 className="text-xl font-semibold text-indigo-600 mb-2">
          Record Attendance
        </h3>
        <p className="text-gray-600 text-sm">
          Mark customer attendance for scheduled yoga classes.
        </p>
      </Link>

      <Link
        to="/attendance-list"
        className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition hover:-translate-y-1"
      >
        <h3 className="text-xl font-semibold text-purple-600 mb-2">
          Attendance List
        </h3>
        <p className="text-gray-600 text-sm">
          View saved attendance records and class participation.
        </p>
      </Link>

      <Link
        to="/add-sale"
        className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition hover:-translate-y-1"
      >
        <h3 className="text-xl font-semibold text-green-600 mb-2">
          Record Sale
        </h3>
        <p className="text-gray-600 text-sm">
          Add sales transactions for studio services or products.
        </p>
      </Link>

      <Link
        to="/sales"
        className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition hover:-translate-y-1"
      >
        <h3 className="text-xl font-semibold text-pink-600 mb-2">
          Sales
        </h3>
        <p className="text-gray-600 text-sm">
          Review sales history and business transaction records.
        </p>
      </Link>
    </div>
  </div>
</section>

<div className="mt-10">
  <button
    onClick={() => setShowAbout(!showAbout)}
    className="border border-white/40 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white px-8 py-3 rounded-2xl transition duration-300 text-sm tracking-wide"
  >
    About Us
  </button>
</div>

     {/* Footer */}
<footer className="bg-gray-900 text-gray-300 py-14 px-6 mt-20">
  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">

    {/* Brand */}
    <div>
      <h2 className="text-2xl font-bold text-white mb-4">
        YogaMS
      </h2>

      <p className="text-gray-400 leading-relaxed">
        A modern yoga management platform designed to help
        studios manage instructors, customers, attendance,
        classes, sales, and reports efficiently.
      </p>
    </div>

    {/* Quick Links */}
    <div>
      <h3 className="text-white font-semibold mb-4">
        Quick Links
      </h3>

      <ul className="space-y-3">
        <li>
          <Link
            to="/customers"
            className="hover:text-white transition"
          >
            Customers
          </Link>
        </li>

        <li>
          <Link
            to="/instructors/list"
            className="hover:text-white transition"
          >
            Instructors
          </Link>
        </li>

        <li>
          <Link
            to="/add-class"
            className="hover:text-white transition"
          >
            Classes
          </Link>
        </li>

        <li>
          <Link
            to="/reports"
            className="hover:text-white transition"
          >
            Reports
          </Link>
        </li>
      </ul>
    </div>

    {/* Contact */}
    <div>
      <h3 className="text-white font-semibold mb-4">
        Contact
      </h3>

      <p className="mb-2 text-gray-400">
        yoga@yogams.com
      </p>

      <p className="mb-2 text-gray-400">
        San Francisco, California
      </p>

      <p className="text-gray-400">
        MERN Stack Cloud Application
      </p>
    </div>

  </div>

  {/* Bottom */}
  <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm text-gray-500">
    © 2026 YogaMS. All rights reserved.
  </div>
</footer>
       
      
    </div> 
  );
}

export default Home;