import React, { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { BookOpen, LogOut, Menu, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutUserMutation } from "../../features/auth/authApi";
import { logoutUserAuthSlice } from "../../features/auth/authSlice";
import PageTitle from "../../components/PageTitle";
import { toast } from "react-toastify";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [logoutUser, { isLoading }] = useLogoutUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogOut = async () => {
    try {
      await logoutUser();
      dispatch(logoutUserAuthSlice());
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <PageTitle title="Home | EduMaster" />

      <div className="flex h-screen bg-gray-100 relative overflow-hidden">
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <aside
          className={`
          fixed lg:static top-0 left-0 h-full w-64 bg-white shadow-lg
          flex flex-col justify-between
          transform transition-transform duration-300 z-50
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
        >
          <div className="flex justify-between items-center p-6 border-b lg:hidden">
            <span className="text-xl font-bold">Menu</span>
            <button onClick={() => setSidebarOpen(false)}>
              <X size={24} />
            </button>
          </div>

          <div>
            <div className="p-6 border-b hidden lg:block">
              <Link
                to="/"
                className="text-2xl font-bold tracking-wide text-gray-800"
              >
                EduMaster
              </Link>
            </div>

            <nav className="p-4 space-y-2">
              <NavLink
                to="/dashboard/my-courses"
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex gap-3 px-4 py-3 rounded transition
                ${
                  isActive
                    ? "bg-yellow-400 text-black font-semibold"
                    : "text-gray-600 hover:bg-gray-100"
                }`
                }
              >
                <BookOpen size={18} />
                My Courses
              </NavLink>
            </nav>
          </div>

          {user && (
            <div className="p-4 border-t">
              <button
                onClick={handleLogOut}
                className="flex items-center gap-2 text-red-500 hover:text-red-600 w-full border py-2 px-4 rounded-md cursor-pointer"
              >
                <LogOut size={18} />
                {isLoading ? "Logging out..." : "Log Out"}
              </button>
            </div>
          )}
        </aside>

        <div className="flex-1 flex flex-col w-full">
          <header className="bg-white shadow-sm px-4 lg:px-8 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden"
              >
                <Menu size={26} />
              </button>

              <h2 className="text-xl font-semibold text-gray-700">Dashboard</h2>
            </div>

            {!user ? (
              <div className="bg-yellow-400 px-4 py-2 rounded font-semibold">
                <Link to="/login">Login / Register</Link>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center font-bold">
                  {user?.fullName?.[0]}
                </div>

                <span className="text-gray-700 font-medium hidden sm:block">
                  {user?.fullName}
                </span>
              </div>
            )}
          </header>

          <main className="flex-1 overflow-y-auto p-4 lg:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
