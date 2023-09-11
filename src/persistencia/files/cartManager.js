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
      if (this.fileExists()) {
        const data = await fs.promises.readFile(this.filePath, "utf-8");
        const cartsList = JSON.parse(data);

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
      const cartId = id;
      const carts = await this.getCarts();
      const result = carts.find((item) => item.id === cartId);

      if (result) {
        return result;
      } else {
        throw new Error("No existe el archivo");
      }
    } catch (error) {
      console.log("Error", error);
    }
  }
  async addProductToCart(cartId, productId) {
    try {
      if (this.fileExists()) {
        const cartList = await this.getCarts();
        console.log(cartList);
        const index = cartList.findIndex((ele) => ele.id === cartId);
        if (index !== -1) {
          let productIndex = cartList[index].products.findIndex(
            (ele) => ele.id === productId
          );

          if (productIndex !== -1) {
            cartList[index].products[productIndex].quantity++;
          } else {
            const newProduct = {
              id: productId,
              quantity: 1,
            };
            cartList[index].products.push(newProduct);
          }
        }
        await fs.promises.writeFile(
          this.filePath,
          JSON.stringify(cartList, null, 2)
        );
      } else {
        throw new Error("Carrito no encontrado");
      }
    } catch (error) {}
  }
}
