import express from "express";
import { engine } from "express-handlebars";
import { routerProducts } from "./routes/products.routes.js";
import { routerCart } from "./routes/carts.routes.js";
import { viewsRouter } from "./routes/views.routes.js";
import { __dirname } from "./utils.js";
import path from "path";
const server = express();
const PORT = 3000;

server.listen(PORT, () => console.log("Servidor activo"));

// Midlewares
server.use(express.urlencoded({ extended: true })); // para formularios
server.use(express.json()); // para q el server interprete archivos JSON

// Para tener acceso a todo en carpeta public como css, imagenes, etc...
server.use(express.static(path.join(__dirname, "/public")));

//Configurando handlebars
server.engine(".hbs", engine({ extname: ".hbs" }));
server.set("view engine", ".hbs");
server.set("views", path.join(__dirname, "/views"));

/////          Routers
server.use(viewsRouter);
server.use("/api/products", routerProducts);
server.use("/api/carts", routerCart);
