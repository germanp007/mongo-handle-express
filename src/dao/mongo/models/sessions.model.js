import mongoose from "mongoose";

const registerCollection = "register";
const registerSchema = new mongoose.Schema({
    name: {
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
    unique: true,
  },
  rol:{
    type: String,
    enum: ["admin", "usuario"],
  }
});

export const registerModel = mongoose.model(registerCollection, registerSchema);