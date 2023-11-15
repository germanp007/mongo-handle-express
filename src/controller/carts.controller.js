import { CartsService } from "../service/carts.service";

export class CartsController {
  static getCarts = async (req, res) => {
    const cartsList = await cartsDao.getCarts();
    res.json({ data: cartsList });
  };
}
