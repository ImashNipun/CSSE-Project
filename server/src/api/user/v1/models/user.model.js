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
  user_address: {
    type: String,
  },
  user_contact: {
    type: String,
  },  
  user_image: {
    type: String,
  },
  user_bio: {
    type: String,
  },
});

const userModel = mongoose.model('Users' ,userSchema);

export default userModel; 