import nodemailer from "nodemailer";
import { config } from "./config.js";

//Crear el Transporte ////

export const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: config.gmail.account,
    password: config.gmail.password,
  },
  secure: false,
  tls: {
    rejectUnauthorized: false,
  },
});
