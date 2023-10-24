import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import { engine } from "express-handlebars";
import { routerProducts } from "./routes/products.routes.js";
import { routerCarts } from "./routes/carts.routes.js";
import { viewsRouter } from "./routes/views.routes.js";
import { routerSessions } from "./routes/sessions.routes.js";
import { __dirname } from "./utils.js";
import { conectionDB } from "./config/dbConection.js";
import { Server } from "socket.io";
import path from "path";
import passport from "passport";
import { initializePassport } from "./config/passport.config.js";
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

/// Conf Session
server.use(
  session({
    store: MongoStore.create({
      ttl: 180,
      mongoUrl:
        "mongodb+srv://germanp007:nati23032023@clustergap.ggconiz.mongodb.net/ecommerce?retryWrites=true&w=majority",
    }),
    secret: "secretGerman",
    resave: true,
    saveUninitialized: true,
  })
);

//// Conf Passport  // debe estar arriba de los routers
initializePassport();
server.use(passport.initialize());
server.use(passport.session());

/////          Routers
server.use(viewsRouter);
server.use("/api/products", routerProducts);
server.use("/api/carts", routerCarts);
server.use("/api/sessions", routerSessions);

// Socket server
io.on("connection", async (socket) => {
  const products = await productServices.getProducts();
  console.log("Cliente Conectado");
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
