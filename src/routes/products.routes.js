import { Router } from "express";
import express from "express";
import { uploader } from "../utils.js";
import { ProductController } from "../controller/index.js";
const router = Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/", ProductController.getProducts);

router.get("/:id", ProductController.getProductById);

router.post(
  "/",
  uploader.single("thumbnail"),
  ProductController.createProducts
);

router.put("/:productId", ProductController.updateProduct);

router.delete("/:productId", ProductController.delete);
export { router as routerProducts };
