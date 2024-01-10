import { expect } from "chai";
import { cartsDao } from "../src/dao";
import mongoose from "mongoose";

const ObjectId = mongoose.Types.ObjectId;

describe("CartsManagerMongo", () => {
  // Test para la creación de carritos
  it("Debe crear un nuevo Cart", async () => {
    const newCart = {
      products: [
        {
          productId: new ObjectId("6519c547af30321c683aa453"),
          quantity: 2,
        },
      ],
    };

    const createdCart = await cartsDao.createCart(newCart);

    expect(createdCart).to.have.property("_id");
    expect(createdCart.products).to.be.an("array");
  });

  // Test para obtener la lista de carritos
  it("Debe obtener la lista de Carts", async () => {
    const cartsList = await cartsDao.getCarts();

    expect(cartsList).to.be.an("array");
  });

  // Test para agregar un producto a un carrito
  it("Debe agregar un producto a un Cart", async () => {
    const cartId = new ObjectId("656514d3029fadadd97ba497");
    const productId = new ObjectId("6519c547af30321c683aa453");

    const updatedCart = await cartsDao.addProduct(cartId, productId);

    expect(updatedCart).to.have.property("_id").equal(cartId);
  });

  // Test para borrar un producto de un carrito
  it("Debe borrar un producto de un Cart", async () => {
    const cartId = new ObjectId("656514d3029fadadd97ba497");
    const productId = new ObjectId("6519c547af30321c683aa453");

    const updatedCart = await cartsDao.deleteProduct(cartId, productId);

    expect(updatedCart).to.have.property("_id").equal(cartId);
    expect(updatedCart.products).to.be.an("array");
  });

  // Test para borrar un carrito
  it("Debe borrar un cart de la DB", async () => {
    const cartId = new ObjectId("656514d3029fadadd97ba497");

    const deletedCart = await cartsDao.deleteCart(cartId);

    expect(deletedCart).to.have.property("_id").equal(cartId);
  });

  // Test para actualizar la cantidad de un producto en un carrito
  it("Debe actualizar la cantidad de Productos en un Cart", async () => {
    const cartId = new ObjectId("656514d3029fadadd97ba497");
    const productId = new ObjectId("6519c547af30321c683aa453");
    const newQuantity = 5;

    const updatedCart = await cartsDao.updateProductQuantity(
      cartId,
      productId,
      newQuantity
    );

    expect(updatedCart).to.have.property("_id").equal(cartId);
  });
});
