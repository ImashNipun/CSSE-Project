import express from "express";
import auth from "./auth";
import busType from "./bus-type";
import fareCycle from "./fare-cycle"
import busRoute from "./bus-routes";

const route = express.Router();

route.use(auth);
route.use(busType);
route.use(fareCycle);
route.use(busRoute);

export default route;
