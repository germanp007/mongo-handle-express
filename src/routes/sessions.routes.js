import { Router } from "express";
import passport from "passport";
import { config } from "../config/config.js";
import { SessionController } from "../controller/session.controller.js";
const router = Router();

// Rutas de registro
router.post(
  "/register",
  passport.authenticate("signupLocalStrategy", {
    failureRedirect: "/api/sessions/fail-signup",
  }),
  SessionController.signup
);

router.get("/fail-signup", SessionController.signupFail);

//Rutas de Login
router.post(
  "/login",
  passport.authenticate("loginLocalStrategy", {
    failureRedirect: "/api/sessions/fail-login",
  }),
  SessionController.login
);
router.get("/fail-login", SessionController.loginFail);

// Ruta registro Git-hub

router.get("/signup-github", passport.authenticate("signupGithubStrategy"));
//callback con github
router.get(
  config.github.callbackUrl,
  passport.authenticate("signupGithubStrategy", {
    failureRedirect: "/api/sessions/fail-login",
  }),
  SessionController.githubLogin
);

router.post("/forgot-password", SessionController.forgotPassword);

//Ruta LOGOUT
router.get("/logout", SessionController.logout);

export { router as routerSessions };
