import React from "react";

const LoadingIndicator: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <div
        className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-primary"
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingIndicator;
