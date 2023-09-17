import express from "express";
import { engine } from "express-handlebars";
import { routerProducts } from "./routes/products.routes.js";
import { routerCart } from "./routes/carts.routes.js";
import { viewsRouter } from "./routes/views.routes.js";
import { __dirname } from "./utils.js";
//import { ProductManager } from "./persistencia/files/productManager.js";
import { Server } from "socket.io";
import path from "path";
import { productsManager } from "./persistencia/index.js";

const server = express();
const PORT = 3000;

// Server con HTTP
const httpServer = server.listen(PORT, () => console.log("Servidor activo"));

// Server con Socket.io
const io = new Server(httpServer);

// Midlewares
server.use(express.urlencoded({ extended: true })); // para formularios
server.use(express.json()); // para q el server interprete archivos JSON

// Para tener acceso a todo en carpeta public como css, imagenes, etc...
server.use(express.static(path.join(__dirname, "/public")));

//Configurando handlebars
server.engine(".hbs", engine({ extname: ".hbs" }));
server.set("view engine", ".hbs");
server.set("views", path.join(__dirname, "/views"));
server.use(express.static(path.join(__dirname, "/public/images")));

/////          Routers
server.use(viewsRouter);
server.use("/api/products", routerProducts);
server.use("/api/carts", routerCart);

// Socket server
io.on("connection", async (socket) => {
  const products = await productsManager.getProducts();
  socket.emit("productList", products);
  socket.on("addProduct", async (getting) => {
    await productsManager.addProduct(
      getting.title,
      getting.description,
      getting.code,
      getting.price,
      getting.stock,
      getting.category,
      getting.thumbnail
    );
    const productsData = await productsManager.getProducts();
    io.emit("productList", productsData);
  });
  socket.on("deleteProduct", async (getting) => {
    console.log(typeof getting);
    await productsManager.deleteProduct(getting);
    const productList = await productsManager.getProducts();
    io.emit("productList", productList);
  });
});
