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
   async getCartById(cartId) {
    try {
      const carts = await this.model.findById(cartId);
      return carts;
    } catch (error) {
      throw new Error("getCartById:", "No se pudo obtener el carrito seleccionado");
    }
  }
  async createCart(newCart) {
    console.log(newCart);
    try {
      const result = await this.model.create(newCart);
      return result;
    } catch (error) {
      throw new Error("No se pudo crear el carrito");
    }
  }

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
}
