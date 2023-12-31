import React from "react";

const FormInput = ({
  htmlFor,
  label,
  type,
  id,
  name,
  onBlur,
  onChange,
  value,
  error,
}) => {
  return (
    <>
      <label htmlFor={htmlFor} className="block mb-2 text-black">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        value={value}
        error={error}
        className={`w-full px-3 py-1 bg-gray-100 border-2 rounded-md focus:outline-none h-9 ${
          error
            ? "border-red-500  bg-red-100"
            : "border-gray-300 focus:border-gray-400"
        }`}
      />
    </>
  );
};

export default FormInput;
