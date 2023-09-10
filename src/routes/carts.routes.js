import { Router } from "express";

const router = Router();

let cart = [];

router.get("/", (req, res) => {
  res.json({ data: cart });
});
export { router as routerCart };
