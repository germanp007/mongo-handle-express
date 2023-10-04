import { cartsModel } from "./models/carts.model.js";
export class CartsManagerMongo {
  constructor() {
    this.model = cartsModel;
  }

  async getCarts() {
    try {
      const carts = await this.model.find();
      return carts;
    } catch (error) {
      throw new Error("getCarts:", "No se pudo obtener la lista de carritos");
    }
  }
<<<<<<< HEAD
  async createCart(newCart) {
    console.log(newCart);
    try {
      const result = await this.model.create(newCart);
=======
  async createCart() {
    try {
      const cart = {}
      const result = await this.model.create(cart);
     
>>>>>>> 6bd08a9b57f3c532f2e37d95e32079dd8edb8186
      return result;
    } catch (error) {
      throw new Error("No se pudo crear el carrito");
    }
  }
<<<<<<< HEAD

  async addProduct(cartId, productId) {
    try {
      const result = await this.model.findById(cartId);
      result.products.push(productId);
      result.save();
      return result;
    } catch (error) {
      throw new Error("No se encontro el producto seleccionado");
    }
  }

  async getCartPopulate(cartId) {
    try {
      let populateProducts = await this.model
        .findById(cartId)
        .populate("products");
      return populateProducts;
    } catch (error) {
      throw new Error("No se encontro el cart seleccionado");
    }
  }
=======
  async getCartById(cartId) {
    try{
      const result = await this.model.findById(cartId);
      return result;
    }catch(error){
      throw new Error("No se pudo encontrar el carrito")
    }
  }
  // async updateCart(id, cart) {}
  // async deleteCart() {}
>>>>>>> 6bd08a9b57f3c532f2e37d95e32079dd8edb8186
}
