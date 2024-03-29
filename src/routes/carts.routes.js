import { Router } from "express";
import { cartsDao, productDao } from "../dao/index.js";
import { CartsController } from "../controller/carts.controller.js";
//import { TicketsController } from "../controller/ticket.controller.js";

const router = Router();

router.get("/", CartsController.getCarts);

router.get("/:cid", CartsController.getCartById);

router.post("/", CartsController.createCart);

router.put("/:cid/product/:pid", CartsController.addProduct);

router.delete("/:cid", CartsController.deleteCart);

router.delete("/:cid/products/:pid", CartsController.deleteProductInCart);

router.put("/:cid/products/:pid", CartsController.updateProductQuantity);

router.post("/:cid/purchase", CartsController.purchaseCart);
export { router as routerCarts };
