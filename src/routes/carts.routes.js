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

router.put("/:cid/product/:pid", async (req, res) => {
  try {
    const { cid: cartId, pid: productId } = req.params;
    
    const cart = await cartsServices.getCartById(cartId);
    
    const result = await cartsServices.addProduct(cartId, productId);
    res.json({ status: "succes", result });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});
router.delete("/:cid",async (req,res)=>{
  try {
    const cartId = req.params.cid;
    const result = await cartsServices.deleteCart(cartId);
    res.json({status: 'success', data: result})
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
})
router.delete('/:cid/products/:pid', async(req,res)=>{
  try {
    const {cid:cartId, pid:productId} = req.params;
    console.log(cartId,productId)
    const cart = await cartsServices.deleteProduct(cartId,productId);
    res.json({status: 'success', data:cart})
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }

})
router.put('/:cid/products/:pid', async(req,res)=>{
  try {
      const {cid:cartId,pid:productId} = req.params;
      const {newQuantity} = req.body;
      const result = await cartsServices.updateProductQuantity(cartId,productId,newQuantity);
      res.json({ status: "success", data: result });
  } catch (error) { 
    res.json({ status: "error", message: error.message });
  }
})
export { router as routerCarts };
