import { Router } from "express";
//import { cartsManager, productsManager } from "../dao/index.js";
import { cartsServices, productServices } from "../dao/index.js";
import express from "express";

const router = Router();

router.get("/", async (req, res) => {
  const cartsList = await cartsServices.getCarts();
  res.json({ data: cartsList });
});
router.get("/:cid", async (req,res)=> {
  const cartId = req.params.cid;
  const result = await cartsServices.getCartById(cartId);
  res.json({status:"success", data: result});
})
router.post("/", async (req, res) => {
  try {
    const newCart = {};
    const cartCreated = await cartsServices.createCart(newCart);

    res.json({ status: "success", data: cartCreated });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
});

router.put("/addProduct", async (req, res) => {
  try {
    const { cartId, productId } = req.body;

    const result = await cartsServices.addProduct(cartId, productId);
    res.json({ status: "succes", data: result });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

router.get("/cartPop/:cartId", async (req, res) => {
  try {
    const { cartId } = req.params;
    const result = await cartsServices.getCartPopulate(cartId);
    res.json({ status: "success", data: result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
export { router as routerCarts };
