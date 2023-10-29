import mongoose from "mongoose";

const fareCycleSchema = new mongoose.Schema({
  type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BusType",
    required: true,
  },
  fare: [
    {
      no: Number,
      price: String,
    },
  ],
});

const fareCycleModel = mongoose.model("FareCycle", fareCycleSchema);

export default fareCycleModel;
