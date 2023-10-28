import mongoose from "mongoose";

const topupSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    toppedup_user_id: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const topupModel = mongoose.model("Topups", topupSchema);

export default topupModel;
