import express from "express";
import fareCycleModel from "./models/fare_cycle.model";
import { response } from "../../../utils";
import asyncHandler from "express-async-handler";

const router = express.Router();

// Create a new fare cycle
router.post(
  "/",
  asyncHandler(async (req, res) => {
    try {
      const fareCycleData = req.body;

      const newFareCycle = await fareCycleModel.create(fareCycleData);

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

// Get all fare cycles with type populated
router.get(
  "/",
  asyncHandler(async (req, res) => {
    try {
      const allFareCycles = await fareCycleModel.find()
        .populate("type") // Populate the "type" field
        .lean();

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

// Get one fare cycle with type populated
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
      const singleFareCycle = await fareCycleModel.findById(id)
        .populate("type") // Populate the "type" field
        .lean();

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
    const fareCycleData = req.body;

    try {
      const updateFareCycle = await fareCycleModel.findByIdAndUpdate(
        id,
        fareCycleData,
        { new: true } // This option returns the updated document
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
      const deleteFareCycle = await fareCycleModel.findByIdAndDelete(id);

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

router.get(
  "/byType/:typeId",
  asyncHandler(async (req, res) => {
    const { typeId } = req.params;

    try {
      const allFareCycles = await fareCycleModel
        .find({ type: typeId }) // Filter by the provided type ID
        .populate("type")
        .lean();

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
        message: "An error occurred while fetching fare cycles by type",
        error: error.message,
      });
    }
  })
);

export default router;
