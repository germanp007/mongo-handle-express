import { CartsController } from "./carts.controller";
import { ProductController } from "./products.controller";
import { UsersService } from "../service/users.service";

export const ProductController = new ProductController();
export const CartsController = new CartsController();
export const UsersService = new UsersService();
