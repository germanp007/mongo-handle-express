import { productDao } from "../src/dao";
import mongoose from "mongoose";
import { expect } from "chai";

const ObjectId = mongoose.Types.ObjectId;

describe("ProductManagerMongo", () => {
  // Test para la creación de productos
  it("Deberia crear un producto", async () => {
    const productData = {
      title: "Zapatos Deportivos",
      description: "Zapatos cómodos para correr",
      code: "123ABC",
      price: 49.99,
      stock: 100,
      category: "Deportes",
      owner: new ObjectId("655536af15419c371f36121d"),
      thumbnail: "url_de_la_foto.jpg",
    };
    const createdProduct = await productDao.createProducts(productData);

    // Verificar que se haya creado correctamente
    expect(createdProduct).to.have.property("_id");
    expect(createdProduct).to.have.property("title");
    expect(createdProduct).to.have.property("price").that.is.a("number");
    expect(createdProduct).to.have.property("stock").that.is.a("number");
  });

  // Test para obtener la lista de productos
  it("Deberia retornar la lista de productos en la DB", async () => {
    const productsList = await productDao.getProducts();

    // Verificar que se haya obtenido una lista de productos
    expect(productsList).to.be.an("array");
  });

  // Test para actualizar un producto
  it("Deberia actualizar el Producto segun su ID ", async () => {
    const productId = new ObjectId("6519c547af30321c683aa453");
    const newProductData = {
      title: "Nuevo Título",
      description: "Nueva Descripción",
      price: 59.99,
      stock: 150,
      category: "Tecnologia",
      thumbnail: "nueva_url_de_la_miniatura.jpg",
    };
    const updatedProduct = await productDao.updateProduct(
      productId,
      newProductData
    );

    expect(updatedProduct).to.have.property("_id").equal(productId);
    expect(createdProduct).to.have.property("title");
    expect(createdProduct).to.have.property("price").that.is.a("number");
    expect(createdProduct).to.have.property("stock").that.is.a("number");
  });
});
