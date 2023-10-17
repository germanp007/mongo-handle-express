import { Router } from "express";
import { registerModel } from "../dao/mongo/models/sessions.model.js";

const router = Router();

router.post("/register", async (req, res) => {
  try {
    const userForm = req.body;
    let result;
    if (
      userForm.email === "adminCoder@coder.com" &&
      userForm.password === "adminCod3r123"
    ) {
      userForm.rol = "admin";
      result = await registerModel.create(userForm);
    } else {
      userForm.rol = "usuario";
      result = await registerModel.create(userForm);
    }
    res.render("login", { message: "usuario registrado exitosamente" });
  } catch (error) {
    res.render("signup", { error: "no se pudo registrar el usuario" });
  }
});
router.post("/login", async (req, res) => {
  try {
    const userLogin = req.body;
    const user = await registerModel.findOne({ email: userLogin.email });

    if (!user) {
      return res.render("login", { error: "usuario no registrado" });
    }
    if (user.password !== userLogin.password) {
      return res.render("login", { error: "datos invalidos" });
    }
    req.session.name = user.name;
    req.session.rol = user.rol;

    res.redirect("/products");
  } catch (error) {
    res.render("login", { error: "no se pudo ingresar con este usuario" });
  }
});
router.get("/logout", async (req, res) => {
  try {
    req.session.destroy((error) => {
      if (error)
        return (
          res, render("products", { error: "No se pudo cerrar la session" })
        );
    });
    res.redirect("/login");
  } catch (error) {
    console.log(error);
  }
});

export { router as routerSessions };
