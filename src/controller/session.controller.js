import { CreateUserDto } from "../dao/dto/createUser.js";
import { UsersService } from "../service/users.service.js";

export class SessionController {
  static signup = async (req, res) => {
    res.render("login", { message: "usuario registrado exitosamente" });
  };

  static signupFail = (req, res) => {
    res.render("signup", { error: "No se pudo registrar el usuario" });
  };
  static login = async (req, res) => {
    const { email } = req.body;
    const user = await UsersService.getUserByEmail(email);
    const userFront = new CreateUserDto(user);
    console.log(userFront);
    req.session.name = userFront.full_name;
    req.session.email = email;
    req.session.rol = user.rol;
    res.redirect("/products");
  };

  static loginFail = (req, res) => {
    res.render("login", { error: "No se pudo iniciar session" });
  };

  static githubLogin = (req, res) => {
    req.session.name = req.user.first_name;
    console.log(req);
    res.redirect("/products");
  };
  static logout = async (req, res) => {
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
  };
}
