import React from "react";

const Button = ({type , name}) => {
  return (
    <div>
      <button
        type={type}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        {name}
      </button>
    </div>
  );
};

export default Button ;
