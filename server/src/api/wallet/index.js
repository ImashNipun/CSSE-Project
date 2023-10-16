import express from "express"
import walletController from "./v1/controller"

const wallet = express.Router();

wallet.use("/v1/wallet",walletController);

export default wallet;