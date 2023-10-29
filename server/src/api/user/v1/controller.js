import express from "express";
import userModel from "./models/user.model";
import asyncHandler from "express-async-handler";
import { response } from "../../../utils";

const router = express.Router();

// get single user

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    try {
      const user = await userModel.findById(req.params.id);
      if (!user) {
        return res.status(404).send("User not found");
      }
      return response({
        res,
        data: user,
      });
    } catch (error) {
      res.status(500).send("Server error");
    }
  })
);

// DELETE route to delete a user by ID
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    try {
      const deletedUser = await userModel.findByIdAndDelete(req.params.id);
      if (!deletedUser) {
        return res.status(404).send("User not found");
      }
      return response({
        res,
        message: "User deleted successfully!",
      });
    } catch (error) {
      res.status(500).send("Server error");
    }
  })
);

// PUT route to update a user by ID
router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    try {
      const updatedUser = await userModel.findByIdAndUpdate(
        req.params.id,
        req.body,
      );
      if (!updatedUser) {
        return res.status(404).send("User not found");
      }
      return response({
        res,
        message: "User updated successfully!",
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
    }
  })
);

export default router;
