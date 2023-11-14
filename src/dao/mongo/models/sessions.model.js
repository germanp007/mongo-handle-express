import mongoose from "mongoose";

const registerCollection = "register";
const registerSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "carts",
  },
  rol: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

export const registerModel = mongoose.model(registerCollection, registerSchema);
