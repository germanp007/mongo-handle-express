import { Router } from "express";
import path from "path";
import { productServices } from "../dao/index.js";
import { __dirname } from "../utils.js";
import fs from "fs";

// let products = JSON.parse(
//   fs.readFileSync(path.join(__dirname, "/files/productList.json"))
// );
const router = Router();

router.get("/", async (req, res) => {
  const products = await productServices.getProducts();

  console.log(products);
  res.render("home", { products: products });
});
router.get("/agregar", (req, res) => {
  res.render("agregar");
});
router.get("/realtimeproducts", async (req, res) => {
  res.render("realTime");
});
router.get("/messages", async (req, res) => {
  res.render("chats");
});
router.get("/products", async (req, res) => {
  const limit = req.query.limit || 5;
  const page = req.query.page || 1;
  const productList = await productServices.getProductPaginate(limit, page);
  const newList = {
    status: "success",
    payload: productList.docs,
    totalPages: productList.totalPages,
    page: productList.page,
    prevPage: productList.prevPage,
    nextPage: productList.nextPage,
    hasPrevPage: productList.hasPrevPage,
    hasNextPage: productList.hasNextPage,
    prevLink: productList.hasPrevPage
      ? `/products?page=${productList.prevPage}&limit=${limit}`
      : null,
    nextLink: productList.hasNextPage
      ? `/products?page=${productList.nextPage}&limit=${limit}`
      : null,
  };
  res.render("products", { newList });
});
export { router as viewsRouter };
