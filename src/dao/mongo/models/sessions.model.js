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
    enum: ["admin", "user", "premium"],
    default: "user",
  },
  documents: {
    type: [
      {
        name: {
          type: String,
          required: true,
        },
        reference: {
          type: String,
          required: true,
        },
      },
    ],
    default: [],
  },
  last_connection: {
    type: Date,
    default: null,
  },
});

export const registerModel = mongoose.model(registerCollection, registerSchema);
