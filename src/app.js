import express from "express";
import { routerProducts } from "./routes/products.routes.js";
import { routerCart } from "./routes/carts.routes.js";
const server = express();
const PORT = 3000;

server.listen(PORT, () => console.log("Servidor activo"));
server.use(express.urlencoded({ extended: true }));
// server.use(express.json());
// app.use(express.urlencoded({ extended: true }));
server.use("/api/products", routerProducts);
server.use("/api/carts", routerCart);
