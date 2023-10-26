import React, { useState, useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import Button from "../../components/Button";
import FormInput from "../../components/FormInput";
import { busTypeValidationSchema } from "../../schemas/ValidationSchema";
import { useNavigate } from "react-router-dom";

const AddBusType = () => {
  const navigate = useNavigate();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        no: "",
        type: "",
      },

      validationSchema: busTypeValidationSchema,

      onSubmit: (values, { resetForm }) => {
        //call backend API - add bus type
        axios
          .post("http://localhost:8000/api/v1/bustype/", values)
          .then((res) => {
            // console.log(res);
            alert("Succsessfully added.");
            resetForm();
            navigate("/bus-types");
          })
          .catch((error) => {
            console.log(error);
          });
        // console.log(values);
      },
    });

  return (
    <div className="mx-auto mt-4 ml-10 mr-6">
      <div className="mb-5">
        <p>
          <b>Add a bus type</b>
        </p>
      </div>

      <div className="mx-auto">
        {/* form */}
        <form onSubmit={handleSubmit}>
          <div className="flex mb-4">
            <div className="w-1/6 me-4">
              <FormInput
                label="Type number"
                htmlFor="no"
                type="text"
                id="no"
                name="no"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.no}
                error={touched.no && errors.no}
              ></FormInput>
              {touched.no && errors.no ? (
                <p className="mt-2 text-xs text-red-500">{errors.no}</p>
              ) : null}
            </div>

            <div className="w-5/6">
              <FormInput
                label="Type name"
                htmlFor="type"
                type="text"
                id="type"
                name="type"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.type}
                error={touched.type && errors.type}
              ></FormInput>
              {touched.type && errors.type ? (
                <p className="mt-2 text-xs text-red-500">{errors.type}</p>
              ) : null}
            </div>
          </div>

          <Button type="submit" name="Submit"></Button>
        </form>
      </div>
    </div>
  );
};

export default AddBusType;
