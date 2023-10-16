import React from "react";
import FormInput from "../../components/FormInput";
import Button from "../../components/Button";

const AddBusRoutes = () => {
  return (
    <div className="mx-auto mt-4 ml-10 mr-6">
      <div>
        <p>Add a bus route</p>
      </div>

      <div className="mx-auto">
        <form>
          <div className="mb-4">
            <label htmlFor="busType" className="block mb-2 text-black">
              Bus Type
            </label>
            <select
              id="busType"
              className="w-full px-3 py-2 bg-gray-200 border rounded"
            ></select>
          </div>

          <div className="flex mb-4">
            <div className="w-1/2 me-4">
              <FormInput
                label="Route name"
                htmlFor="routename"
                type="text"
                id="routename"
              ></FormInput>
            </div>

            <div className="w-1/2">
              <FormInput
                label="Rote number"
                htmlFor="routenumber"
                type="text"
                id="routenumber"
              ></FormInput>
            </div>
          </div>

          <div className="flex mb-4">
            <div className="w-1/2 me-4">
              <FormInput
                label="Begining"
                htmlFor="begining"
                type="text"
                id="begining"
              ></FormInput>
            </div>

            <div className="w-1/2">
              <FormInput
                label="Destination"
                htmlFor="destination"
                type="text"
                id="destination"
              ></FormInput>
            </div>
          </div>

          <div className="mb-4">
            <FormInput
              label="Intermediate Stops"
              htmlFor="intermediateStops"
              type="text"
              id="intermediateStops"
            ></FormInput>
          </div>

          <div className="mb-4">
            <FormInput
              label="Distance"
              htmlFor="distance"
              type="text"
              id="distance"
            ></FormInput>
          </div>

          <div className="mb-4">
            <FormInput
              label="Travel Time"
              htmlFor="travelTime"
              type="text"
              id="travelTime"
            ></FormInput>
          </div>

          <div className="mb-4">
            <FormInput
              label="Schedule"
              htmlFor="schedule"
              type="text"
              id="schedule"
            ></FormInput>
          </div>

          <Button type="submit" name="Submit"></Button>
        </form>
      </div>
    </div>
  );
};

export default AddBusRoutes;
