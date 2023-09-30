import { ProductManager } from "../dao/files/productManager.js";
import { CartManager } from "../dao/files/cartManager.js";
import { __dirname } from "../utils.js";
import path from "path";

export const productsManager = new ProductManager(
  path.join(__dirname, "files/productList.json")
);
export const cartsManager = new CartManager(
  path.join(__dirname, "files/carts.json")
);
