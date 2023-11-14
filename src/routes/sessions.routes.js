import { Router } from "express";
import passport from "passport";
import { config } from "../config/config.js";
import { sessionDao } from "../dao/index.js";
const router = Router();

// Rutas de registro
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

//Rutas de Login
router.post(
  "/login",
  passport.authenticate("loginLocalStrategy", {
    failureRedirect: "/api/sessions/fail-login",
  }),
  async (req, res) => {
    const { email } = req.body;
    const user = await sessionDao.getUserByEmail(email);
    req.session.first_name = user.first_name;
    req.session.rol = user.rol;
    res.redirect("/products");
  }
);
router.get("/fail-login", (req, res) => {
  res.render("login", { error: "No se pudo iniciar session" });
});

// Ruta registro Git-hub

router.get("/signup-github", passport.authenticate("signupGithubStrategy"));
//callback con github
router.get(
  config.github.callbackUrl,
  passport.authenticate("signupGithubStrategy", {
    failureRedirect: "/api/sessions/fail-login",
  }),
  (req, res) => {
    req.session.name = req.user.first_name;
    console.log(req);
    res.redirect("/products");
  }
);

//Ruta LOGOUT
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
