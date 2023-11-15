import { ProductsService } from "../service/products.service.js";

export class ProductController {
  static getProducts = async (req, res) => {
    try {
      const products = await ProductsService.getProducts();

      res.json({ status: "success", data: products });
    } catch (error) {
      res.json({
        status: "error",
        message: error.message,
      });
    }
  };
  static getProductById = async (req, res) => {
    const productId = +req.params.id;
    const product = await ProductsService.getProductById(productId);
    if (product) {
      res.json({ data: product });
    } else {
      res.json({ error: "Producto no encontrado" });
    }
  };

  static createProducts = async (req, res) => {
    try {
      const product = req.body;
      await ProductsService.createProducts(product);

      res.json({ status: "success", data: product });
    } catch (error) {
      res.status(422).json({ status: "error", message: error.message });
    }
  };
}
