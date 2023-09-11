import fs from "fs";

export class CartManager {
  constructor(filePath) {
    this.filePath = filePath;
  }
  fileExists() {
    return fs.existsSync(this.filePath);
  }
  async getCarts() {
    try {
      if (fs.existsSync(this.filePath)) {
        const data = await fs.promises.readFile(this.filePath, "utf-8");
        const cartsList = JSON.parse(data);
        console.log(cartsList);
        return cartsList;
      }
    } catch (error) {
      console.log(error);
    }
  }
  async addCart() {
    try {
      if (this.fileExists()) {
        const carts = await fs.promises.readFile(this.filePath, "utf-8");
        const cartJson = JSON.parse(carts);
        const newCart = {
          id: cartJson.length > 0 ? cartJson[cartJson.length - 1].id + 1 : 1,
          products: [],
        };
        cartJson.push(newCart);
        await fs.promises.writeFile(
          this.filePath,
          JSON.stringify(cartJson, null, 2)
        );
      } else {
        throw new Error("Archivo no existente");
      }
    } catch (error) {
      console.log("Error", error);
    }
  }
  async getCartById(id) {
    try {
      if (this.fileExists()) {
        const carts = await fs.promises.readFile(this.filePath, "utf-8");
        const cartJson = JSON.parse(carts);
        const result = cartJson.find((item) => {
          item.id === id;
        });
        return result;
      } else {
        throw new Error("No existe el archivo");
      }
    } catch (error) {
      console.log("Error", error);
    }
  }
  deleteProduct() {}
}
