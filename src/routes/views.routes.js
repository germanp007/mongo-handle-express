import { Router } from "express";
import { __dirname } from "../utils.js";
import { ViewController } from "../controller/view.controller.js";
import { logger } from "../helpers/logger.js";

const router = Router();

router.get("/", ViewController.getProductsView);

router.get("/agregar", ViewController.addProductView);

router.get("/realtimeproducts", ViewController.realTimeView);

router.get("/messages", async (req, res) => {
  if (!req.user) {
    return res.redirect("/login");
  }
  const admin = req.user.rol === "admin" ? true : false;
  return res.render("chats", { admin });
});
router.get("/products", ViewController.getProductPaginate);

router.get("/cart", ViewController.getCartByIdView);

router.get("/signup", ViewController.signupView);
router.get("/login", ViewController.loginView);
router.get("/profile", ViewController.profileView);

export { router as viewsRouter };
