import { TicketsService } from "../service/ticket.service";

export class TicketsController {
  static createTicket = async (req, res) => {
    const newTicket = req.body;
    await TicketsService.createTicket(newTicket);
    res.json({ message: "Ticket Creado con exito", data: newTicket });
    try {
    } catch (error) {
      res.json({ status: "error", message: error.message });
    }
  };

  static getTickets = async (req, res) => {
    try {
      const result = await TicketsService.getTickets();
      res.json({ data: result });
    } catch (error) {
      res.json({ message: `No se encontro resultados ${error.message}` });
    }
  };
  static getTicketById = async (req, res) => {
    try {
      const ticketId = req.params.id;
      await TicketsService.getTicketById(ticketId);
      res.json({ message: `Ticket con ID ${ticketId}`, data: ticketId });
    } catch (error) {
      res.json({
        message: `No se encontro el Ticket indicado ${error.message}`,
      });
    }
  };
}
