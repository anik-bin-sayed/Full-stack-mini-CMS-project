import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const navLinkStyle = ({ isActive }) =>
    `font-medium px-4 py-2 rounded transition ${
      isActive ? "bg-yellow-400 text-black" : "hover:bg-gray-200 text-gray-700"
    }`;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-gray-800">
            EduMaster
          </Link>

          <div className="hidden md:flex items-center gap-4">
            <NavLink to="/" className={navLinkStyle}>
              All Courses
            </NavLink>

            {isAuthenticated ? (
              user?.role === "instructor" ? (
                <NavLink
                  to="/instructor/courses"
                  className="px-4 py-2 bg-yellow-400 rounded-lg hover:bg-yellow-500 font-semibold"
                >
                  Instructor Dashboard
                </NavLink>
              ) : (
                <NavLink
                  to="/dashboard/my-courses"
                  className="px-4 py-2 bg-yellow-400 rounded-lg hover:bg-yellow-500 font-semibold"
                >
                  Dashboard
                </NavLink>
              )
            ) : (
              <NavLink
                to="/login"
                className="px-4 py-2 bg-yellow-400 rounded-lg hover:bg-yellow-500 font-semibold"
              >
                Login / Register
              </NavLink>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg border-t">
          <div className="flex flex-col px-4 py-4 space-y-3">
            <NavLink
              to="/"
              onClick={() => setMenuOpen(false)}
              className={navLinkStyle}
            >
              All Courses
            </NavLink>

            {isAuthenticated ? (
              user?.role === "instructor" ? (
                <NavLink
                  to="/instructor/courses"
                  onClick={() => setMenuOpen(false)}
                  className="bg-yellow-400 px-4 py-2 rounded font-semibold"
                >
                  Instructor Dashboard
                </NavLink>
              ) : (
                <NavLink
                  to="/dashboard/my-courses"
                  onClick={() => setMenuOpen(false)}
                  className="bg-yellow-400 px-4 py-2 rounded font-semibold"
                >
                  Dashboard
                </NavLink>
              )
            ) : (
              <NavLink
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="bg-yellow-400 px-4 py-2 rounded font-semibold"
              >
                Login / Register
              </NavLink>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
