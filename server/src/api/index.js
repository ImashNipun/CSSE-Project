import express from "express";
import auth from "./auth";
import wallet from './wallet'

const route = express.Router();

route.use(auth);
route.use(wallet);

export default route;
