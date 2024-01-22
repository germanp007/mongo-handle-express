import { UsersService } from "../service/users.service.js";

export class UserController {
  static modifyRole = async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await UsersService.getUserById(userId);
      if (user.rol === "premium") {
        user.rol = "user";
      } else if (user.rol === "user") {
        user.rol = "premium";
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
  static uploaderDocuments = async (req, res) => {
    try {
      const userId = req.params.uid;
      const user = await UsersService.getUserById(userId);
      const identification = req.files["identificacion"]?.[0] || null;
      const address = req.files["domicilio"]?.[0] || null;
      const statusCount = req.files["estadoDeCuenta"]?.[0] || null;
      const docs = [];
      if (identification)
        docs.push({
          name: "identificacion",
          reference: identification.filename,
        });
      if (address)
        docs.push({ name: "domicilio", reference: address.filename });
      if (statusCount)
        docs.push({ name: "estadoDeCuenta", reference: statusCount.filename });
      user.documents = docs;

      if (docs.length < 3) {
        user.status = "incomplete";
      } else {
        user.status = "complete";
      }
      await usersSessionsService.updateUser(userId, user);
      res.json({
        status: "success",
        message: "Documentos cargados exitosamente",
      });
    } catch (error) {
      logger.error("Hubo un error al cargar los datos", error.message);
      res.json({ status: "error", message: error.message });
    }
  };
}
