import mongoose from "mongoose";

export const conectionDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://germanp007:nati23032023@clustergap.ggconiz.mongodb.net/ecommerce?retryWrites=true&w=majority"
    );
    console.log("Conectado a la Base de Datos Mongo!");
  } catch (error) {
    console.log("Error al conectar a la Base de Datos");
  }
};
