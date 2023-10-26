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
      <label htmlFor={htmlFor} className="block text-sm text-gray-700">
        {label}
      </label>
      <select
        name={name}
        id={id}
        onBlur={onBlur}
        onChange={onChange}
        value={value}
        error={error}
        className={`w-full px-3 py-1 bg-gray-100 border-2 rounded-md focus:outline-none ${
          error
            ? "border-red-500  bg-red-100"
            : "border-gray-300 focus:border-gray-400"
        } text-sm h-9`}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
};

export default SelectInput;
