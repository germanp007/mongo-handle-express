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
  async createCart() {
    try {
      const cart = {}
      const result = await this.model.create(cart);
     
      return result;
    } catch (error) {
      throw new Error("No se pudo crear el carrito");
    }
  }
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
}
