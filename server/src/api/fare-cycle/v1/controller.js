import express from "express";
import FareCycle from "./models/fare_cycle.model";
import { response } from "../../../utils";
import asyncHandler from "express-async-handler";

const router = express.Router();

// Create a new fare cycle
router.post(
  "/",
  asyncHandler(async (req, res) => {
    try {
      const fareCycle = req.body;

      const newFareCycle = await FareCycle.create(fareCycle);

      return response({
        res,
        status: 201,
        message: "New fare cycle created successfully!",
        data: newFareCycle,
      });
    } catch (error) {
      // Handle errors and return appropriate responses
      return response({
        res,
        status: 500,
        message: "An error occurred while creating a fare cycle",
        error: error.message,
      });
    }
  })
);

// Get all fare cycles
router.get(
  "/",
  asyncHandler(async (req, res) => {
    try {
      const allFareCycles = await FareCycle.find().lean();

      return response({
        res,
        status: 200,
        data: allFareCycles,
      });
    } catch (error) {
      // Handle errors and return appropriate responses
      return response({
        res,
        status: 500,
        message: "An error occurred while fetching fare cycles",
        error: error.message,
      });
    }
  })
);

// Get one fare cycle
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
      const singleFareCycle = await FareCycle.findById(id).lean();

      if (singleFareCycle) {
        return response({
          res,
          status: 200,
          data: singleFareCycle,
        });
      } else {
        return response({
          res,
          status: 404,
          message: "Fare cycle not found",
        });
      }
    } catch (error) {
      // Handle errors and return appropriate responses
      return response({
        res,
        status: 500,
        message: "An error occurred while fetching the fare cycle",
        error: error.message,
      });
    }
  })
);

// Update a fare cycle
router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const fareCycle = req.body;

    try {
      const updateFareCycle = await FareCycle.findByIdAndUpdate(
        id,
        fareCycle
      ).lean();

      if (updateFareCycle) {
        return response({
          res,
          status: 200,
          message: "Fare cycle updated successfully!",
          data: updateFareCycle,
        });
      } else {
        return response({
          res,
          status: 404,
          message: "Fare cycle not found",
        });
      }
    } catch (error) {
      // Handle errors and return appropriate responses
      return response({
        res,
        status: 500,
        message: "An error occurred while updating the fare cycle",
        error: error.message,
      });
    }
  })
);

// Delete a fare cycle
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
      const deleteFareCycle = await FareCycle.findByIdAndDelete(id);

      if (deleteFareCycle) {
        return response({
          res,
          status: 200,
          message: "Fare cycle deleted successfully!",
        });
      } else {
        return response({
          res,
          status: 404,
          message: "Fare cycle not found",
        });
      }
    } catch (error) {
      // Handle errors and return appropriate responses
      return response({
        res,
        status: 500,
        message: "An error occurred while deleting the fare cycle",
        error: error.message,
      });
    }
  })
);

export default router;
