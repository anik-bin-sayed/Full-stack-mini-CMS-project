import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 overflow-hidden">
      <div className="relative flex flex-col items-center">
        {/* Cartoon Face */}
        <div className="w-40 h-40 bg-white rounded-full shadow-xl flex items-center justify-center animate-float">
          {/* Eyes */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between w-[80px]">
              <div className="flex items-center justify-center w-6 h-6 bg-black rounded-full animate-blink">
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-blink"></div>
              </div>
              <div className="flex items-center justify-center w-6 h-6 bg-black rounded-full animate-blink">
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-blink"></div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-12 h-6 border-b-4 border-black rounded-b-full mt-2"></div>
            </div>
          </div>
        </div>
      </div>

      <h1 className="text-7xl font-extrabold mt-10 text-gray-800">404</h1>

      <p className="text-xl text-gray-600 mt-2">Oops! Page Not Found</p>

      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-yellow-400 text-black rounded-lg shadow-lg hover:scale-105 transition"
      >
        Go Back to Home
      </Link>

      <style>
        {`
          @keyframes float {
            0%,100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }

          .animate-float {
            animation: float 3s ease-in-out infinite;
          }

          @keyframes blink {
            0%,90%,100% { transform: scaleY(1); }
            95% { transform: scaleY(0.1); }
          }

          .animate-blink {
            animation: blink 4s infinite;
          }
        `}
      </style>
    </div>
  );
};

export default NotFound;
