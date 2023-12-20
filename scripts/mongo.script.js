import mongoose from "mongoose";
import { config } from "../src/config/config.js";
import { productsModel } from "../src/dao/mongo/models/products.model";

await mongoose.connect(config.mongo.url);

export const updateProduct = async () => {
  try {
    const adminId = "655536af15419c371f36121d";
    const result = await productsModel.updateMany(
      {},
      { $set: { owner: adminId } }
    );
    console.log("result", result);
  } catch (error) {
    console.log(error.message);
  }
};
