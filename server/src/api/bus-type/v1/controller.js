import express from "express";
import BusType from "./models/bus_type.model";
import { response } from "../../../utils";
import asyncHandler from "express-async-handler";

const router = express.Router();

// Create a new bus type
router.post(
  "/",
  asyncHandler(async (req, res) => {
    try {
      const busType = req.body;

      const newBusType = await BusType.create(busType);

      return response({
        res,
        status: 201,
        message: "New bus type created successfully!",
        data: newBusType,
      });
    } catch (error) {
      // Handle errors and return appropriate responses
      return response({
        res,
        status: 500,
        message: "An error occurred while creating a bus type",
        error: error.message,
      });
    }
  })
);

// Get all bus types
router.get(
  "/",
  asyncHandler(async (req, res) => {
    try {
      const allBusTypes = await BusType.find().lean();

      return response({
        res,
        status: 200,
        data: allBusTypes,
      });
    } catch (error) {
      // Handle errors and return appropriate responses
      return response({
        res,
        status: 500,
        message: "An error occurred while fetching bus types",
        error: error.message,
      });
    }
  })
);

// Get one bus type
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
      const singleBusType = await BusType.findById(id).lean();

      if (singleBusType) {
        return response({
          res,
          status: 200,
          data: singleBusType,
        });
      } else {
        return response({
          res,
          status: 404,
          message: "Bus type not found",
        });
      }
    } catch (error) {
      // Handle errors and return appropriate responses
      return response({
        res,
        status: 500,
        message: "An error occurred while fetching the bus type",
        error: error.message,
      });
    }
  })
);

// Update a bus type
router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const busType = req.body;

    try {
      const updateBusType = await BusType.findByIdAndUpdate(id, busType).lean();

      if (updateBusType) {
        return response({
          res,
          status: 200,
          message: "Bus type updated successfully!",
          data: updateBusType,
        });
      } else {
        return response({
          res,
          status: 404,
          message: "Bus type not found",
        });
      }
    } catch (error) {
      // Handle errors and return appropriate responses
      return response({
        res,
        status: 500,
        message: "An error occurred while updating the bus type",
        error: error.message,
      });
    }
  })
);

// Delete a bus type
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
      const deleteBusType = await BusType.findByIdAndDelete(id);

      if (deleteBusType) {
        return response({
          res,
          status: 200,
          message: "Bus type deleted successfully!",
        });
      } else {
        return response({
          res,
          status: 404,
          message: "Bus type not found",
        });
      }
    } catch (error) {
      // Handle errors and return appropriate responses
      return response({
        res,
        status: 500,
        message: "An error occurred while deleting the bus type",
        error: error.message,
      });
    }
  })
);

export default router;
