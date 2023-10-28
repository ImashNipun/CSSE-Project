import React, { useState, useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import Button from "../../components/Button";
import FormInput from "../../components/FormInput";
import { fareCycleValidationSchema } from "../../schemas/ValidationSchema";
import { useNavigate } from "react-router-dom";

export const EnterFare = () => {
  const navigate = useNavigate();

  const [busType, setBusType] = useState([]);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        type: "",
        fare: [{ no: "", price: "" }],
      },

      validationSchema: fareCycleValidationSchema,

      onSubmit: (values, { resetForm }) => {
        // Modify the values.fare array to set 'no' based on index
        const modifiedFare = values.fare.map((fare, index) => ({
          no: index.toString(), // Set 'no' based on index
          price: fare.price,
        }));

        // Update the 'fare' property with the modified array
        values.fare = modifiedFare;

        // Call backend API to create a FareCycle
        axios
          .post("http://localhost:8000/api/v1/farecycle/", values)
          .then((res) => {
            alert("Successfully added FareCycle.");
            resetForm();
            //navigate("/fare-cycle"); // Adjust the route as needed
          })
          .catch((error) => {
            console.log(error);
          });
      },
    });

  const handleAddFare = () => {
    const newFare = { no: "", price: "" };
    const updatedFareArray = [...values.fare, newFare];

    handleChange({
      target: {
        name: "fare",
        value: updatedFareArray,
      },
    });
  };

  const handleRemoveFare = (index) => {
    const updatedFare = [...values.fare];
    updatedFare.splice(index, 1);
    handleChange({
      target: {
        name: "fare",
        value: updatedFare,
      },
    });
  };

  //call backend API - retriew bus types
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/v1/bustype")
      .then((res) => {
        setBusType(res?.data?.data);
        // console.log(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="mx-auto mt-4 ml-10 mr-6">
      <div className="mb-5">
        <p>
          <b>Add a fare cycle</b>
        </p>
      </div>

      <div className="mx-auto">
        {/* form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="busType" className="block mb-2 text-black">
              Bus Type
            </label>
            <select
              id="type"
              name="type"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.type}
              className={`w-full px-3 py-2 bg-gray-200 border rounded ${
                errors.type && touched.type
                  ? "border-red-500  bg-red-100"
                  : "border-gray-300 focus:border-gray-400"
              }`}
            >
              <option value="">Open this select menu</option>
              {busType
                ? busType.map((busType, busTypeIndex) => {
                    return (
                      <option key={busTypeIndex} value={busType._id}>
                        {busType.type}
                      </option>
                    );
                  })
                : null}
            </select>
            {touched.type && errors.type ? (
                <p className="mt-2 text-xs text-red-500">{errors.type}</p>
              ) : null}
          </div>

          <p className="mb-5">Fare List</p>

          {values.fare.map((fareData, index) => (
            <div key={index} className="flex mb-4">
              <div className="w-1/6 me-4">
                <FormInput
                  label={`Fare ${index + 1}`}
                  htmlFor={`fare[${index}].no`}
                  type="text"
                  id={`fare[${index}].no`}
                  name={`fare[${index}].no`}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={index}
                  error={
                    touched.fare &&
                    touched.fare[index] &&
                    errors.fare &&
                    errors.fare[index] &&
                    errors.fare[index].no
                  }
                ></FormInput>
                {touched.fare &&
                touched.fare[index] &&
                errors.fare &&
                errors.fare[index] &&
                errors.fare[index].no ? (
                  <p className="mt-2 text-xs text-red-500">
                    {errors.fare[index].no}
                  </p>
                ) : null}
              </div>

              <div className="w-5/6">
                <FormInput
                  label="Price"
                  htmlFor={`fare[${index}].price`}
                  type="text"
                  id={`fare[${index}].price`}
                  name={`fare[${index}].price`}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={fareData.price}
                  error={
                    touched.fare &&
                    touched.fare[index] &&
                    errors.fare &&
                    errors.fare[index] &&
                    errors.fare[index].price
                  }
                ></FormInput>
                {touched.fare &&
                touched.fare[index] &&
                errors.fare &&
                errors.fare[index] &&
                errors.fare[index].price ? (
                  <p className="mt-2 text-xs text-red-500">
                    {errors.fare[index].price}
                  </p>
                ) : null}
              </div>

              <div>
                {values.fare.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveFare(index)}
                    className="px-4 py-2 ml-5 text-white bg-red-500 rounded-md mt-7"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={handleAddFare}
            className="px-4 py-2 mt-5 mb-8 font-semibold text-blue-700 bg-transparent border border-blue-500 rounded hover:bg-blue-100"
          >
            Add new fare
          </button>

          <Button type="submit" name="Submit"></Button>
        </form>
      </div>
    </div>
  );
};
