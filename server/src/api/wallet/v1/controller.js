import express from "express";
import Paypal from "./models/paypal_topup.model"; // Import the Transaction model
import Topup from "./models/topup.model";
import Refund from "./models/refund.model";
import User from "../../user/v1/models/user.model";
import Foreign from "../../user/v1/models/foreign_user.model";
import { response } from "../../../utils/response";

const app = express.Router();

app.post("/paypal/topup", async (req, res) => {
  const payload = req.body;
  const transaction = await Paypal.create(payload);
  response({
    res,
    status: 201,
    message: "New transaction created successfully!",
  });
});

app.post("/shop/topup", async (req, res) => {
  const { user_id, user_type, transaction_id, amount } = req.body;

  let toppedup_user_id = null;
  if (user_type == "local") {
    toppedup_user_id = await User.findOne({
      transaction_id: transaction_id,
      user_type: "local",
    });
  } else if (user_type == "foreign") {
    toppedup_user_id = await Foreign.findOne({
      transaction_id: transaction_id,
      user_type: "foreign",
    });
  }

  if (!toppedup_user_id) {
    return response({
      res,
      status: 401,
      message: "No user exist with this transaction id",
    });
  }

  const payload = {
    user_id,
    amount,
    toppedup_user_id: toppedup_user_id._id,
  };

  const transaction = await Topup.create(payload);

  return response({
    res,
    status: 201,
    message: "New transaction created successfully!",
  });
});

app.post("/shop/refund", async (req, res) => {
  const { user_id, transaction_id, amount } = req.body;

  const shop_id = await User.findOne({
    transaction_id: transaction_id,
    user_type: "shop",
  });

  if (!shop_id) {
    return response({
      res,
      status: 401,
      message: "No user exist with this transaction id",
    });
  }

  const payload = {
    user_id,
    amount,
    shop_id: shop_id._id,
  };

  const transaction = await Refund.create(payload);
  response({
    res,
    status: 201,
    message: "New transaction created successfully!",
  });
});

app.get("/topup", async (req, res) => {
  const user_id = req.query.uid;
  const user_type = req.query.type;

  let transaction = [];

  if (user_type == "shop") {
    transaction = await Topup.find({
      user_id,
    });
  } else if (user_type == "local" || user_type == "foreign") {
    transaction = await Topup.find({
      toppedup_user_id: user_id,
    });
  }

  if (transaction.length == 0) {
    return response({
      res,
      status: 401,
      message: "No transaction exist with this user id",
    });
  }

  response({
    res,
    status: 200,
    message: "Transactions fetched successfully!",
    data: transaction,
  });
});

app.get("/refund", async (req, res) => {
  const user_id = req.query.uid;
  const user_type = req.query.type;

  console.log(user_id, user_type);

  let transaction = [];

  if (user_type == "local" || user_type == "foreign") {
    transaction = await Refund.find({
      user_id,
    });
  } else if (user_type == "shop") {
    transaction = await Refund.find({
      shop_id: user_id,
    });
  }

  if (transaction.length == 0) {
    return response({
      res,
      status: 401,
      message: "No transaction exist with this user id",
    });
  }

  response({
    res,
    status: 200,
    message: "Transactions fetched successfully!",
    data: transaction,
  });
});

app.get("/paypal/:uid", async (req, res) => {
  const user_id = req.params.uid;

  const transaction = await Paypal.find({
    user_id,
  });

  if (transaction.length == 0) {
    return response({
      res,
      status: 401,
      message: "No transaction exist with this user id",
    });
  }

  response({
    res,
    status: 200,
    message: "Transactions fetched successfully!",
    data: transaction,
  });
});

export default app;
