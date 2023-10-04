import mongoose from "mongoose";

const cartsCollection = "carts";
const cartSchema = new mongoose.Schema({
  products: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        required: true,
      },
    ],
    default: [],
  },
});

export const cartsModel = mongoose.model(cartsCollection, cartSchema);
