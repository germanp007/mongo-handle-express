import { UsersService } from "../service/users.service";

export class UserController {
  static modifyRole = async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await UsersService.getUserById(userId);
      if (user.role === "premium") {
        user.role = "user";
      } else if (user.role === "user") {
        user.role = "premium";
      } else {
        res.json({
          status: "error",
          message: "No se pudo cambiar el rol del usuario",
        });
      }
      await UsersService.updateUser(userId, user);
    } catch (error) {
      res.json({ status: "error", message: error.message });
    }
  };
}
