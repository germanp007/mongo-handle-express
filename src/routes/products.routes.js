import { Router } from "express";
import express from "express";
import { productsManager } from "../dao/index.js";
import { uploader } from "../utils.js";
const router = Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/", async (req, res) => {
  const limit = parseInt(req.query.limit);
  const productList = await productsManager.getProducts();

  if (!isNaN(limit)) {
    let result;
    if (limit > productList.length) {
      res.json({ message: "Limite excedido" });
    } else {
      result = productList.slice(0, limit);
      res.json({ data: result });
    }
  } else {
    res.json({ data: productList });
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
  const { title, description, code, price, stock, category } = req.body;
  const thumbnail = req.file.filename;
  console.log(thumbnail);
  try {
    await productsManager.addProduct(
      title,
      description,
      code,
      price,
      stock,
      category,
      thumbnail
    );

    if (!title || !description || !code || !price || !stock || !category) {
      throw new Error("Faltan datos");
    } else {
      //io.emit("imageUploaded", { filename: req.file.originalname });
      res.status(200).json({ message: "Producto agregado correctamente" });
    }
  } catch (error) {
    res.status(422).json({ error: "Hubo un error al llenar los campos" });
  }
});

router.put("/:productId", async (req, res) => {
  const productId = parseInt(req.params.productId);
  const bodyReq = req.body;
  await productsManager.updateProduct(productId, bodyReq);
  res.json({ message: "Producto modificado" });
});

router.delete("/:productId", async (req, res) => {
  const id = parseInt(req.params.productId);
  await productsManager.deleteProduct(id);
  res.json({ message: "Producto borrado correctamente" });
});
export { router as routerProducts };
