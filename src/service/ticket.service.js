import { ticketsDao } from "../dao/managers/index.js";

export class TicketsService {
  static async createTicket(ticketInfo) {
    return await ticketsDao.createTicket(ticketInfo);
  }

  static async getTickets() {
    return await ticketsDao.getTickets();
  }

  static async getTicketById(ticketInfo) {
    return await ticketsDao.getTicketById(ticketInfo);
  }
}
