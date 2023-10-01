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
  async createCart(cart) {
    try {
      console.log("createCart", cart);
      const result = await this.mondel.create(cart);
      console.log("result", result);
      return result;
    } catch (error) {
      throw new Error("No se pudo crear el carrito");
    }
  }
  // async getCartById() {}
  // async updateCart(id, cart) {}
  // async deleteCart() {}
}
