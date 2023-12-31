import mongoose from "mongoose";

const paypalSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    payment_id: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const paypalModel = mongoose.model("PayPal", paypalSchema);

export default paypalModel;
