import React, { useState } from "react";
import { useLoginUserMutation } from "../../features/auth/authApi";
import { Link, useNavigate } from "react-router-dom";
import FloatingInput from "../../Utils/auth/FloatingInput";
import Button from "../../Utils/auth/Button";
import Avatar from "../../Utils/auth/Avatar";
import { useDispatch } from "react-redux";
import { userAuthenticated } from "../../features/auth/authSlice";
import Navbar from "../../components/Navbar";
import PageTitle from "../../components/PageTitle";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loginUser, { isLoading }] = useLoginUserMutation();

  const eyesClosed = !showPassword;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      email: "",
      password: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser(formData).unwrap();
      dispatch(userAuthenticated());
      navigate("/dashboard");
      resetForm();
    } catch (error) {
      console.log(error);
      resetForm();
    }
  };

  return (
    <>
      <PageTitle title="Login | EduMaster" />
      <Navbar />
      <div className="h-[80vh] flex items-center justify-center ">
        <div className="bg-white shadow-lg rounded-xl p-8 w-96">
          <Avatar eyesClosed={eyesClosed} />

          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-2xl font-semibold text-black drop-shadow-md">
              Sign In for EduMaster
            </h1>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
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

            <Button type="submit" text={isLoading ? "Loading..." : "Login"} />
          </form>
          <div className="flex gap-2 mt-2">
            <p>Don't have an account?</p>
            <Link to="/register" className="text-blue-500 hover:underline">
              Register here
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
