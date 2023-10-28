import mongoose from "mongoose";

const refundSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    shop_id: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const refundModel = mongoose.model("Refund", refundSchema);

export default refundModel;
