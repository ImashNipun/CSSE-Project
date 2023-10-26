import mongoose from "mongoose";

const fareCycleSchema = new mongoose.Schema({
  type: {
    type: mongoose.Schema.Types.ObjectId, // Reference to FareCycle model
    ref: "BusType",
    required: true,
  },
  no: {
    type: Number,
    required: true,
  },
  fare: {
    type: Number,
    required: true,
  },
});

const fareCycleModel = mongoose.model("FareCycle", fareCycleSchema);

export default fareCycleModel;
