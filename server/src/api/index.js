import express from "express";
import auth from "./auth";

import busType from "./bus-type";
import fareCycle from "./fare-cycle"
import busRoute from "./bus-routes";
import user from "./user";
import wallet from './wallet'


const route = express.Router();

route.use(auth);

route.use(busType);
route.use(fareCycle);
route.use(busRoute);
route.use(user);
route.use(wallet);


export default route;
