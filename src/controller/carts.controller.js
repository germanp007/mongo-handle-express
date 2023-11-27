import { CartsService } from "../service/carts.service.js";
import { ProductsService } from "../service/products.service.js";
import { v4 as uuidv4 } from "uuid";
import { TicketsService } from "../service/ticket.service.js";
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
  static purchaseCart = async (req, res) => {
    try {
      const { cid: cartId } = req.params;
      const isCart = await CartsService.getCartById(cartId);
      //verificar el Stock de cada Producto

      if (isCart.products.length) {
        const ticketProduct = [];
        const rejectedProduct = [];
        for (let i = 0; i < isCart.products.length; i++) {
          // Bucle q funciona async
          const cartProduct = isCart.products[i];
          const productInfo = cartProduct.productId;
          console.log(productInfo);
          //Revisar cantidad de stock en Products List y comparar con cantidad en Cart
          if (cartProduct.quantity <= productInfo.stock) {
            ticketProduct.push(cartProduct);
          } else {
            rejectedProduct.push(cartProduct);
          }
        }
      }
      const newTicket = {
        code: uuidv4(),
        purchase_datetime: new Date(),
        amount: ticketProduct.reduce((acc, product) => acc + product.price, 0),
        purchaser: req.user.email,
      };
      console.log(newTicket);
      await TicketsService.createTicket(newTicket);
      //actualizar carrito con rejected products
      if (rejectedProduct.length) {
        res.json({
          message: "Estos productos no cumplen con el stock",
          data: rejectedProduct,
        });
      } else {
        res.json({ message: "Compra realizada con exito" });
      }
    } catch (error) {
      res.json({ status: "error", message: error.message });
    }
  };
}
