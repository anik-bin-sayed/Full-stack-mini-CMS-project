import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Button from "../../Utils/auth/Button";
import Avatar from "../../Utils/auth/Avatar";
import FloatingInput from "../../Utils/auth/FloatingInput";
import { useRegisterUserMutation } from "../../features/auth/authApi";
import Navbar from "../../components/Navbar";
import PageTitle from "../../components/PageTitle";
import { toast } from "react-toastify";

const Register = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const eyesClosed = !showPassword;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      full_name: "",
      username: "",
      email: "",
      password: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser(formData).unwrap();
      resetForm();
      toast.success(res?.message || "Registration successful! Please login.");
      navigate("/login");
    } catch (error) {
      resetForm();
      toast.error(
        error?.data?.email[0] || "Registration failed. Please try again.",
      );
    }
  };

  return (
    <>
      <PageTitle title="Register | EduMaster" />
      <Navbar />
      <div className="h-[calc(100vh-100px)] flex items-center justify-center ">
        <div className="bg-white shadow-lg rounded-xl p-8 w-96">
          <Avatar eyesClosed={eyesClosed} />

          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-2xl font-semibold text-black drop-shadow-md">
              Sign Up for EduMaster
            </h1>
            <p className="mt-2 text-gray-600 text-sm sm:text-base">
              Join thousands of learners and instructors today!
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <FloatingInput
              type="text"
              label={"Full Name"}
              name={"full_name"}
              value={formData.full_name}
              onChange={handleChange}
            />

            <FloatingInput
              type="text"
              label={"Username"}
              name={"username"}
              value={formData.username}
              onChange={handleChange}
            />

            <FloatingInput
              type="email"
              label={"Email"}
              name={"email"}
              value={formData.email}
              onChange={handleChange}
            />

            <div className="relative">
              <FloatingInput
                type={showPassword ? "text" : "password"}
                label={"Password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
              />

              {formData.password && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 text-sm"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              )}
            </div>

            <Button
              type="submit"
              text={isLoading ? "Loading..." : "Register"}
            />
          </form>
          <div className="flex gap-2 mt-2">
            <p>Have an account?</p>
            <Link to="/login" className="text-blue-500 hover:underline">
              Login here
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
