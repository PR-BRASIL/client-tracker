import { LogEventDecorator } from "../../decorators/log";
import { BanLogEvent } from "../../presentation/event/ban-log";

export const makeBanLogEvent = () => {
  const event = new BanLogEvent();

  return new LogEventDecorator(event);
};
