import { productsModel } from "./models/products.model.js";

export class ProductManagerMongo {
  constructor() {
    this.model = productsModel;
  }

  async createProducts(productData) {
    try {
      const result = await this.model.create(productData);

      return result;
    } catch (error) {
      console.log("createProduct", error.message);
      throw new Error("Error al crear el producto");
    }
  }
  async getProducts() {
    try {
      const result = await this.model.find();
      return result;
    } catch (error) {
      throw new Error("No se pudo optener la lista de productos");
    }
  }
  async getProductById(productID) {
    try {
      await this.model.findById(productID);
    } catch (error) {
      throw new Error("No existe un producto con ese ID");
    }
  }
  async getProductPaginate(limit, page) {
    try {
      const productsList = await this.model.paginate(
        {},
        { limit: limit, page: page, lean: true }
      );
      return productsList;
    } catch (error) {
      throw new Error(
        "getCatPaginate:",
        "No se pudo modificar el carrito seleccionado"
      );
    }
  }
  async updateProduct(productID, NewproductData) {
    try {
      const result = await this.model.findByIdAndUpdate(
        productID,
        NewproductData,
        { new: true }
      );
      return result;
    } catch (error) {
      throw new Error("No se pudo actualizar el producto");
    }
  }
  async deleteProduct(productID) {
    try {
      const result = await this.model.findByIdAndDelete(productID);
      if (!result) {
        throw new Error("No se pudo encontrar el producto");
      }
      return result;
    } catch (error) {
      throw new Error("No se pudo borrar el producto");
    }
  }
}
