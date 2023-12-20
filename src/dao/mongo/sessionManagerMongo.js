import { registerModel } from "./models/sessions.model.js";

export class SessionManagerMongo {
  constructor() {
    this.model = registerModel;
  }

  async createUsers(userInfo) {
    try {
      const newUser = await this.model.create(userInfo);
      return newUser;
    } catch (error) {
      console.log("crear usuario", error.message);
      throw new Error("No se pudo crear el usuario", error.message);
    }
  }
  async getUserByEmail(email) {
    try {
      const user = await this.model.findOne({ email }).lean();
      return user;
    } catch (error) {
      console.log("get user", error.message);
      throw new Error("El Usuario no se encuentra registrado", error.message);
    }
  }
  async getUserById(id) {
    try {
      const userExist = await this.model.findById(id).lean();
      if (!userExist) {
        throw new Error("El Usuario no se encuentra registrado");
      }
      return userExist;
    } catch (error) {
      console.log("get user", error.message);
      throw new Error("El Usuario no se encuentra registrado", error.message);
    }
  }
  async updateUser(id, user) {
    try {
      const updateUser = await this.model.findByIdAndUpdate(id, user, {
        new: true,
      });
      return updateUser;
    } catch (error) {
      logger.error(error.message);
      throw new Error("No se pudo actualizar el usuario", error.message);
    }
  }
}
