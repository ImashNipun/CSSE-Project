import React, { useState, useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import Button from "../../components/Button";
import FormInput from "../../components/FormInput";
import { validationSchema } from "../../schemas/ValidationSchema";

const AddBusRoutes = () => {
  const [busType, setBusType] = useState([]);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        busType: "",
        routeName: "",
        routeNumber: "",
        beginning: "",
        destination: "",
        intermediateStops: "",
        distance: "",
        travelTime: "",
        schedule: "",
      },

      validationSchema: validationSchema,

      onSubmit: (values, { resetForm }) => {
        values.intermediateStops = [];

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

  //call backend API - retriew bus types
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/v1/bustype")
      .then((res) => {
        setBusType(res?.data?.data);
        console.log(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="mx-auto mt-4 ml-10 mr-6">
      <div>
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
              className="w-full px-3 py-2 bg-gray-200 border rounded"
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
              label="Intermediate Stops"
              htmlFor="intermediateStops"
              type="text"
              id="intermediateStops"
              name="intermediateStops"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.intermediateStops}
              error={touched.intermediateStops && errors.intermediateStops}
            ></FormInput>
            {touched.intermediateStops && errors.intermediateStops ? (
              <p className="mt-2 text-xs text-red-500">
                {errors.intermediateStops}
              </p>
            ) : null}
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

          <Button type="submit" name="Submit"></Button>
        </form>
      </div>
    </div>
  );
};

export default AddBusRoutes;
