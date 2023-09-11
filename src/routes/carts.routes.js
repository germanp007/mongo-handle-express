import { Router } from "express";
import { cartsManager } from "../persistencia/index.js";
import express from "express";
const router = Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const cartById = await cartsManager.getCartById(id);

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
export { router as routerCart };
