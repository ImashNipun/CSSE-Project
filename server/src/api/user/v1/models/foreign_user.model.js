import mongoose from "mongoose";

const foreignUserSchema = new mongoose.Schema({
  user_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  temp_id: {
    type: String,
    required: true,
  },
  user_type: {
    type: String,
    default: "foreign",
  },
  transaction_id: {
    type: String,
    required: true,
  },
});

const foreignUserModel = mongoose.model("Foreign_Users", foreignUserSchema);

export default foreignUserModel;
