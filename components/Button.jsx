import React from "react";

const Button = ({ text, onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-full text-white"
    >
      {text}
    </button>
  );
};

export default Button;
