import { Router } from "express";
import { cartsDao, productDao } from "../dao/index.js";
import { CartsController } from "../controller/carts.controller.js";

const router = Router();

router.get("/", CartsController.getCarts);

router.get("/:cid", CartsController.getCartById);

router.put("/:cid", async (req, res) => {
  const cartId = req.params.cid;
  const result = await cartsDao.getCartPaginate(cartId);
  res.json({ status: "success", data: result });
});
router.post("/", CartsController.createCart);

router.put("/:cid/product/:pid", CartsController.addProduct);

router.delete("/:cid", CartsController.deleteCart);

router.delete("/:cid/products/:pid", CartsController.deleteProductInCart);

router.put("/:cid/products/:pid", CartsController.updateProductQuantity);
export { router as routerCarts };
