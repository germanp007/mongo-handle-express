import { productDao } from "../dao/index.js";

export class ProductsService {
  static getProductsPaginate(query, options) {
    return productDao.getProductPaginate(query, options);
  }
  static createProduct(infoProduct) {
    return productDao.createProducts(infoProduct);
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
