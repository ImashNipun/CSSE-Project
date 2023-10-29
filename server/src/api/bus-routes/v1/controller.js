import express from "express";
import BusRoute from "./models/bus_route.model";
import { response } from "../../../utils";
import asyncHandler from "express-async-handler";

const router = express.Router();

// Create a new bus route
router.post(
  "/",
  asyncHandler(async (req, res) => {
    try {
      const busRouteData = req.body;
      const newBusRoute = await BusRoute.create(busRouteData);

      return response({
        res,
        status: 201,
        message: "New bus route created successfully!",
        data: newBusRoute,
      });
    } catch (error) {
      return response({
        res,
        status: 400,
        message: "An error occurred while creating a bus route",
      });
    }
  })
);

// Read all bus routes
router.get(
  "/",
  asyncHandler(async (req, res) => {
    try {
      const allBusRoutes = await BusRoute.find()
        .populate("busType")
        .populate("intermediateStops.fare")
        .lean();

      return response({
        res,
        status: 200,
        data: allBusRoutes,
      });
    } catch (error) {
      return response({
        res,
        status: 500,
        message: "An error occurred while fetching bus routes",
        error: error.message,
      });
    }
  })
);

// Read one bus route
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
      const singleBusRoute = await BusRoute.findById(id)
        .populate("busType")
        .populate("intermediateStops.fare")
        .lean();

      if (singleBusRoute) {
        return response({
          res,
          status: 200,
          data: singleBusRoute,
        });
      } else {
        return response({
          res,
          status: 404,
          message: "Bus route not found",
        });
      }
    } catch (error) {
      return response({
        res,
        status: 500,
        message: "An error occurred while fetching the bus route",
        error: error.message,
      });
    }
  })
);

// Update a bus route
router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updatedBusRouteData = req.body;

    try {
      const updatedBusRoute = await BusRoute.findByIdAndUpdate(id, updatedBusRouteData).lean();

      if (updatedBusRoute) {
        return response({
          res,
          status: 200,
          message: "Bus route updated successfully!",
          data: updatedBusRoute,
        });
      } else {
        return response({
          res,
          status: 404,
          message: "Bus route not found",
        });
      }
    } catch (error) {
      return response({
        res,
        status: 500,
        message: "An error occurred while updating the bus route",
        error: error.message,
      });
    }
  })
);

// Delete a bus route
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
      const deletedBusRoute = await BusRoute.findByIdAndDelete(id);

      if (deletedBusRoute) {
        return response({
          res,
          status: 200,
          message: "Bus route deleted successfully!",
        });
      } else {
        return response({
          res,
          status: 404,
          message: "Bus route not found",
        });
      }
    } catch (error) {
      return response({
        res,
        status: 500,
        message: "An error occurred while deleting the bus route",
        error: error.message,
      });
    }
  })
);

export default router;
