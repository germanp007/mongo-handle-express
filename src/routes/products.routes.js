import { Router } from "express";
import express from "express";
import { productDao } from "../dao/index.js";
import { uploader } from "../utils.js";
const router = Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/", async (req, res) => {
  try {
    const products = await productDao.getProducts();

    res.json({ status: "success", data: products });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  const productId = +req.params.id;
  const product = await productDao.getProductById(productId);
  if (product) {
    res.json({ data: product });
  } else {
    res.json({ error: "Producto no encontrado" });
  }
});

router.post("/", uploader.single("thumbnail"), async (req, res) => {
  try {
    const product = req.body;
    await productDao.createProducts(product);

    res.json({ status: "success", data: product });
  } catch (error) {
    res.status(422).json({ status: "error", message: error.message });
  }
});

router.put("/:productId", async (req, res) => {
  const productId = req.params.productId;
  const bodyReq = req.body;
  const result = await productDao.updateProduct(productId, bodyReq);
  res.json({ status: "success", data: result, message: "Producto modificado" });
});

router.delete("/:productId", async (req, res) => {
  const id = req.params.productId;
  const result = await productDao.deleteProduct(id);
  res.json({
    status: "success",
    data: result,
    message: "Producto borrado correctamente",
  });
});
export { router as routerProducts };
