import e, { Router } from "express";
import path from "path";
import { productDao, cartsDao } from "../dao/index.js";
import { __dirname } from "../utils.js";

const router = Router();

router.get("/", async (req, res) => {
  const products = await productDao.getProducts();
  if (!req.session.name) {
    return res.redirect("/login");
  }
  let admin = req.session.rol == "admin" ? true : false;
  res.render("home", { products: products, admin });
});
router.get("/agregar", async (req, res) => {
  let admin = req.session.rol == "admin" ? true : false;
  res.render("agregar", { admin });
});
router.get("/realtimeproducts", async (req, res) => {
  let admin = req.session.rol == "admin" ? true : false;
  res.render("realTime", { admin });
});
router.get("/messages", async (req, res) => {
  res.render("chats");
});
router.get("/products", async (req, res) => {
  if (req.session.name) {
    const limit = req.query.limit || 5;
    const page = req.query.page || 1;
    const productList = await productDao.getProductPaginate(limit, page);
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
      message: `Bienvenido ${req.session.name}`,
    });
  } else {
    res.render("products", {
      error: "Debes iniciar session para ver la lista de productos",
    });
  }
});
router.get("/cart", async (req, res) => {
  const cart = await cartsDao.getCartById("65256d089d331a04303ef2ec");
  const cartList = cart.products;
  console.log("carrito", cartList);
  res.render("cart", { cartList });
});

router.get("/signup", (req, res) => {
  if (req.session.name) {
    return res.redirect("/products");
  }
  res.render("signup");
});
router.get("/login", (req, res) => {
  if (req.session.name) {
    return res.redirect("/products");
  }
  res.render("login");
});
export { router as viewsRouter };
