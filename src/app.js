import express from "express";
import { engine } from "express-handlebars";
import { routerProducts } from "./routes/products.routes.js";
import { routerCarts } from "./routes/carts.routes.js";
import { viewsRouter } from "./routes/views.routes.js";
import { __dirname } from "./utils.js";
import { conectionDB } from "./config/dbConection.js";
import { Server } from "socket.io";
import path from "path";
import fs from "fs";
import {
  chatsServices,
  productServices,
  productsManager,
} from "./dao/index.js";

const server = express();
const PORT = 3000;
// Server con HTTP
const httpServer = server.listen(PORT, () => console.log("Servidor activo"));

// Server con Socket.io
const io = new Server(httpServer);

// Conexion BD
conectionDB();
// Midlewares
server.use(express.urlencoded({ extended: true })); // para formularios
server.use(express.json()); // para q el server interprete archivos JSON
// Para tener acceso a todo en carpeta public como css, imagenes, etc...
server.use(express.static(path.join(__dirname, "/public")));

//Configurando handlebars
server.engine(
  ".hbs",
  engine({
    extname: ".hbs",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
  })
);
server.set("view engine", ".hbs");
server.set("views", path.join(__dirname, "/views"));
server.use(express.static(path.join(__dirname, "/public")));

/////          Routers
server.use(viewsRouter);
server.use("/api/products", routerProducts);
server.use("/api/carts", routerCarts);

// Socket server
io.on("connection", async (socket) => {
  const products = await productServices.getProducts();
  socket.emit("productList", products);
  socket.on("addProduct", async (getting) => {
    await productServices.createProducts(getting);
    
    const productsData = await productServices.getProducts();
    io.emit("productList", productsData);
  });
  socket.on("deleteProduct", async (getting) => {
    await productServices.deleteProduct(getting);
    const productList = await productServices.getProducts();
    io.emit("productList", productList);
  });
});

io.on("connection", async (socket) => {
  let messagesHistory = await chatsServices.getMessages();

  socket.emit("messagesHistory", messagesHistory);
  socket.on("sendMessage", async (getting) => {
    console.log(getting);
    //await chatsServices.addMessage(getting);
  });
});
