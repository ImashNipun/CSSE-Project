import mongoose from "mongoose";

const fareCycleSchema = new mongoose.Schema({
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