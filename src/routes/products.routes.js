import { Router } from "express";
import express from "express";
import { productServices } from "../dao/index.js";
import { productsManager } from "../dao/index.js";
import { uploader } from "../utils.js";
const router = Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/", async (req, res) => {
  try {
    const result = await productServices.getProducts();
    res.json({ status: "success", data: result });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  const productId = +req.params.id;
  const product = await productsManager.getProductById(productId);
  if (product) {
    res.json({ data: product });
  } else {
    res.json({ error: "Producto no encontrado" });
  }
});

router.post("/", uploader.single("thumbnail"), async (req, res) => {
  try {
    const product = req.body;
    console.log(product);
    //const thumbnail = req.file.filename;
    await productServices.createProducts(product);

    res.json({ status: "success", data: product });
  } catch (error) {
    res.status(422).json({ status: "error", message: error.message });
  }
});

router.put("/:productId", async (req, res) => {
  const productId = req.params.productId;
  const bodyReq = req.body;
  const result = await productServices.updateProduct(productId, bodyReq);
  res.json({ status: "success", data: result, message: "Producto modificado" });
});

router.delete("/:productId", async (req, res) => {
  const id = req.params.productId;
  const result = await productServices.deleteProduct(id);
  res.json({
    status: "success",
    data: result,
    message: "Producto borrado correctamente",
  });
});
export { router as routerProducts };
