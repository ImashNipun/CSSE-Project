import React from "react";

const FormInput = ({htmlFor , label , type , id}) => {
  return (
    <>
      <label htmlFor={htmlFor} className="text-black block mb-2">
        {label}
      </label>
      <input
        type={type}
        id={id}
        className="w-full py-2 px-3 bg-gray-200 border rounded h-9 text-sm"
      />
    </>
  );
};

export default FormInput;
