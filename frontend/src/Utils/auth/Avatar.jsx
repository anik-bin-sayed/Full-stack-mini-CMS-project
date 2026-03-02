import React from "react";

const Avatar = ({ eyesClosed }) => {
  return (
    <div className="flex justify-center mb-6">
      <div className="w-24 h-24 bg-yellow-300 rounded-full flex flex-col items-center justify-center relative">
        <div className="flex justify-between w-12 absolute top-1/3">
          <div
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              eyesClosed ? "bg-gray-800 scale-y-0.1" : "bg-black scale-y-1"
            }`}
          ></div>
          <div
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              eyesClosed ? "bg-gray-800 scale-y-0.1" : "bg-black scale-y-1"
            }`}
          ></div>
        </div>

        <div className="absolute bottom-4 w-6 h-1 bg-black rounded"></div>
      </div>
    </div>
  );
};

export default Avatar;
