import React from "react";
import { Field, ErrorMessage } from "formik";

function LocalCustomerForm() {
  return (
    <>
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Email
        </label>
        <Field
          type="text"
          id="email"
          name="email"
          placeholder="Email"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <ErrorMessage
          name="email"
          component="div"
          className="text-red-500 text-xs mt-1"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="password"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Password
        </label>
        <Field
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <ErrorMessage
          name="password"
          component="div"
          className="text-red-500 text-xs mt-1"
        />
      </div>
    </>
  );
}

export default LocalCustomerForm;
