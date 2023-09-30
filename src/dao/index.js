import { ProductManager } from "../dao/files/productManager.js";
import { CartManager } from "../dao/files/cartManager.js";
import { __dirname } from "../utils.js";
import path from "path";
import { ProductManagerMongo } from "./mongo/productsManagerMongo.js";
//import { CartsManagerMongo } from "./mongo/cartManagerMongo.js";

export const productsManager = new ProductManager(
  path.join(__dirname, "files/productList.json")
);
export const cartsManager = new CartManager(
  path.join(__dirname, "files/carts.json")
);

export const productServices = new ProductManagerMongo();
