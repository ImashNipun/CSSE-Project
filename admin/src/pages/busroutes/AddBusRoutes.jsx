import React, { useState, useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import Button from "../../components/Button";
import FormInput from "../../components/FormInput";
import { busRouteValidationSchema } from "../../schemas/ValidationSchema";

const AddBusRoutes = () => {
  
  //useState hook
  const [busType, setBusType] = useState([]);
  const [intermediateStops, setintermediateStops] = useState([]);
  const [fare, setFare] = useState([]);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        busType: "6539dd954854863b3ef73f18",
        routeName: "",
        routeNumber: "",
        beginning: "",
        destination: "",
        intermediateStops: [{ no: "", stop: "", fare: "" }],
        distance: "",
        travelTime: "",
        schedule: "",
      },

      validationSchema: busRouteValidationSchema,

      onSubmit: (values, { resetForm }) => {
        const modified = values.intermediateStops.map(
          (intermediateStops, index) => ({
            no: index.toString(),
            stop: intermediateStops.stop,
            fare: fare[0].fare[index].price,
          })
        );

        // Update the 'fare' property with the modified array
        values.intermediateStops = modified;

        //call backend API - add bus route
        axios
          .post("http://localhost:8000/api/v1/busroute/", values)
          .then((res) => {
            console.log(res);
            alert("Succsessfully added.");
            resetForm();
          })
          .catch((error) => {
            console.log(error);
          });
        console.log(values);
      },
    });
    
  //useEffect hooks

  //call backend API - retriew bus types
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/v1/bustype")
      .then((res) => {
        setBusType(res?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //call backend API - retriew intermediateStops by bus type
  useEffect(() => {
    if (values.busType) {
      // Check if busType is not empty
      axios
        .get(`http://localhost:8000/api/v1/farecycle/byType/${values.busType}`)
        .then((res) => {
          setintermediateStops(res?.data?.data);
          setFare(res?.data?.data);
          console.log(res.data.data[0].fare[0].price);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [values.busType]);

  const handleAddIntermediateStops = () => {
    const newFare = { no: "", stop: "", fare: "" };
    const updatedIntermediateStops = [...values.intermediateStops, newFare];

    handleChange({
      target: {
        name: "intermediateStops",
        value: updatedIntermediateStops,
      },
    });
  };

  const handleRemoveIntermediateStops = (index) => {
    const updatedIntermediateStops = [...values.intermediateStops];
    updatedIntermediateStops.splice(index, 1);

    handleChange({
      target: {
        name: "intermediateStops",
        value: updatedIntermediateStops,
      },
    });
  };

  return (
    <div className="mx-auto mt-4 ml-10 mr-6">
      <div className="mb-5">
        <p>
          <b>Add a bus route</b>
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
              id="busType"
              name="busType"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.busType}
              className={`w-full px-3 py-2 bg-gray-200 border rounded ${
                errors.busType && touched.busType
                  ? "border-red-500  bg-red-100"
                  : "border-gray-300 focus:border-gray-400"
              }`}
            >
              {/* React Conditional Rendering Design Pattern */}
              <option value="6539dd954854863b3ef73f18">Normal</option>
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
            {touched.busType && errors.busType ? (
              <p className="mt-2 text-xs text-red-500">{errors.busType}</p>
            ) : null}
          </div>

          <div className="flex mb-4">
            <div className="w-1/2 me-4">
              <FormInput
                label="Route name"
                htmlFor="routeName"
                type="text"
                id="routeName"
                name="routeName"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.routeName}
                error={touched.routeName && errors.routeName}
              ></FormInput>
              {touched.routeName && errors.routeName ? (
                <p className="mt-2 text-xs text-red-500">{errors.routeName}</p>
              ) : null}
            </div>

            <div className="w-1/2">
              <FormInput
                label="Rote number"
                htmlFor="routeNumber"
                type="text"
                id="routeNumber"
                name="routeNumber"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.routeNumber}
                error={touched.routeNumber && errors.routeNumber}
              ></FormInput>
              {touched.routeNumber && errors.routeNumber ? (
                <p className="mt-2 text-xs text-red-500">
                  {errors.routeNumber}
                </p>
              ) : null}
            </div>
          </div>

          <div className="flex mb-4">
            <div className="w-1/2 me-4">
              <FormInput
                label="Beginning"
                htmlFor="beginning"
                type="text"
                id="beginning"
                name="beginning"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.beginning}
                error={touched.beginning && errors.beginning}
              ></FormInput>
              {touched.beginning && errors.beginning ? (
                <p className="mt-2 text-xs text-red-500">{errors.beginning}</p>
              ) : null}
            </div>

            <div className="w-1/2">
              <FormInput
                label="Destination"
                htmlFor="destination"
                type="text"
                id="destination"
                name="destination"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.destination}
                error={touched.destination && errors.destination}
              ></FormInput>
              {touched.destination && errors.destination ? (
                <p className="mt-2 text-xs text-red-500">
                  {errors.destination}
                </p>
              ) : null}
            </div>
          </div>

          <div className="mb-4">
            <FormInput
              label="Distance"
              htmlFor="distance"
              type="text"
              id="distance"
              name="distance"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.distance}
              error={touched.distance && errors.distance}
            ></FormInput>
            {touched.distance && errors.distance ? (
              <p className="mt-2 text-xs text-red-500">{errors.distance}</p>
            ) : null}
          </div>

          <div className="mb-4">
            <FormInput
              label="Travel Time"
              htmlFor="travelTime"
              type="text"
              id="travelTime"
              name="travelTime"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.travelTime}
              error={touched.travelTime && errors.travelTime}
            ></FormInput>
            {touched.travelTime && errors.travelTime ? (
              <p className="mt-2 text-xs text-red-500">{errors.travelTime}</p>
            ) : null}
          </div>

          <div className="mb-4">
            <FormInput
              label="Schedule"
              htmlFor="schedule"
              type="text"
              id="schedule"
              name="schedule"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.schedule}
              error={touched.schedule && errors.schedule}
            ></FormInput>
            {touched.schedule && errors.schedule ? (
              <p className="mt-2 text-xs text-red-500">{errors.schedule}</p>
            ) : null}
          </div>

          <p className="my-5">Intermediate Bus stops List</p>

          {values.intermediateStops.map((intermediateStopsData, index) => (
            <div key={index} className="flex mb-4">
              <div className="w-1/6 me-4">
                <FormInput
                  label={`Intermediate Stop ${index + 1}`}
                  htmlFor={`intermediateStops[${index}].no`}
                  type="text"
                  id={`intermediateStops[${index}].no`}
                  name={`intermediateStops[${index}].no`}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={index}
                ></FormInput>
              </div>

              <div className="w-4/6 me-4">
                <FormInput
                  label="Stops"
                  htmlFor={`intermediateStops[${index}].stop`}
                  type="text"
                  id={`intermediateStops[${index}]].stop`}
                  name={`intermediateStops[${index}]].stop`}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={intermediateStopsData.stop}
                  error={
                    touched.intermediateStops &&
                    touched.intermediateStops[index] &&
                    errors.intermediateStops &&
                    errors.intermediateStops[index] &&
                    errors.intermediateStops[index].stop
                  }
                ></FormInput>
                {touched.intermediateStops &&
                touched.intermediateStops[index] &&
                errors.intermediateStops &&
                errors.intermediateStops[index] &&
                errors.intermediateStops[index].stop ? (
                  <p className="mt-2 text-xs text-red-500">
                    {errors.intermediateStops[index].stop}
                  </p>
                ) : null}
              </div>

              <div className="w-1/6">
                <FormInput
                  label="Fare"
                  htmlFor={`intermediateStops[${index}].fare`}
                  type="text"
                  id={`intermediateStops[${index}].fare`}
                  name={`intermediateStops[${index}].fare`}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={intermediateStops.map((data) => {
                    return data.fare[index].price;
                  })}
                ></FormInput>
              </div>

              <div>
                {values.intermediateStops.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveIntermediateStops(index)}
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
            onClick={handleAddIntermediateStops}
            className="px-4 py-2 mt-5 mb-8 font-semibold text-blue-700 bg-transparent border border-blue-500 rounded hover:bg-blue-100"
          >
            Add new stop
          </button>

          <Button type="submit" name="Submit"></Button>
        </form>
      </div>
    </div>
  );
};

export default AddBusRoutes;
