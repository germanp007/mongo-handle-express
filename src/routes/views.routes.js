import { Router } from "express";
import { __dirname } from "../utils.js";
import { ViewController } from "../controller/view.controller.js";

const router = Router();

router.get("/", ViewController.getProductsView);

router.get("/agregar", ViewController.addProductView);

router.get("/realtimeproducts", ViewController.realTimeView);

router.get("/messages", async (req, res) => {
  res.render("chats");
});
router.get("/products", ViewController.getProductPaginate);

router.get("/cart", ViewController.getCartByIdView);

router.get("/signup", ViewController.signupView);
router.get("/login", ViewController.loginView);
router.get("/profile", ViewController.profileView);
export { router as viewsRouter };
