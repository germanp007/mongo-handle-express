import fs from "fs";

export class ProductManager {
  constructor(filePath) {
    this.filePath = filePath;
  }
  async addProduct(
    title,
    description,
    code,
    price,
    stock,
    category,
    thumbnail
  ) {
    try {
      if (!title || !description || !code || !price || !stock || !category) {
        throw new Error("Faltan campos por llenar");
      }
      if (fs.existsSync(this.filePath)) {
        let productsJSON = await fs.promises.readFile(this.filePath, "utf-8");
        const productData = JSON.parse(productsJSON);
        if (productData.some((element) => element.code === code)) {
          throw new Error(`This code ${code} already exists, try another one`);
        }

        let images = [];
        if (thumbnail) {
          images.push(...thumbnail);
        }

        const newId =
          productData.length > 0
            ? productData[productData.length - 1].id + 1
            : 1;
        const newProduct = {
          id: newId,
          title,
          description,
          price,
          category,
          thumbnail: images,
          status: true,
          code,
          stock,
        };
        productData.push(newProduct);
        await fs.promises.writeFile(
          this.filePath,
          JSON.stringify(productData, null, 2)
        );
        console.log("Product Added");
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  async updateProduct(id, fields) {
    try {
      let productList = await this.getProducts();
      const productIndex = productList.findIndex((ele) => ele.id === id);
      if (productIndex === -1) {
        console.log(`Product with ID ${id} not found`);
      }
      const productUpdated = {
        id,
        ...productList[productIndex],
        ...fields,
      };
      productList[productIndex] = productUpdated;
      await fs.promises.writeFile(
        this.filePath,
        JSON.stringify(productList, null, 2)
      );
      console.log("Product Updated");
    } catch (error) {
      console.log(error);
    }
  }
  async getProducts() {
    try {
      if (fs.existsSync(this.filePath)) {
        const data = await fs.promises.readFile(this.filePath, "utf-8");
        const productList = JSON.parse(data);

        return productList;
      }
    } catch (error) {
      console.log(error);
    }
  }
  async deleteProduct(id) {
    try {
      const dataJSON = await this.getProducts();
      const productList = dataJSON.filter((ele) => ele.id !== id);

      await fs.promises.writeFile(
        this.filePath,
        JSON.stringify(productList, null, 2)
      );
      console.log("Product deleted");
    } catch (error) {
      console.log(error);
    }
  }
  async getProductById(id) {
    try {
      if (fs.existsSync(this.filePath)) {
        const productList = await this.getProducts();
        let product = productList.find((element) => element.id == id);
        if (product) {
          return product;
        } else {
          throw new Error("Product not found");
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  }
}
