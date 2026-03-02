import React from "react";

const Loader = ({ show = true }) => {
  if (!show) return null;

  return (
    <div className="w-full h-full flex justify-center items-center  bg-opacity-30   transition-opacity duration-500">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 rounded-full border-4 border-t-transparent border-b-transparent border-l-amber-400 border-r-yellow-400 animate-spin"></div>
      </div>
    </div>
  );
};

export default Loader;
