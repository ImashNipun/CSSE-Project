import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  user_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  user_type: {
    type: String,
    required: true,
  },
  transaction_id: {
    type: String,
    required: true,
  },
});

const userModel = mongoose.model('Users' ,userSchema);

export default userModel; 