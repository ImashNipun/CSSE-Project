import mongoose from "mongoose";

const busTypeSchema = new mongoose.Schema({
  no: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

const busTypeModel = mongoose.model("BusType", busTypeSchema);

export default busTypeModel;
