import mongoose from "mongoose";

const fareCycleSchema = new mongoose.Schema({
  type: {
    type: mongoose.Schema.Types.ObjectId, // Reference to FareCycle model
    ref: "BusType",
    required: true,
  },
  fare: [
    {
      no: Number,
      price: Number,
    },
  ],
});

const fareCycleModel = mongoose.model("FareCycle", fareCycleSchema);

export default fareCycleModel;
