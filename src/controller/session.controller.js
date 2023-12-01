import { CreateUserDto } from "../dao/dto/createUser.js";
import { EError } from "../enums/EError.js";
import { CustomError } from "../service/errors/customError.service.js";
import { userCreateError } from "../service/errors/userCreateError.service.js";
import { UsersService } from "../service/users.service.js";

export class SessionController {
  static signup = async (req, res) => {
    let { first_name, last_name, email, age } = req.body;

    if (!first_name || !last_name || !email) {
      CustomError.createError({
        name: "Error al crear usuario",
        cause: userCreateError(req.body),
        message: "Algunos datos fueron invalidos al crear el usuario",
        code: EError.INVALID_BODY_JSON,
      });
    }

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
    res.redirect("/profile");
  };

  static loginFail = (req, res) => {
    res.render("login", { error: "No se pudo iniciar session" });
  };

  static githubLogin = (req, res) => {
    req.session.name = req.user.first_name;
    console.log(req);
    res.redirect("/profile");
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
