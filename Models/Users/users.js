import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  isAccountVerified: { type: Boolean, default: false },
});

export const userModel = mongoose.model("userModel", userSchema);
