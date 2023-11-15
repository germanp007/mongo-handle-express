import { Router } from "express";
import express from "express";
import { uploader } from "../utils.js";
import { ProductController } from "../controller/products.controller.js";
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

router.put("/:productId", async (req, res) => {
  const productId = req.params.productId;
  const bodyReq = req.body;
  const result = await ProductsService.updateProduct(productId, bodyReq);
  res.json({ status: "success", data: result, message: "Producto modificado" });
});

router.delete("/:productId", async (req, res) => {
  const id = req.params.productId;
  const result = await ProductsService.deleteProduct(id);
  res.json({
    status: "success",
    data: result,
    message: "Producto borrado correctamente",
  });
});
export { router as routerProducts };
