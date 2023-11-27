import { ticketDao } from "../dao/index.js";

export class TicketsService {
  static async createTicket(ticketInfo) {
    return await ticketDao.createTicket(ticketInfo);
  }

  static async getTickets() {
    return await ticketDao.getTickets();
  }

  static async getTicketById(ticketInfo) {
    return await ticketDao.getTicketById(ticketInfo);
  }
}
