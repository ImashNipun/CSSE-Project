import express from "express";
import busRouteController from "./v1/controller";

const busRoute = express.Router();

busRoute.use("/v1/busroute", busRouteController);

export default busRoute;
