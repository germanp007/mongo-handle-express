import { Router } from "express";
import passport from "passport";
import { registerModel } from "../dao/mongo/models/sessions.model.js";
const router = Router();

router.post(
  "/register",
  passport.authenticate("signupLocalStrategy", {
    failureRedirect: "/api/sessions/fail-signup",
  }),
  async (req, res) => {
    res.render("login", { message: "usuario registrado exitosamente" });
  }
);

router.get("/fail-signup", (req, res) => {
  res.render("signup", { error: "No se pudo registrar el usuario" });
});
router.post(
  "/login",
  passport.authenticate("loginLocalStrategy", {
    failureRedirect: "/api/sessions/fail-login",
  }),
  async (req, res) => {
    const { email } = req.body;
    const user = await registerModel.findOne({ email: email });
    req.session.name = user.name;
    req.session.rol = user.rol;
    res.redirect("/products");
  }
);
router.get("/fail-login", (req, res) => {
  res.render("login", { error: "No se pudo iniciar session" });
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
