import React from "react";

const SelectInput = ({
  label,
  htmlFor,
  name,
  id,
  onBlur,
  onChange,
  value,
  error,
  options,
}) => {
  return (
    <>
      <label htmlFor={htmlFor} className="block mb-2 text-black">
        {label}
      </label>
      <select
        name={name}
        id={id}
        onBlur={onBlur}
        onChange={onChange}
        value={value}
        className={`w-full px-3 py-1 bg-gray-100 border-2 rounded-md focus:outline-none ${
          error
            ? "border-red-500 bg-red-100"
            : "border-gray-300 focus:border-gray-400"
        }`}
      ></select>
    </>
  );
};

export default SelectInput;
