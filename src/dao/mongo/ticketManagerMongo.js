import { ticketModel } from "./models/ticket.model.js";

export class TicketManagerMongo {
  constructor() {
    this.model = ticketModel;
  }
  async createTicket(ticketInfo) {
    try {
      const Newticket = await this.model.create(ticketInfo);
      return Newticket;
    } catch (error) {
      console.log("createTicket usuario", error.message);
      throw new Error("No se pudo ticket de compra", error.message);
    }
  }
  async getTicketById(id) {
    try {
      const ticket = await this.model.findById(id).lean();
      if (!ticket) {
        throw new Error("El ticket no existe");
      }
      return ticket;
    } catch (error) {
      console.log("getTicketById", error.message);
      throw new Error("Ticket no encontrado", error.message);
    }
  }
}
