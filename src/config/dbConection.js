import mongoose from "mongoose";
import { config } from "./config.js";

export const conectionDB = async () => {
  try {
    await mongoose.connect(config.mongo.url);
    console.log("Conectado a la Base de Datos Mongo!");
  } catch (error) {
    console.log("Error al conectar a la Base de Datos");
  }
};
