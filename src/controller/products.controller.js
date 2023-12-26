import { logger } from "../helpers/logger.js";
import { productCreateError } from "../service/errors/productCreateError.service.js";
import { ProductsService } from "../service/products.service.js";

export class ProductsController {
  static getProducts = async (req, res) => {
    try {
      const products = await ProductsService.getProducts();

      res.send({ status: "success", data: products });
    } catch (error) {
      res.send({
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
      const productInfo = req.body;
      productInfo.owner = req.user._id;
      if (
        !productInfo.title ||
        !productInfo.description ||
        !productInfo.code ||
        !productInfo.price ||
        !productInfo.category
      ) {
        CustomError.createError({
          name: "Error al crear producto",
          cause: productCreateError(req.body),
          message: "Algunos datos fueron invalidos al crear el producto",
          code: EError.INVALID_BODY_JSON,
        });
        logger.error("Error al crear producto");
      }
      await ProductsService.createProducts(productInfo);
      logger.info("Producto creado con exito");
      res.json({ status: "success", data: productInfo });
    } catch (error) {
      res.status(422).json({ status: "error", message: error.message });
    }
  };

  static updateProduct = async (req, res) => {
    const productId = req.params.productId;
    const bodyReq = req.body;
    const result = await ProductsService.updateProduct(productId, bodyReq);
    logger.info("Producto actualizado exitosamente");
    res.json({
      status: "success",
      data: result,
      message: "Producto modificado",
    });
  };

  static deleteProduct = async (req, res) => {
    try {
      const id = req.params.productId;
      const product = await ProductsService.getProductById(id);
      if (
        (req.user.rol === "premium" &&
          product.owner.toString() === req.user._id.toString()) ||
        req.user.rol === "admin"
      ) {
        const result = await ProductsService.deleteProduct(id);
        logger.info("Producto eliminado exitosamente");
        res.json({
          status: "success",
          data: result,
          message: "Producto borrado correctamente",
        });
      } else {
        res.json({
          status: "error",
          message: "No tienes permiso para borrar este producto",
        });
      }
    } catch (error) {
      res.status.json({ status: "error", message: error.message });
    }
  };
}
