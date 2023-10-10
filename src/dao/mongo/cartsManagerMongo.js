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
      const carts = await this.model
        .findById(cartId)
        .populate("products.productId");
      return carts;
    } catch (error) {
      throw new Error(
        "getCartById:",
        "No se pudo obtener el carrito seleccionado"
      );
    }
  }

  async createCart(newCart) {
    try {
      const result = await this.model.create(newCart);
      return result;
    } catch (error) {
      throw new Error("No se pudo crear el carrito");
    }
  }

  async addProduct(cartId, productId) {
    try {
      const cart = await this.getCartById(cartId);
      const existingProduct = cart.products.find(
        (product) => product.productId._id == productId
      );
      console.log(existingProduct);

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        const newProductCart = {
          productId: productId,
          quantity: 1,
        };

        cart.products.push(newProductCart);
      }

      const result = await this.model.findByIdAndUpdate(cartId, cart, {
        new: true,
      });
      return result;
    } catch (error) {
      throw new Error("No se pudo agregar el producto al carrito");
    }
  }

  async deleteProduct(cartId, productId) {
    try {
      const cart = await this.getCartById(cartId);
      const productExist = cart.products.find(
        (ele) => ele.productId._id == productId
      );
      if (productExist) {
        const newProducts = cart.products.filter(
          (ele) => ele.productId._id != productId
        );
        cart.products = newProducts;
        const result = await this.model.findByIdAndUpdate(cartId, cart, {
          new: true,
        });
        return result;
      }
    } catch (error) {
      throw new Error("DeleteProduct: el producto no ha sido agregado");
    }
  }

  async deleteCart(cartId) {
    try {
      const result = await this.model.findByIdAndDelete({ _id: cartId });
      return result;
    } catch (error) {
      throw new Error("No se pudo borrar el cart seleccionado");
    }
  }

  async updateProductQuantity(cartId, productId, newQuantity) {
    try {
      const cart = await this.getCartById(cartId);
      const productIndex = cart.products.findIndex(
        (ele) => ele.productId._id == productId
      );
      if (productIndex >= 0) {
        cart.products[productIndex].quantity = newQuantity;
        const result = await this.model.findByIdAndUpdate(cartId, cart, {
          new: true,
        });
        return result;
      } else {
        throw new Error(
          "El producto no se puede actualizar porque no ha sido agregado"
        );
      }
    } catch (error) {
      throw new Error("No se pudo actualizar el cart seleccionado");
    }
  }
}
