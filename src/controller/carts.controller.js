import { CartsService } from "../service/carts.service.js";

export class CartsController {
  static getCarts = async (req, res) => {
    const cartsList = await CartsService.getCarts();
    res.json({ data: cartsList });
  };

  static getCartById = async (req, res) => {
    const cartId = req.params.cid;
    const result = await CartsService.getCartById(cartId);
    res.json({ status: "success", data: result });
  };

  static getCartPaginate = async (req, res) => {
    const cartId = req.params.cid;
    const result = await CartsService.getCartPaginate(cartId);
    res.json({ status: "success", data: result });
  };

  static createCart = async (req, res) => {
    try {
      const newCart = {};
      const cartCreated = await CartsService.createCart(newCart);

      res.json({ status: "success", data: cartCreated });
    } catch (error) {
      res.status(400).json({ status: "error", message: error.message });
    }
  };
  static addProduct = async (req, res) => {
    try {
      const { cid: cartId, pid: productId } = req.params;
      const result = await CartsService.addProduct(cartId, productId);
      res.json({ status: "succes", result });
    } catch (error) {
      res.json({ status: "error", message: error.message });
    }
  };
  static deleteCart = async (req, res) => {
    try {
      const cartId = req.params.cid;
      const result = await CartsService.deleteCart(cartId);
      res.json({ status: "success", data: result });
    } catch (error) {
      res.json({ status: "error", message: error.message });
    }
  };
  static deleteProductInCart = async (req, res) => {
    try {
      const { cid: cartId, pid: productId } = req.params;

      const cart = await CartsService.deleteProduct(cartId, productId);
      res.json({ status: "success", data: cart });
    } catch (error) {
      res.json({ status: "error", message: error.message });
    }
  };
  static updateProductQuantity = async (req, res) => {
    try {
      const { cid: cartId, pid: productId } = req.params;
      const { newQuantity } = req.body;
      const result = await CartsService.updateProductQuantity(
        cartId,
        productId,
        newQuantity
      );
      res.json({ status: "success", data: result });
    } catch (error) {
      res.json({ status: "error", message: error.message });
    }
  };
}
