import { LogEventDecorator } from "../../decorators/log";
import { TicketsLogEvent } from "../../presentation/event/tickets-log";

export const makeTicketLogEvent = () => {
  const event = new TicketsLogEvent();

  return new LogEventDecorator(event);
};
