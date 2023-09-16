import { Router } from "express";
import path from "path";
import { __dirname } from "../utils.js";
import fs from "fs";

let products = JSON.parse(
  fs.readFileSync(path.join(__dirname, "/files/productList.json"))
);
const router = Router();

router.get("/", (req, res) => {
  // para renderizar motores de plantillas
  let data = {
    products: products,
  };
  res.render("home", data);
});
router.get("/agregar", (req, res) => {
  res.render("agregar");
});
router.get("/realtimeproducts", (req, res) => {
  let data = {
    products: products,
  };
  res.render("realTime", data);
});

export { router as viewsRouter };
