import React from "react";

const GlobalLoader = ({ loading }) => {
  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70">
      <div className="flex flex-col items-center gap-8">
        <h1 className="text-4xl font-bold text-yellow-400 tracking-widest animate-bounceText">
          EDUMASTAR
        </h1>

        <div className="w-72 h-[4px] bg-gray-700 overflow-hidden rounded-full">
          <div className="h-full w-32 bg-blue-500 animate-slideLine"></div>
        </div>
      </div>

      <style>
        {`
          @keyframes slideLine {
            0% {
              transform: translateX(250%);
            }
            100% {
              transform: translateX(-250%);
            }
          }

          .animate-slideLine {
            animation: slideLine 1.5s linear infinite;
          }

          @keyframes bounceText {
            0%,100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-15px);
            }
          }

          .animate-bounceText {
            animation: bounceText 1s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
};

export default GlobalLoader;
