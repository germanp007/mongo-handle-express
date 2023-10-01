import { chatModel } from "./models/chat.model.js";

export class ChatManagerMongo {
  constructor() {
    this.model = chatModel;
  }

  async getMessages() {
    try {
      const result = await this.model.find();
      return result;
    } catch (error) {
      console.log("getMessages:", error.message);
      throw new Error("No se pudo optener la lista de productos");
    }
  }

  async addMessage(message) {
    try {
      const result = await this.model.create(message);

      return result;
    } catch (error) {
      console.log("addMessage", error.message);
      throw new Error("Error al crear el mensaje");
    }
  }

  //   async updateChat() {}
  //   async deleteChat() {}
}
