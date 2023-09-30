import { Router } from "express";
import { cartsManager, productsManager } from "../dao/index.js";
import express from "express";
const router = Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/", async (req, res) => {
  const cartsList = await cartsManager.getCarts();
  res.json({ data: cartsList });
});

router.get("/:cartId", async (req, res) => {
  try {
    const cartId = parseInt(req.params.cartId);
    const cartById = await cartsManager.getCartById(cartId);

    if (cartById) {
      res.json({ data: cartById });
    } else {
      res
        .status(400)
        .json({ status: "error", message: "el carrito no existe" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const cartCreated = await cartsManager.addCart();
    res.json({ status: "success", data: cartCreated });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const cid = +req.params.cid;
    const pid = +req.params.pid;

    if (cid && pid) {
      const product = await productsManager.getProductById(pid);

      if (product) {
        const data = await cartsManager.addProductToCart(cid, pid);

        res.json({ message: "producto agregado", data: data });
      } else {
        res.status(400).json({ message: "error al agregar el producto" });
      }
    } else {
      res.status(400).json({ message: "el carrito no existe" });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
});
export { router as routerCarts };
