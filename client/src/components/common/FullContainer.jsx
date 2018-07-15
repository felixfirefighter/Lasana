import React from "react";

const FullContainer = ({ children }) => {
  return (
    <div
      className="center full-height"
      style={{
        background: "linear-gradient(to right, #5f2c82, #49a09d)"
      }}
    >
      {children}
    </div>
  );
};

export default FullContainer;
