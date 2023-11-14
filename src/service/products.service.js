import { productDao } from "../dao/index.js";

export class ProductsService {
  static getProductsPaginate(query, options) {
    return productDao.getProductsPaginate(query, options);
  }
  static createProduct(infoProduct) {
    return productDao.createProduct(infoProduct);
  }
  static getProducts() {
    return productDao.getProducts();
  }
  static getProductById(prodcutId) {
    return productDao.getProductById(prodcutId);
  }
  static updateProduct(prodcutId, newProduct) {
    return productDao.updateProduct(prodcutId, newProduct);
  }
  static deleteProduct(prodcutId) {
    return productDao.deleteProduct(prodcutId);
  }
}
