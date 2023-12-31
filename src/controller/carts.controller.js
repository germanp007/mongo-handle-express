import { CartsService } from "../service/carts.service.js";
import { ProductsService } from "../service/products.service.js";
import { v4 as uuidv4 } from "uuid";
import { TicketsService } from "../service/ticket.service.js";
import { CreateUserDto } from "../dao/dto/createUser.js";
import { logger } from "../helpers/logger.js";
export class CartsController {
  static getCarts = async (req, res) => {
    const cartsList = await CartsService.getCarts();
    logger.info("Lista de Carritos");
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
      logger.info("Carrito creado con exito");
      res.json({ status: "success", data: cartCreated });
    } catch (error) {
      logger.error("No se pudo crear el carrito de compras");
      res.status(400).json({ status: "error", message: error.message });
    }
  };
  static addProduct = async (req, res) => {
    try {
      const { cid: cartId, pid: productId } = req.params;
      const result = await CartsService.addProduct(cartId, productId);
      logger.info("Producto agregado al carrito exitosamente");
      res.json({ status: "succes", result });
    } catch (error) {
      logger.error("No se pudo agregar el producto");
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
      const cart = await CartsService.getCartById(cartId);

      if (cart.products.length > 0) {
        const ticketProducts = [];
        const rejectedProducts = [];

        for (let i = 0; i < cart.products.length; i++) {
          const cartProduct = cart.products[i];
          const productInfo = cartProduct.productId;

          if (cartProduct.quantity <= productInfo.stock) {
            ticketProducts.push(cartProduct);
          } else {
            rejectedProducts.push(cartProduct);
          }
        }
        logger.info("ticketProducts", ticketProducts);
        logger.info("rejectedProducts", rejectedProducts);
        const newTicket = {
          code: uuidv4(),
          purchase_date: new Date(),
          amount: ticketProducts.reduce(
            (acc, product) => product.productId.price * product.quantity + acc,
            0
          ),
          purchaser: req.session.email,
        };
        logger.info(newTicket);

        await TicketsService.createTicket(newTicket);

        if (rejectedProducts.length) {
          logger.error("No se pudo realizar la compra");
          res.json({
            message: "No se pudo realizar la compra, productos bajos de stock",
            data: rejectedProducts,
          });
        } else {
          logger.info("Compra realizada exitosamente");
          res.json({
            message: "Compra realizada exitosamente",
            data: ticketProducts,
          });
        }
      } else {
        logger.error("El carrito esta vacio");
        res.json({ status: "error", message: "El carrito esta vacio" });
      }
    } catch (error) {
      logger.error(error);
      res.json({ status: "error", message: error.message });
    }
  };
}
