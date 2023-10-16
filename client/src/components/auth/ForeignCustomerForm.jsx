import React from "react";
import { Field, ErrorMessage } from "formik";

function ForeignCustomerForm() {
  return (
    <div className="mb-4">
      <label
        htmlFor="temp_id"
        className="block text-gray-700 text-sm font-bold mb-2"
      >
        Long ID
      </label>
      <Field
        type="text"
        id="temp_id"
        name="temp_id"
        placeholder="Long ID"
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      <ErrorMessage
        name="temp_id"
        component="div"
        className="text-red-500 text-xs mt-1"
      />
    </div>
  );
}

export default ForeignCustomerForm;
