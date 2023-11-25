import { ProductManager } from "./managers/files/productManager.js";
import { CartManager } from "./managers/files/cartManager.js";
import { __dirname } from "../utils.js";
import path from "path";
import { ProductManagerMongo } from "./mongo/productsManagerMongo.js";
import { CartsManagerMongo } from "./mongo/cartsManagerMongo.js";
import { ChatManagerMongo } from "./mongo/chatManagerMongo.js";
import { SessionManagerMongo } from "./mongo/sessionManagerMongo.js";
import { TicketManagerMongo } from "./mongo/ticketManagerMongo.js";
export const productsManager = new ProductManager(
  path.join(__dirname, "files/productList.json")
);
export const cartsManager = new CartManager(
  path.join(__dirname, "files/carts.json")
);

export const productDao = new ProductManagerMongo();
export const cartsDao = new CartsManagerMongo();
export const chatsDao = new ChatManagerMongo();
export const sessionDao = new SessionManagerMongo();
export const ticketDao = new TicketManagerMongo();
