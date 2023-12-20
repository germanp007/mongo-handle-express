import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productsCollection = "products";
const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["Calzado", "Ropa", "Tecnologia", "Deportes"],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    refer: "users",
  },
  thumbnail: String,
});

productSchema.plugin(mongoosePaginate);
export const productsModel = mongoose.model(productsCollection, productSchema);
