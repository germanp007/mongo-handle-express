import { ProductsService } from "../service/products.service.js";
import { CartsService } from "../service/carts.service.js";

export class ViewController {
  static getProductsView = async (req, res) => {
    const products = await ProductsService.getProducts();
    if (!req.session.name) {
      return res.redirect("/login");
    }
    let admin = req.session.rol == "admin" ? true : false;
    res.render("home", { products: products, admin });
  };
  static addProductView = async (req, res) => {
    let admin = req.session.rol == "admin" ? true : false;
    res.render("agregar", { admin });
  };
  static realTimeView = async (req, res) => {
    let admin = req.session.rol == "admin" ? true : false;
    res.render("realTime", { admin });
  };
  static getProductPaginate = async (req, res) => {
    if (req.session.name) {
      const limit = req.query.limit || 8;
      const page = req.query.page || 1;
      const productList = await ProductsService.getProductsPaginate(
        limit,
        page
      );
      const newList = {
        status: "success",
        payload: productList.docs,
        totalPages: productList.totalPages,
        page: productList.page,
        prevPage: productList.prevPage,
        nextPage: productList.nextPage,
        hasPrevPage: productList.hasPrevPage,
        hasNextPage: productList.hasNextPage,
        prevLink: productList.hasPrevPage
          ? `/products?page=${productList.prevPage}&limit=${limit}`
          : null,
        nextLink: productList.hasNextPage
          ? `/products?page=${productList.nextPage}&limit=${limit}`
          : null,
      };

      res.render("products", {
        newList,
      });
    } else {
      res.render("products", {
        error: "Debes iniciar session para ver la lista de productos",
      });
    }
  };

  static getCartByIdView = async (req, res) => {
    const cart = await CartsService.getCartById("65256d089d331a04303ef2ec");
    const cartList = cart.products;
    res.render("cart", { cartList });
  };
  static signupView = (req, res) => {
    if (req.session.name) {
      return res.redirect("/products");
    }
    res.render("signup");
  };
  static loginView = (req, res) => {
    if (req.session.name) {
      return res.redirect("/products");
    }
    res.render("login");
  };
  static profileView = (req, res) => {
    if (req.session.name) {
      const profile = req.session.name;
      const email = req.session.email;

      console.log(req.session);
      return res.render("profile", {
        message: `Bienvenido ${profile} ${email}`,
      });
    }
    return res.redirect("/login");
  };
}
