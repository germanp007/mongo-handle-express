import { cartsDao } from "../dao/index.js";

export class CartsService {
  static getCarts() {
    return cartsDao.getCarts();
  }
  static getCartById(cartId) {
    return cartsDao.getCartById(cartId);
  }
  static createCart(newCart) {
    return cartsDao.createCart(newCart);
  }
  static addProduct(cartId, productId) {
    return cartsDao.addProduct(cartId, productId);
  }
  static deleteProduct(cartId, productId) {
    return cartsDao.deleteProductInCart(cartId, productId);
  }
  static deleteCart(cartId) {
    return cartsDao.deleteCart(cartId);
  }

  static updateProductQuantity(cartId, productId, newQuantity) {
    return cartsDao.updateProductQuantity(cartId, productId, newQuantity);
  }
}
