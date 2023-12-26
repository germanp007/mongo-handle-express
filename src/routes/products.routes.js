import { Router } from "express";
import express from "express";
import { uploader } from "../utils.js";
import { ProductsController } from "../controller/products.controller.js";
import { checkAuthenticated, checkRole } from "../middlewares/errors/auth.js";
const router = Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/", ProductsController.getProducts);

router.get("/:id", ProductsController.getProductById);

router.post(
  "/",
  checkAuthenticated,
  checkRole(["admin", "superadmin", "premium"]),
  ProductsController.createProducts
);

router.put("/:productId", ProductsController.updateProduct);

router.delete(
  "/:productId",
  checkRole(["admin", "premium"]),
  ProductsController.deleteProduct
);

export { router as routerProducts };
